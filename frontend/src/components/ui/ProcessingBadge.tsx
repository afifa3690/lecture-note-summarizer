import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2, CheckCircle, XCircle, Eye } from 'lucide-react';

export type ProcessingStatus = 'processing' | 'ready' | 'failed' | 'ocr';

interface ProcessingBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: ProcessingStatus;
}

const statusConfig: Record<ProcessingStatus, { label: string; icon: React.ReactNode; bg: string; text: string }> = {
  processing: { label: 'Processing', icon: <Loader2 className="w-3 h-3 animate-spin" />, bg: 'var(--color-warning-bg)', text: 'var(--color-warning)' },
  ready: { label: 'Ready', icon: <CheckCircle className="w-3 h-3" />, bg: 'var(--color-success-bg)', text: 'var(--color-success)' },
  failed: { label: 'Failed', icon: <XCircle className="w-3 h-3" />, bg: 'var(--color-danger-bg)', text: 'var(--color-danger)' },
  ocr: { label: 'OCR Running', icon: <Eye className="w-3 h-3 animate-pulse" />, bg: 'var(--color-info-bg)', text: 'var(--color-info)' },
};

export const ProcessingBadge: React.FC<ProcessingBadgeProps> = ({ status, className, ...props }) => {
  const config = statusConfig[status];

  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[var(--text-xs)] font-semibold px-2 py-[3px] rounded-[var(--radius-sm)]",
        className
      )}
      style={{ backgroundColor: config.bg, color: config.text }}
      {...props}
    >
      {config.icon}
      {config.label}
    </span>
  );
};
