'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'primary', size = 'md', className, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-kumfora-blush text-kumfora-terracotta',
      success: 'bg-kumfora-sageLight text-kumfora-sage',
      warning: 'bg-amber-100 text-amber-700',
      danger: 'bg-kumfora-rose text-kumfora-terracotta',
      neutral: 'bg-kumfora-lightGray text-kumfora-slate',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-caption',
      md: 'px-2.5 py-0.5 text-body-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';