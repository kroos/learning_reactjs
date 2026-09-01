import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';

interface DashboardPageProps {
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

export default function DashboardPage({ initialData }: DashboardPageProps) {
  const { user } = initialData.auth;

  return (
    <AppLayout title="Dashboard" description="Welcome to your dashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Link
              href="/progress"
              className={cn(
                'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
              )}
            >
              View Progress
            </Link>
            <Link
              href="/activity-logs"
              className={cn(
                'inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              Activity Logs
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="text-sm font-medium text-muted-foreground">User</div>
            <div className="mt-2 text-2xl font-bold">{user.name}</div>
            <div className="mt-1 text-sm text-muted-foreground">{user.email}</div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="text-sm font-medium text-muted-foreground">Quick Actions</div>
            <div className="mt-2 space-y-2">
              <Link
                href="/progress"
                className="block rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Job Batch Progress
              </Link>
              <Link
                href="/activity-logs"
                className="block rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                View Activity Logs
              </Link>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="text-sm font-medium text-muted-foreground">System Status</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}