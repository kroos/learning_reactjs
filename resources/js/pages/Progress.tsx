import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

interface ProgressPageProps {
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

export default function ProgressPage({ initialData }: ProgressPageProps) {
  const { data, loading, error, meta, execute, get } = useProgress();

  const handleRefresh = () => {
    get({ draw: meta.draw + 1 });
  };

  return (
    <AppLayout title="Job Batch Progress" description="Monitor job batch processing progress">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Job Batch Progress</h1>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className={cn(
              'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:pointer-events-none'
            )}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="rounded-md border overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Batch Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total Jobs</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Pending</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Processed</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Failed</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created At</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {data?.data?.map((batch: any) => (
                <tr key={batch.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle font-medium">{batch.name}</td>
                  <td className="p-4 align-middle">{batch.total_jobs}</td>
                  <td className="p-4 align-middle">{batch.pending_jobs}</td>
                  <td className="p-4 align-middle">{batch.processed_jobs}</td>
                  <td className="p-4 align-middle">{batch.failed_jobs}</td>
                  <td className="p-4 align-middle">
                    {batch.finished_at ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Completed
                      </span>
                    ) : batch.cancelled_at ? (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        Cancelled
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        Processing
                      </span>
                    )}
                  </td>
                  <td className="p-4 align-middle text-sm text-muted-foreground">
                    {batch.created_at}
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-muted-foreground">
                    {loading ? 'Loading...' : 'No job batches found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {((meta.draw - 1) * 10) + 1} to {Math.min(meta.draw * 10, meta.total)} of {meta.total} entries
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => get({ draw: meta.draw - 1 })}
              disabled={loading || meta.draw <= 1}
              className={cn(
                'inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm hover:bg-accent',
                'disabled:opacity-50 disabled:pointer-events-none'
              )}
            >
              Previous
            </button>
            <button
              onClick={() => get({ draw: meta.draw + 1 })}
              disabled={loading || meta.draw * 10 >= meta.total}
              className={cn(
                'inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm hover:bg-accent',
                'disabled:opacity-50 disabled:pointer-events-none'
              )}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}