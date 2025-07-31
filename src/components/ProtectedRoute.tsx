'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'admin' | 'therapist')[];
  requireAuth?: boolean;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  allowedRoles = ['user', 'admin', 'therapist'],
  requireAuth = true,
  fallback
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      const currentPath = window.location.pathname;
      router.push(`/?auth=login&redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    // If user is authenticated but doesn't have required role
    if (isAuthenticated && user && !allowedRoles.includes(user.role)) {
      setShowFallback(true);
      return;
    }

    setShowFallback(false);
  }, [isAuthenticated, user, isLoading, requireAuth, allowedRoles, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show fallback for insufficient permissions
  if (showFallback) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. 
            {user && (
              <span className="block mt-2 text-sm">
                Your role: <span className="font-medium text-purple-600">{user.role}</span>
              </span>
            )}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => router.back()}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated and auth is not required, or if authenticated with proper role
  if (!requireAuth || (isAuthenticated && user && allowedRoles.includes(user.role))) {
    return <>{children}</>;
  }

  // Default fallback
  return null;
}

// Higher-order component for easier usage
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: ('user' | 'admin' | 'therapist')[]
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Specific role-based components
export function AdminOnly({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      {children}
    </ProtectedRoute>
  );
}

export function TherapistOnly({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['therapist']}>
      {children}
    </ProtectedRoute>
  );
}

export function TherapistOrAdmin({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['therapist', 'admin']}>
      {children}
    </ProtectedRoute>
  );
}

export function PremiumOnly({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user || user.membershipLevel === 'free') {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Premium Feature</h3>
        <p className="mb-4">This feature is available for Premium and Pro members only.</p>
        <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Upgrade Now
        </button>
      </div>
    );
  }
  
  return <>{children}</>;
}

