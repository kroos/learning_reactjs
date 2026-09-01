import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';
import { login, register } from '@/routes';
import { email as passwordEmail } from '@/routes/password';

interface LoginPageProps {
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

export default function LoginPage({ initialData }: LoginPageProps) {
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    username: '',
    password: '',
    remember: false,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    post(login.url());
  };

  return (
    <AppLayout title="Login" description="Sign in to your account">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-2 text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Link
                href={passwordEmail.url()}
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
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

          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground">
              Remember me
            </label>
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
            {processing ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            href={register.url()}
            className="text-primary hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </AppLayout>
  );
}