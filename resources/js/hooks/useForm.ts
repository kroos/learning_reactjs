import { useState, useEffect, useCallback } from 'react';
import type { RouteDefinition } from '@/wayfinder';

// ============================================================
// useForm Hook - Laravel Base Model Pattern Equivalent
// Provides form state management similar to Laravel's base Model
// ============================================================

type FormFieldState = {
  value: string | number | boolean | File | null;
  error: string | null;
  touched: boolean;
  dirty: boolean;
};

type FormState<T extends Record<string, any> = Record<string, any>> = {
  fields: Record<string, FormFieldState>;
  submitCount: number;
  isSubmitting: boolean;
  errors: Record<string, string>;
  success: boolean;
  resetCount: number;
};

/**
 * Laravel-style form hook that provides:
 * - Controlled field state with error tracking
 * - Old value preservation (like old() in Blade)
 * - Error tracking similar to @error() in Blade
 * - Submitting state management
 * - Reset/reinitialize capabilities
 * 
 * Usage pattern mirrors Laravel Blade forms:
 *  - useForm initial state mirrors old() values
 * - Field errors map to @error() blocks
 * - Form submission follows Laravel patterns
 */
export function useForm<T extends Record<string, any> = Record<string, any>>(
  initialState: T,
  options: {
    onSubmit?: (data: T) => void | Promise<void>;
    validate?: (data: T) => Partial<Record<keyof T, string>>;
    onSuccess?: (data: T) => void;
    onError?: (errors: Partial<Record<keyof T, string>>) => void;
  } = {}
) {
  const [state, setState] = useState<FormState<T>>({
    fields: {},
    submitCount: 0,
    isSubmitting: false,
    errors: {},
    success: false,
    resetCount: 0,
  });

  // Initialize fields from initialState
  useEffect(() => {
    const initializeFields = (initial: T) => {
      const fields: Record<string, FormFieldState> = {};
      
      for (const key of Object.keys(initial)) {
        const value = initial[key as keyof T];
        fields[key as string] = {
          value: value as any,
          error: null,
          touched: false,
          dirty: false,
        };
      }
      
      setState(prev => ({
        ...prev,
        fields,
      }));
    };

    initializeFields(initialState);
  }, [initialState]);

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          value,
          dirty: true,
        },
      },
    }));
  }, []);

  const setFieldError = useCallback((name: keyof T, error: string | null) => {
    setState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          error,
        },
      },
    }));
  }, []);

  const markFieldTouched = useCallback((name: keyof T) => {
    setState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          touched: true,
        },
      },
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    setState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      // Get current form data
      const formData: T = {} as T;
      for (const [key, field] of Object.entries(state.fields) as [string, FormFieldState][]) {
        formData[key as keyof T] = field.value;
      }
      
      // Run validation if provided
      if (options.validate) {
        const validationErrors = options.validate(formData);
        setState(prev => ({
          ...prev,
          errors: validationErrors,
          isSubmitting: false,
        }));
        
        if (options.onError) {
          options.onError(validationErrors);
        }
        
        return;
      }
      
      // Execute submit
      if (options.onSubmit) {
        await options.onSubmit(formData);
      }
      
      setState(prev => ({
        ...prev,
        submitCount: prev.submitCount + 1,
        isSubmitting: false,
        success: true,
        errors: {},
      }));
      
      if (options.onSuccess) {
        options.onSuccess(formData);
      }
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        errors: { _form: 'An error occurred during submission' },
      }));
      
      if (options.onError) {
        options.onError({ _form: 'Submission failed' });
      }
    }
  }, [state.fields, options]);

  const resetForm = useCallback((newInitialState?: T) => {
    setState({
      fields: {},
      submitCount: 0,
      isSubmitting: false,
      errors: {},
      success: false,
      resetCount: (state.resetCount || 0) + 1,
    });
    
    if (newInitialState) {
      // Re-initialize fields
      useEffect(() => {
        const initializeFields = (initial: T) => {
          const fields: Record<string, FormFieldState> = {};
          
          for (const key of Object.keys(initial)) {
            const value = initial[key as keyof T];
            fields[key as string] = {
              value: value as any,
              error: null,
              touched: false,
              dirty: false,
            };
          }
          
          setState(prev => ({
            ...prev,
            fields,
          }));
        };
        initializeFields(newInitialState);
      }, [newInitialState]);
    }
  }, []);

  const getFieldProps = useCallback((name: keyof T) => {
    const field = state.fields[name as string];
    
    if (!field) {
      return {
        value: initialState[name as keyof T] as any,
        onChange: (e: React.ChangeEvent) => setFieldValue(name, (e.target as HTMLInputElement).value),
        onBlur: () => markFieldTouched(name),
        error: '',
        touched: false,
        dirty: false,
      };
    }
    
    return {
      value: field.value,
      onChange: (e: React.ChangeEvent) => setFieldValue(name, (e.target as HTMLInputElement).value),
      onBlur: () => markFieldTouched(name),
      error: field.error || '',
      touched: field.touched,
      dirty: field.dirty,
    };
  }, [state.fields, initialState]);

  return {
    // State
    state,
    success,
    isSubmitting,
    errors: state.errors,
    
    // Field management
    setFieldValue,
    setFieldError,
    markFieldTouched,
    getFieldProps,
    resetForm,
    
    // Actions
    handleSubmit,
  };
}

export default useForm;