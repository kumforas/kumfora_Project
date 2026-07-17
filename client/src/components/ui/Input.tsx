'use client';

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="label">
            {label}
            {props.required && <span className="text-kumfora-rose ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-kumfora-gray pointer-events-none" aria-hidden="true">
              <span className="block w-4 h-4 sm:w-5 sm:h-5 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">{leftIcon}</span>
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'input',
              leftIcon && 'pl-8 sm:pl-10',
              rightIcon && 'pr-8 sm:pr-10',
              error && 'border-kumfora-rose focus:border-kumfora-rose focus:ring-kumfora-blush',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-kumfora-gray">
              <span className="block w-4 h-4 sm:w-5 sm:h-5 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">{rightIcon}</span>
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 text-body-sm text-kumfora-rose" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-body-sm text-kumfora-gray">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="label">
            {label}
            {props.required && <span className="text-kumfora-rose ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'input min-h-[100px] resize-y',
            error && 'border-kumfora-rose focus:border-kumfora-rose focus:ring-kumfora-blush',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-body-sm text-kumfora-rose" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-body-sm text-kumfora-gray">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';