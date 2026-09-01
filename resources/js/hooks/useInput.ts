import { useCallback, useState } from 'react';
import type { FormFieldState } from './useForm';

/**
 * useInput Hook - Laravel Form Field Pattern Equivalent
 * 
 * Provides individual field control that mirrors Laravel Blade form patterns:
 * - value: input value (mirrors old('field', $var->field))
 * - onChange: handles input changes
 * - onBlur: marks field as touched (mirrors @event)
 * - error: error message (mirrors @error('field') $message @enderror)
 * - touched: whether field has been blurred (for error display)
 * - dirty: whether field has been modified (for validation styling)
 * 
 * Usage in React components mirrors Blade form groups:
 * <div className="form-group row">
 *   <label className="col-form-label">Label</label>
 *   <div className="col-input">
 *     <input 
 *       {...getFieldProps('fieldName')}
 *       className="form-control"
 *       placeholder="Field"
 *     />
 *     {getFieldProps('fieldName').error && <div className="invalid-feedback">{getFieldProps('fieldName').error}</div>}
 *   </div>
 * </div>
 */
export function useInput(name: string, options: { 
  defaultValue?: any; 
  rules?: { required?: boolean; min?: number; max?: number; pattern?: string }; 
} = {}) {
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [value, setValue] = useState(options.defaultValue);
  const [error, setError] = useState<string | null>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValue(newValue);
    setDirty(true);
    
    // Validate on change if rules provided
    if (options.rules?.required && !newValue) {
      setError('This field is required');
    } else if (options.rules?.min && newValue && typeof newValue === 'number' && newValue < options.rules.min) {
      setError(`Minimum value is ${options.rules.min}`);
    } else if (options.rules?.max && newValue && typeof newValue === 'number' && newValue > options.rules.max) {
      setError(`Maximum value is ${options.rules.max}`);
    } else {
      setError(null);
    }
  }, [name, options.rules]);

  const onBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const reset = useCallback((newDefault?: any) => {
    setValue(newDefault ?? options.defaultValue ?? '');
    setTouched(false);
    setDirty(false);
    setError(null);
  }, [options.defaultValue]);

  return {
    value,
    onChange,
    onBlur,
    touched,
    dirty,
    error,
    reset,
    // Getter for consistent API with useForm
    get errorValue() { return error; },
    get touchedValue() { return touched; },
    get dirtyValue() { return dirty; },
  };
}

export default useInput;