import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Define public routes that do not require authentication
const publicRoutes = ['/', '/login', '/register', '/forgot-password'];

// Define private routes that require authentication
const privateRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/admin',
  '/products',
  '/orders',
  '/agents',
  '/customers',
  '/reports',
  '/client',
  '/landing-page',
];


// Define the default locale
const defaultLocale = 'en';

// List of supported locales
const supportedLocales = ['en', 'es', 'fr', 'de','it'];

const intlMiddleware = createMiddleware({
  locales: supportedLocales, // Supported languages
  defaultLocale, // Default language
});

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect from root '/' to the default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}/`, req.url));
  }

  const staticFiles = ['/favicon.ico', '/_next', '/static', '/fonts', '/images', '/messages', '/placeholder.png'];
  if (staticFiles.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Extract the token from cookies
  const token = req.cookies.get('token');

  // Function to get the locale from the pathname
  function getLocale(pathname: string) {
    const firstSegment = pathname.split('/')[1];
    if (supportedLocales.includes(firstSegment)) {
      return firstSegment;
    }
    return defaultLocale;
  }

  // Get the locale safely
  const locale = getLocale(pathname);

  // Check if the current route is public (no authentication required)
  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === route ||
      pathname === `/${locale}${route === '/' ? '' : route}` ||
      pathname === `/${locale}/${route.replace('/', '')}`
  );

  // Check if the current route is private (requires authentication)
  const isPrivateRoute =
    privateRoutes.some(
      (route) =>
        pathname.startsWith(route) ||
        pathname.startsWith(`/${locale}${route}`) ||
        pathname.startsWith(`/${locale}/${route}`)
    ) ||
    /^\/(en|es|fr|de)\/(dashboard|profile|settings|admin|products|orders|agents|customers|reports)/.test(
      pathname
    );

  if (isPrivateRoute && !token) {
    // Redirect unauthenticated users trying to access private routes to the login page
    return NextResponse.redirect(new URL(`/${locale}/`, req.url));
  }

  if (isPublicRoute && token) {
    // Redirect authenticated users to the dashboard
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  // Proceed with the request
  return intlMiddleware(req);
}

// Apply the middleware to all routes
export const config = {
  matcher: [
    '/:path*',
    '/', // Redirigir la raíz
    '/:locale(en|es|fr|de|it)',
  ]
};
