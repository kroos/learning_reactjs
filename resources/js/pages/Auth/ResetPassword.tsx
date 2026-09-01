import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';
import { login, register } from '@/routes';
import { store as passwordStore } from '@/routes/password';

interface ResetPasswordPageProps {
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

export default function ResetPasswordPage({ initialData }: ResetPasswordPageProps) {
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    token: '',
    username: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    post(passwordStore.url());
  };

  return (
    <AppLayout title="Reset Password" description="Set a new password">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Reset password</h1>
          <p className="mt-2 text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <input type="hidden" name="token" value={data.token} />

          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={data.username}
              onChange={(e) => setData('username', e.target.value)}
              className={cn(
                'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                errors.username && 'border-destructive'
              )}
              required
              autoComplete="username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-destructive">{errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className={cn(
                'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                errors.password && 'border-destructive'
              )}
              required
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              className={cn(
                'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                errors.password_confirmation && 'border-destructive'
              )}
              required
              autoComplete="new-password"
            />
            {errors.password_confirmation && (
              <p className="mt-1 text-sm text-destructive">{errors.password_confirmation}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className={cn(
              'w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:pointer-events-none'
            )}
          >
            {processing ? 'Resetting...' : 'Reset password'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link
            href={login.url()}
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AppLayout>
  );
}