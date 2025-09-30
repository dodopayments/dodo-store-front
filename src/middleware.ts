import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n/config';

const COOKIE_NAME = "lingo-locale";
const OLD_COOKIE_NAME = "NEXT_LOCALE";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };
  
  // Check if we already have the new cookie
  const currentLocale = request.cookies.get(COOKIE_NAME);
  
  if (currentLocale) {
    // Validate existing cookie value
    if (!locales.includes(currentLocale.value as typeof locales[number])) {
      // Invalid cookie value - try to replace with old cookie or default
      const oldLocale = request.cookies.get(OLD_COOKIE_NAME);
      
      if (oldLocale && locales.includes(oldLocale.value as typeof locales[number])) {
        // Use valid old cookie value
        response.cookies.set(COOKIE_NAME, oldLocale.value, cookieOptions);
        response.cookies.delete(OLD_COOKIE_NAME);
      } else {
        // Use default locale
        response.cookies.set(COOKIE_NAME, 'en', cookieOptions);
      }
    }
  } else {
    // No current cookie - check for old cookie and migrate
    const oldLocale = request.cookies.get(OLD_COOKIE_NAME);
    
    if (oldLocale && locales.includes(oldLocale.value as typeof locales[number])) {
      // Set the new cookie with the old value
      response.cookies.set(COOKIE_NAME, oldLocale.value, cookieOptions);
      response.cookies.delete(OLD_COOKIE_NAME);
    } else {
      // Set default locale if no old cookie exists
      response.cookies.set(COOKIE_NAME, 'en', cookieOptions);
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
