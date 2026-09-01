import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout, { PageSection } from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';
import { login, register } from '@/routes';

export default function Welcome() {
  return (
    <AppLayout title="Welcome" description="Laravel concepts adapted to React/Inertia.js">
      <PageSection title="Getting Started">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to <span className="text-primary">Laravel + React</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This application demonstrates Laravel architectural concepts adapted to React/Inertia.js with Tailwind CSS.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <div className={cn(
              'rounded-lg border bg-card p-6 text-center hover:shadow-md transition-shadow',
              'bg-background'
            )}>
              <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">TypeScript Models</h3>
              <p className="text-sm text-muted-foreground">
                Strongly-typed interfaces for User, Login, ActivityLog, JobBatch matching Laravel models
              </p>
            </div>

            <div className={cn(
              'rounded-lg border bg-card p-6 text-center hover:shadow-md transition-shadow',
              'bg-background'
            )}>
              <div className="mx-auto w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inertia.js + React</h3>
              <p className="text-sm text-muted-foreground">
                SPA experience without API complexity — server-side routing with client-side rendering
              </p>
            </div>

            <div className={cn(
              'rounded-lg border bg-card p-6 text-center hover:shadow-md transition-shadow',
              'bg-background'
            )}>
              <div className="mx-auto w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tailwind CSS</h3>
              <p className="text-sm text-muted-foreground">
                Utility-first styling with dark mode, responsive design, and consistent design tokens
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-8">
            <Link
              href={login.url()}
              className={cn(
                'inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
              )}
            >
              Sign In
            </Link>
            <Link
              href={register.url()}
              className={cn(
                'inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              Register
            </Link>
          </div>

          <div className="border-t pt-8 max-w-2xl mx-auto text-sm text-muted-foreground">
            <p>Built with Laravel 11, React 18, Inertia.js v3, and Tailwind CSS v4</p>
          </div>
        </div>
      </PageSection>
    </AppLayout>
  );
}