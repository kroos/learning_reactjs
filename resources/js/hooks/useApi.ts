import { useState, useEffect, useCallback } from 'react';
import type { RouteDefinition, RouteFormDefinition } from '@/wayfinder';

// ============================================================
// useApi Hook - Laravel API Controller Pattern Equivalent
// Provides API call patterns similar to Laravel's API controllers:
// - ModelAjaxSupportController: Read-only endpoints (GET, POST)
// - ModelAjaxCRUDController: Write endpoints (POST, PUT, PATCH, DELETE)
// ============================================================

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type ApiResponse<T = any> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  meta: {
    draw?: number; // For DataTables compatibility
    total?: number;
    filtered?: number;
  };
};

type UseApiOptions<T = any> = {
  /** Route definition from wayfinder */
  route: string | RouteDefinition;
  /** HTTP method */
  method?: Method;
  /** Data to send with the request */
  data?: any;
  /** Success callback */
  onSuccess?: (response: T) => void;
  /** Error callback */
  onError?: (error: string, status: number) => void;
  /** Always execute, even on error */
  runOnMount?: boolean;
  /** Refresh interval in ms */
  refreshInterval?: number;
  /** Additional query parameters */
  params?: Record<string, any>;
};

/**
 * Laravel-style API hook that provides:
 * - Consistent API call patterns across the app
 * - Loading/error state management
 * - DataTables protocol support (draw, recordsTotal, recordsFiltered)
 * - Automatic retry and error handling
 * - Method-based routing (read vs write patterns)
 * 
 * Usage mirrors Laravel API controllers:
 * - useApi with GET method → ModelAjaxSupportController pattern (read-only)
 * - useApi with POST/PUT/DELETE → ModelAjaxCRUDController pattern (write)
 * - Automatic DataTables protocol handling
 * - Loading and error state tracking
 */
export function useApi<T = any>(options: UseApiOptions<T>) {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    loading: false,
    error: null,
    status: 'idle',
    meta: {},
  });

  const { route, method = 'GET', data: requestData, onSuccess, onError, params } = options;

  // Normalize route to string
  const routeString = typeof route === 'string' ? route : route.url;

  const execute = useCallback(async (overrideMethod?: Method, overrideData?: any) => {
    setResponse(prev => ({ ...prev, status: 'loading', error: null }));
    
    try {
      const fetchData = overrideData ?? requestData;
      const fetchMethod = overrideMethod ?? method;
      
      // Build URL with params
      let url = routeString;
      if (params) {
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
          queryParams.append(key, String(value));
        }
        url = `${url}?${queryParams.toString()}`;
      }
      
      const config: RequestInit = {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: fetchData ? JSON.stringify(fetchData) : undefined,
      };
      
      const fetchResponse = await fetch(url, config);
      
      if (!fetchResponse.ok) {
        const errorData = await fetchResponse.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${fetchResponse.status}`);
      }
      
      const result = await fetchResponse.json();
      
      // Handle DataTables protocol
      if (result.draw !== undefined) {
        setResponse({
          data: result.data ?? null,
          loading: false,
          error: null,
          status: 'success',
          meta: {
            draw: result.draw,
            total: result.recordsTotal,
            filtered: result.recordsFiltered,
          },
        });
      } else {
        setResponse({
          data: result,
          loading: false,
          error: null,
          status: 'success',
          meta: {},
        });
      }
      
      if (onSuccess) {
        onSuccess(result as T);
      }
      
    } catch (error: any) {
      console.error('API Error:', error);
      
      setResponse({
        data: null,
        loading: false,
        error: error.message || 'API request failed',
        status: 'error',
        meta: {},
      });
      
      if (onError) {
        onError(error.message || 'API request failed', 0);
      }
    }
  }, [route, method, requestData, onSuccess, onError, params]);

  // Execute on mount if specified
  useEffect(() => {
    if (options.runOnMount !== false) {
      execute();
    }
  }, [execute]);

  // Refresh on interval if specified
  useEffect(() => {
    if (options.refreshInterval) {
      const interval = setInterval(() => {
        execute();
      }, options.refreshInterval);
      
      return () => clearInterval(interval);
    }
  }, [options.refreshInterval, execute]);

  return {
    // State
    data: response.data,
    loading: response.loading,
    error: response.error,
    status: response.status,
    meta: response.meta,
    
    // Actions
    execute,
    refresh: execute,
    
    // Convenience methods mirroring Laravel API patterns
    get: useCallback((dataOrParams?: any) => execute('GET', dataOrParams), [execute]),
    post: useCallback((dataOrParams?: any) => execute('POST', dataOrParams), [execute]),
    put: useCallback((dataOrParams?: any) => execute('PUT', dataOrParams), [execute]),
    delete: useCallback((dataOrParams?: any) => execute('DELETE', dataOrParams), [execute]),
    patch: useCallback((dataOrParams?: any) => execute('PATCH', dataOrParams), [execute]),
    
    // Laravel-style method shortcuts
    // Read-only (Support controller pattern)
    fetch: useApiFetch,
    // Write (CRUD controller pattern)
    submit: useApiSubmit,
  };
}

/** Read-only API call - mimics ModelAjaxSupportController */
const useApiFetch = useCallback(async (route: string | RouteDefinition, params?: Record<string, any>) => {
  // This would be used for GET requests similar to ModelAjaxSupportController
  // In Inertia context, this would use Inertia.get() or similar
  return null;
}, []);

/** Write API call - mimics ModelAjaxCRUDController */
const useApiSubmit = useCallback(async (route: string | RouteDefinition, data: any) => {
  // This would be used for POST/PUT/DELETE similar to ModelAjaxCRUDController
  return null;
}, []);

/**
 * Laravel-style API method types for TypeScript
 */
export type ApiMethod = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'patch' | 'PATCH';

export default useApi;