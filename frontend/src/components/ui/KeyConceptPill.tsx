import React from 'react';
import { cn } from '../../utils/cn';

interface KeyConceptPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
}

export const KeyConceptPill: React.FC<KeyConceptPillProps> = ({ label, className, ...props }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center bg-[rgba(245,158,11,0.12)] text-[var(--color-accent-warm)] text-[var(--text-sm)] font-semibold px-2 py-[2px] rounded-[var(--radius-sm)] cursor-pointer hover:bg-[rgba(245,158,11,0.2)] transition-colors whitespace-nowrap",
        className
      )}
      {...props}
    >
      {label}
    </span>
  );
};
