import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';

interface ProfileEditPageProps {
  initialData: {
    auth: {
      user: {
        id: number;
        name: string;
        email: string;
      };
    };
  };
}

export default function ProfileEditPage({ initialData }: ProfileEditPageProps) {
  const { user } = initialData.auth;

  const { data, setData, patch, processing, errors, clearErrors, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    patch(route('profile.update'));
  };

  const destroy = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      // The actual deletion is handled by a separate form with the delete method
    }
  };

  return (
    <AppLayout title="Profile" description="Manage your account settings">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Information</h1>
          <p className="mt-1 text-muted-foreground">
            Update your account's profile information and email address.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <form onSubmit={submit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className={cn(
                  'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  errors.name && 'border-destructive'
                )}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className={cn(
                  'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  errors.email && 'border-destructive'
                )}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {recentlySuccessful && (
              <div className="rounded-md bg-green-100 p-4 text-sm text-green-800">
                Profile updated successfully.
              </div>
            )}

            <div className="flex items-center justify-end gap-2">
              <button
                type="submit"
                disabled={processing}
                className={cn(
                  'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  'disabled:opacity-50 disabled:pointer-events-none'
                )}
              >
                {processing ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-lg border bg-destructive/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">Delete Account</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Once your account is deleted, all of its resources and data will be permanently deleted.
              </p>
            </div>
            <form onSubmit={destroy}>
              <button
                type="submit"
                className={cn(
                  'inline-flex items-center justify-center rounded-md border border-destructive bg-transparent px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2'
                )}
              >
                Delete account
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}