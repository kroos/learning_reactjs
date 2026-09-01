import { useApi } from './useApi';
import { getProgress } from '@/routes';
import type { JobBatch } from '@/types';

interface ProgressResponse {
    data: JobBatch[];
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
}

export function useProgress(params?: Record<string, any>) {
    return useApi<ProgressResponse>({
        route: getProgress,
        method: 'GET',
        params,
        runOnMount: true,
    });
}