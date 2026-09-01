import { useApi } from './useApi';
import { getJobBatchTable } from '@/routes';
import type { JobBatch } from '@/types';

interface JobBatchTableResponse {
    data: JobBatch[];
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
}

export function useJobBatchTable(params?: Record<string, any>) {
    return useApi<JobBatchTableResponse>({
        route: getJobBatchTable,
        method: 'GET',
        params,
        runOnMount: true,
    });
}