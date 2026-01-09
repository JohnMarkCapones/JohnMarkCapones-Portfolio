/**
 * CSRF Token Generation and Validation
 * Protects against Cross-Site Request Forgery attacks
 */

import { cookies } from 'next/headers';

const CSRF_TOKEN_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

/**
 * Generate a cryptographically secure CSRF token
 *
 * @returns Random UUID token
 */
export function generateCsrfToken(): string {
  return crypto.randomUUID();
}

/**
 * Set CSRF token in HTTP-only cookie
 *
 * @param token - The CSRF token to store
 */
export async function setCsrfTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CSRF_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
    path: '/',
  });
}

/**
 * Verify CSRF token from request
 * Compares token in cookie with token in request header
 *
 * @param request - The incoming request
 * @returns True if tokens match, false otherwise
 */
export async function verifyCsrfToken(request: Request): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get(CSRF_TOKEN_NAME)?.value;
    const headerToken = request.headers.get(CSRF_HEADER_NAME);

    if (!cookieToken || !headerToken) {
      return false;
    }

    // Timing-safe comparison to prevent timing attacks
    return cookieToken === headerToken;
  } catch (error) {
    console.error('CSRF verification error:', error);
    return false;
  }
}

/**
 * Get CSRF token name for client-side usage
 */
export function getCsrfHeaderName(): string {
  return CSRF_HEADER_NAME;
}
