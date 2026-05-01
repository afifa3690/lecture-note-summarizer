import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, fullWidth, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-100 ease-in-out focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-primary-hover)] hover:-translate-y-[1px] focus:shadow-[var(--shadow-accent)]",
      secondary: "bg-transparent border-[1px] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)] focus:shadow-[var(--shadow-accent)]",
      danger: "bg-[var(--color-danger)] text-white hover:opacity-90 focus:shadow-[var(--shadow-accent)]",
      ghost: "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]",
      icon: "bg-transparent hover:bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)]"
    };

    const sizes = {
      sm: "text-[var(--text-xs)] px-3 py-1.5 rounded-[var(--radius-sm)]",
      md: "text-[var(--text-sm)] px-5 py-2.5 rounded-[var(--radius-md)]",
      lg: "text-[var(--text-base)] px-6 py-3 rounded-[var(--radius-md)]",
      icon: "p-2 rounded-[var(--radius-md)]"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
