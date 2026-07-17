'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kumfora-terracotta focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-kumfora-hotPink text-white hover:bg-kumfora-deepPink active:bg-kumfora-deepPink shadow-soft',
      secondary: 'bg-kumfora-white text-kumfora-charcoal border border-kumfora-lightGray hover:bg-kumfora-cream hover:border-kumfora-rose',
      ghost: 'bg-transparent text-kumfora-charcoal hover:bg-kumfora-blush',
      link: 'bg-transparent text-kumfora-terracotta hover:text-kumfora-coral hover:bg-kumfora-blush px-0 underline-offset-2 hover:underline',
      danger: 'bg-kumfora-rose text-white hover:bg-red-600 active:bg-red-700',
    };

    const sizeStyles = {
      sm: 'px-2.5 py-1.5 sm:px-3 text-body-sm',
      md: 'px-4 py-2 sm:px-5 sm:py-2.5 text-body-sm sm:text-body',
      lg: 'px-5 py-2.5 sm:px-6 sm:py-3 text-body sm:text-body-lg',
      xl: 'px-6 py-3 sm:px-8 sm:py-4 text-body sm:text-heading-sm',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], widthStyles, className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';