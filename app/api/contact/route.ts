/**
 * Contact Form API Route
 * Handles contact form submissions and sends emails via Resend
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations/contact';
import { generateContactEmail, generateContactEmailText } from '@/lib/email/templates/contact-email';
import { checkRateLimit } from '@/lib/utils/rate-limit';

// Lazy initialize Resend (only when needed)
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured. Check your .env.local file and restart the dev server.');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * POST /api/contact
 * Submit contact form
 */
export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip);

    if (!rateLimitResult.allowed) {
      const resetTime = new Date(rateLimitResult.resetTime);
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
          resetTime: resetTime.toISOString(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime.toUTCString(),
          }
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate data
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: 'Invalid form data',
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Generate unique message ID
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'long',
    });

    // Generate email content
    const htmlContent = generateContactEmail({ data, timestamp, messageId });
    const textContent = generateContactEmailText({ data, timestamp, messageId });

    // Send email via Resend
    const resend = getResendClient();

    if (!process.env.RESEND_FROM_EMAIL || !process.env.RESEND_TO_EMAIL) {
      throw new Error('Email configuration missing. Check RESEND_FROM_EMAIL and RESEND_TO_EMAIL in .env.local');
    }

    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      subject: `Portfolio Contact: ${data.name} - ${data.reason}`,
      html: htmlContent,
      text: textContent,
      replyTo: data.email,
    });

    // Check if email was sent successfully
    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return NextResponse.json(
        {
          error: 'Email sending failed',
          message: 'Failed to send your message. Please try again or email directly.',
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        messageId,
        emailId: emailResult.data?.id,
        eta: '24-48 hours',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toUTCString(),
        },
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Contact API is running',
    timestamp: new Date().toISOString(),
  });
}
