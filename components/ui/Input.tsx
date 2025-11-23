import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, id, required, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[0.875rem] font-medium mb-2"
            style={{ color: 'var(--color-primary-black)' }}
          >
            {label}
            {required && <span style={{ color: 'var(--color-error)' }} className="ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={`input ${error ? 'input-error' : ''} ${className}`}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          required={required}
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-[0.875rem]"
            style={{ color: 'var(--color-error)' }}
            role="alert"
          >
            {error}
          </p>
        )}

        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-[0.875rem]"
            style={{ color: 'var(--color-secondary-text)' }}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
