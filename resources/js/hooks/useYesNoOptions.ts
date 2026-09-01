import { useApi } from './useApi';
import { getYesNoOptions } from '@/routes';
import type { YesNoOption } from '@/types';

export function useYesNoOptions(params?: Record<string, any>) {
    return useApi<YesNoOption[]>({
        route: getYesNoOptions,
        method: 'GET',
        params,
        runOnMount: true,
    });
}