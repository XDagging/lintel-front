import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-black',
          variant === 'primary' && 'bg-black text-white hover:bg-uber-gray-800',
          variant === 'secondary' && 'bg-uber-gray-100 text-black hover:bg-uber-gray-200',
          variant === 'ghost' && 'bg-transparent text-black hover:bg-uber-gray-100',
          variant === 'danger' && 'bg-uber-red text-white hover:bg-red-700',
          size === 'sm' && 'h-9 px-4 text-xs',
          size === 'md' && 'h-12 px-6 text-sm',
          size === 'lg' && 'h-14 px-8 text-base',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
