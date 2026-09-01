import { useApi } from './useApi';
import { getActivityLogs } from '@/routes';
import type { ActivityLog } from '@/types';

interface ActivityLogsResponse {
    data: ActivityLog[];
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
}

export function useActivityLogs(params?: Record<string, any>) {
    return useApi<ActivityLogsResponse>({
        route: getActivityLogs,
        method: 'GET',
        params,
        runOnMount: true,
    });
}