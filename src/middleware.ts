import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Define protected routes and their required roles
const protectedRoutes = {
  '/dashboard': ['user', 'admin', 'therapist'],
  '/admin': ['admin'],
  '/profile': ['user', 'admin', 'therapist'],
  '/api/admin': ['admin'],
  '/api/therapist': ['therapist', 'admin'],
} as const;

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/library',
  '/programs',
  '/sessions',
  '/learn',
  '/community',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
  '/api/audios',
  '/api/seed',
];

// Define API routes that require authentication but no specific role
const protectedApiRoutes = [
  '/api/auth/me',
  '/api/personalized-requests',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is public
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }
  
  // Get token from Authorization header or cookies
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') 
    ? authHeader.substring(7)
    : request.cookies.get('token')?.value;
  
  // If no token, redirect to login for protected pages or return 401 for API routes
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Redirect to home page with auth modal trigger
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('auth', 'login');
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  
  // Verify token
  try {
    const decoded = verifyToken(token);
    
    // Check if route requires specific role
    const requiredRoles = getRequiredRoles(pathname);
    if (requiredRoles && !requiredRoles.includes(decoded.role as any)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      
      // Redirect to dashboard for insufficient permissions
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      url.searchParams.set('error', 'insufficient-permissions');
      return NextResponse.redirect(url);
    }
    
    // Add user info to request headers for API routes
    if (pathname.startsWith('/api/')) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-email', decoded.email);
      requestHeaders.set('x-user-role', decoded.role);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
    
    return NextResponse.next();
    
  } catch (error) {
    // Invalid token
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    // Redirect to home page for invalid token
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('auth', 'login');
    url.searchParams.set('error', 'session-expired');
    return NextResponse.redirect(url);
  }
}

function isPublicRoute(pathname: string): boolean {
  // Check exact matches
  if (publicRoutes.includes(pathname)) {
    return true;
  }
  
  // Check if it's a protected API route that requires auth but no specific role
  if (protectedApiRoutes.some(route => pathname.startsWith(route))) {
    return false;
  }
  
  // Check for dynamic routes and static assets
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/icons/') ||
    pathname.includes('.') // Static files
  ) {
    return true;
  }
  
  return false;
}

function getRequiredRoles(pathname: string): string[] | null {
  // Check exact matches first
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      return roles;
    }
  }
  
  // Check for API routes with dynamic segments
  if (pathname.startsWith('/api/admin')) {
    return ['admin'];
  }
  
  if (pathname.startsWith('/api/therapist')) {
    return ['therapist', 'admin'];
  }
  
  return null;
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};

