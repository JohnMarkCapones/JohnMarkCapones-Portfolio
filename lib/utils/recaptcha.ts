/**
 * Google reCAPTCHA v3 Verification Utility
 * Server-side verification of reCAPTCHA tokens
 */

export interface RecaptchaVerificationResult {
  success: boolean;
  score: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/**
 * Verify reCAPTCHA token on server
 *
 * @param token - reCAPTCHA token from client
 * @returns Verification result with success status and score
 */
export async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY not configured');
      // In development, allow through for testing
      // In production, you should fail the request
      if (process.env.NODE_ENV === 'development') {
        return { success: true, score: 1.0 };
      }
      return { success: false, score: 0 };
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    if (!response.ok) {
      console.error('reCAPTCHA API request failed:', response.statusText);
      return { success: false, score: 0 };
    }

    const data: RecaptchaVerificationResult = await response.json();

    // Check if verification succeeded and score is above threshold
    // Score ranges from 0.0 (bot) to 1.0 (human)
    // Threshold of 0.5 is recommended for most use cases
    const threshold = 0.5;
    const isValid = data.success && (data.score !== undefined ? data.score >= threshold : false);

    return {
      success: isValid,
      score: data.score || 0,
    };
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return { success: false, score: 0 };
  }
}
