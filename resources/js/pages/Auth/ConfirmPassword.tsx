import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';
import { confirm } from '@/routes/password';

interface ConfirmPasswordPageProps {
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

export default function ConfirmPasswordPage({ initialData }: ConfirmPasswordPageProps) {
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    password: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    post(confirm.url());
  };

  return (
    <AppLayout title="Confirm Password" description="Confirm your password to continue">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Confirm your password</h1>
          <p className="mt-2 text-muted-foreground">
            For security, please confirm your password to access this area
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
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
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password}</p>
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
            {processing ? 'Confirming...' : 'Confirm'}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}