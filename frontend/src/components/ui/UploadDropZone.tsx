import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { UploadCloud, Link } from 'lucide-react';
import { Button } from './Button';

interface UploadDropZoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  onFileSelect: (files: FileList) => void;
  onUrlSubmit?: (url: string) => void;
}

export const UploadDropZone: React.FC<UploadDropZoneProps> = ({ onFileSelect, onUrlSubmit, className, ...props }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [url, setUrl] = useState('');

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-[var(--color-bg-surface)] border-[2px] border-dashed rounded-[var(--radius-lg)] px-8 py-16 transition-all duration-150 ease-in-out text-center cursor-pointer",
        isDragging 
          ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-glow)]" 
          : "border-[var(--color-border)] hover:border-[var(--color-border-focus)]",
        className
      )}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
      {...props}
    >
      <input 
        id="file-upload" 
        type="file" 
        multiple 
        className="hidden" 
        onChange={(e) => {
          if (e.target.files) onFileSelect(e.target.files);
        }}
        accept=".pdf,.docx,.txt,image/*,audio/*"
      />
      
      <div className="bg-[var(--color-bg-elevated)] p-4 rounded-full mb-6">
        <UploadCloud className="w-8 h-8 text-[var(--color-accent-primary)]" />
      </div>
      
      <h3 className="text-[var(--text-lg)] font-bold text-[var(--color-text-primary)] mb-2">
        Drop files here or click to browse
      </h3>
      <p className="text-[var(--text-base)] text-[var(--color-text-muted)] max-w-md mx-auto mb-6">
        or paste a YouTube / website link in the field below
      </p>

      <div className="flex w-full max-w-md mx-auto gap-2 mb-6" onClick={(e) => e.stopPropagation()}>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-[var(--color-text-muted)]" />
          </div>
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full bg-[var(--color-bg-subtle)] border-[1px] border-[var(--color-border)] rounded-[var(--radius-md)] pl-10 pr-4 py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)]"
          />
        </div>
        <Button 
          variant="primary" 
          onClick={(e) => {
            e.stopPropagation();
            if (url && onUrlSubmit) {
              onUrlSubmit(url);
              setUrl('');
            }
          }}
        >
          Add URL
        </Button>
      </div>
      
      <div className="flex gap-2 justify-center flex-wrap mb-8">
        {['PDF', 'DOCX', 'TXT', 'Images', 'Audio'].map((type) => (
          <span key={type} className="text-[var(--text-xs)] font-medium bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] px-2 py-1 rounded-[var(--radius-sm)]">
            {type}
          </span>
        ))}
      </div>
      
      <Button variant="secondary" onClick={(e) => { e.stopPropagation(); document.getElementById('file-upload')?.click(); }}>
        Browse Files
      </Button>
    </div>
  );
};
