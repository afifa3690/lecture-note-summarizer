import React from 'react';
import { cn } from '../../utils/cn';
import { ContentTypeTag, type ContentType } from './ContentTypeTag';
import { ProcessingBadge, type ProcessingStatus } from './ProcessingBadge';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './Button';

interface UploadCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  type: ContentType;
  status: ProcessingStatus;
  filename: string;
  filesize?: string;
  timestamp: string;
  onClick?: () => void;
  onActionClick?: (e: React.MouseEvent) => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  title,
  type,
  status,
  filename,
  filesize,
  timestamp,
  onClick,
  onActionClick,
  className,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between bg-[var(--color-bg-surface)] border-[1px] border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-6 cursor-pointer transition-all duration-150 ease-in-out",
        "hover:bg-[var(--color-bg-elevated)] hover:border-[rgba(79,110,247,0.4)] hover:-translate-y-[2px] hover:shadow-[var(--shadow-sm)]",
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-start mb-4">
        <ContentTypeTag type={type} />
        <span className="text-[var(--text-xs)] text-[var(--color-text-muted)] font-medium">
          {timestamp}
        </span>
      </div>

      <div className="mb-6 flex-grow">
        <h3 className="text-[var(--text-md)] font-semibold text-[var(--color-text-primary)] leading-tight line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-[var(--text-sm)] text-[var(--color-text-secondary)]">
          <span className="truncate max-w-[200px]">📄 {filename}</span>
          {filesize && <span>· {filesize}</span>}
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <ProcessingBadge status={status} />
        <Button 
          variant="icon" 
          size="icon" 
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onActionClick?.(e);
          }}
        >
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
