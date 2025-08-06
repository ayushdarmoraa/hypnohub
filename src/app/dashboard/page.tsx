'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardContent from '@/components/DashboardContent';

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['user', 'premium', 'admin']}>
      <DashboardContent />
    </ProtectedRoute>
  );
}
