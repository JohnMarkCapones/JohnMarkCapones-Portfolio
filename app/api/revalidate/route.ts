/**
 * On-Demand Revalidation API Endpoint
 * Manually trigger revalidation of cached pages
 *
 * Usage:
 * POST /api/revalidate
 * Headers: { "x-revalidate-token": "your-secret-token", "Content-Type": "application/json" }
 * Body: { "path": "/" }
 */

import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/revalidate
 *
 * Revalidate specific paths or tags
 *
 * @example
 * ```bash
 * # Revalidate homepage
 * curl -X POST https://yoursite.com/api/revalidate \
 *   -H "x-revalidate-token: your-secret-token" \
 *   -H "Content-Type: application/json" \
 *   -d '{"path": "/"}'
 *
 * # Revalidate by tag
 * curl -X POST https://yoursite.com/api/revalidate \
 *   -H "x-revalidate-token: your-secret-token" \
 *   -H "Content-Type: application/json" \
 *   -d '{"tag": "github-data"}'
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    // Verify revalidation token
    const token = request.headers.get('x-revalidate-token');
    const secret = process.env.REVALIDATE_SECRET;

    if (!secret) {
      return NextResponse.json(
        {
          error: 'Server configuration error',
          message: 'REVALIDATE_SECRET not configured',
        },
        { status: 500 }
      );
    }

    if (!token || token !== secret) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Invalid or missing revalidation token',
        },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { path } = body;

    // Validate that path is provided
    if (!path) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: '"path" parameter is required',
        },
        { status: 400 }
      );
    }

    // Revalidate by path
    try {
      revalidatePath(path);
      return NextResponse.json({
        success: true,
        message: `Path "${path}" revalidated successfully`,
        revalidated: true,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return NextResponse.json(
        {
          error: 'Revalidation failed',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/revalidate
 *
 * Returns API documentation
 */
export async function GET() {
  return NextResponse.json({
    name: 'On-Demand Revalidation API',
    description: 'Manually trigger revalidation of cached pages',
    method: 'POST',
    headers: {
      'x-revalidate-token': 'Your secret revalidation token',
      'Content-Type': 'application/json',
    },
    body: {
      path: 'Path to revalidate (e.g., "/" or "/about") - REQUIRED',
    },
    examples: [
      {
        description: 'Revalidate homepage',
        curl: 'curl -X POST /api/revalidate -H "x-revalidate-token: secret" -H "Content-Type: application/json" -d \'{"path": "/"}\'',
      },
      {
        description: 'Revalidate projects page',
        curl: 'curl -X POST /api/revalidate -H "x-revalidate-token: secret" -H "Content-Type: application/json" -d \'{"path": "/projects"}\'',
      },
    ],
    commonPaths: ['/', '/about', '/projects', '/contact', '/stats'],
  });
}
