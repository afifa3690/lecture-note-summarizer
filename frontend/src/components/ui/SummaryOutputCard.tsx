import React from 'react';
import { cn } from '../../utils/cn';
import { Copy, Download, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface SummaryOutputCardProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

export const SummaryOutputCard: React.FC<SummaryOutputCardProps> = ({ content, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-[var(--color-bg-surface)] border-[1px] border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 relative group",
        className
      )}
      {...props}
    >
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="icon" size="icon" title="Copy Summary">
          <Copy className="w-4 h-4" />
        </Button>
        <Button variant="icon" size="icon" title="Download">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-4 text-[var(--color-accent-primary)]">
        <Sparkles className="w-5 h-5" />
        <span className="text-[var(--text-md)] font-bold">AI Summary</span>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-[var(--text-base)] text-[var(--color-text-primary)] leading-[1.75]">
          {content}
        </p>
      </div>
    </div>
  );
};
