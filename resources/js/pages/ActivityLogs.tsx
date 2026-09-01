import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useActivityLogs } from '@/hooks/useActivityLogs';
import { cn } from '@/lib/utils';

interface ActivityLogsPageProps {
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

export default function ActivityLogsPage({ initialData }: ActivityLogsPageProps) {
  const { data, loading, error, meta, execute, get } = useActivityLogs();

  const handleRefresh = () => {
    get({ draw: meta.draw + 1 });
  };

  return (
    <AppLayout title="Activity Logs" description="View system activity logs">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
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
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Log Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Subject</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Causer</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Critical</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created At</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {data?.data?.map((log: any) => (
                <tr key={log.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">{log.log_name}</td>
                  <td className="p-4 align-middle">{log.description}</td>
                  <td className="p-4 align-middle">
                    {log.subject_type ? `${log.subject_type} #${log.subject_id}` : '-'}
                  </td>
                  <td className="p-4 align-middle">
                    {log.causer_type ? `${log.causer_type} #${log.causer_id}` : '-'}
                  </td>
                  <td className="p-4 align-middle">
                    {log.is_critical ? (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="p-4 align-middle text-sm text-muted-foreground">
                    {log.created_at}
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground">
                    {loading ? 'Loading...' : 'No activity logs found'}
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