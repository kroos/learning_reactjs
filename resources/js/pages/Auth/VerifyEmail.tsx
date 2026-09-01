import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';
import { logout, dashboard } from '@/routes';
import { send as verificationSend } from '@/routes/verification';

interface VerifyEmailPageProps {
  initialData: {
    auth: {
      user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
      };
    };
  };
}

export default function VerifyEmailPage({ initialData }: VerifyEmailPageProps) {
  const { user } = initialData.auth;
  const { data, setData, post, processing } = useForm({});

  const resend = (e: React.FormEvent) => {
    e.preventDefault();
    post(verificationSend.url());
  };

  if (user.email_verified_at) {
    return (
      <AppLayout title="Email Verified" description="Your email has been verified">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Email verified</h1>
          <p className="mt-2 text-muted-foreground">
            Your email address has been successfully verified.
          </p>
          <Link
            href={dashboard.url()}
            className={cn(
              'mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            )}
          >
            Go to Dashboard
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Verify Email" description="Verify your email address">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Verify your email address</h1>
        <p className="mt-2 text-muted-foreground">
          A verification link has been sent to <strong>{user.email}</strong>
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          If you didn't receive the email, click the button below to resend it.
        </p>

        <form onSubmit={resend} className="mt-6 space-y-4">
          <button
            type="submit"
            disabled={processing}
            className={cn(
              'w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:pointer-events-none'
            )}
          >
            {processing ? 'Sending...' : 'Resend verification email'}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          <Link
            href={logout.url()}
            className="text-primary hover:underline"
            method="post"
            as="button"
          >
            Log out
          </Link>
        </p>
      </div>
    </AppLayout>
  );
}