import React from 'react';
import AvatarUpload from '@/components/settings/AvatarUpload';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <section className="mb-8">
        <AvatarUpload />
      </section>

      <section>
        <h3 className="text-lg font-semibold">Account</h3>
        <div className="mt-2 text-sm text-muted-foreground">
          <div><strong>Email:</strong> {user?.email}</div>
          <div><strong>Name:</strong> {user?.full_name || '—'}</div>
        </div>
      </section>
    </div>
  );
};

export default function ProtectedSettings() {
  return (
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  );
}
