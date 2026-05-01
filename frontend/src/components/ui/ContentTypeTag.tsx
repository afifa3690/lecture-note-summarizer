import React from 'react';
import { cn } from '../../utils/cn';

export type ContentType = 
  | 'lecture_notes'
  | 'textbook_chapter'
  | 'scanned_notes'
  | 'website_link'
  | 'youtube_lecture'
  | 'pdf_document'
  | 'audio_recording';

interface ContentTypeTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: ContentType;
}

const typeStyles: Record<ContentType, { label: string; bg: string; text: string }> = {
  lecture_notes: { label: 'Lecture Notes', bg: 'rgba(79,110,247,0.15)', text: '#A5B4FC' },
  textbook_chapter: { label: 'Textbook Chapter', bg: 'rgba(34,197,94,0.15)', text: '#86EFAC' },
  scanned_notes: { label: 'Scanned / Handwritten', bg: 'rgba(245,158,11,0.15)', text: '#FCD34D' },
  website_link: { label: 'Website Link', bg: 'rgba(56,189,248,0.15)', text: '#7DD3FC' },
  youtube_lecture: { label: 'YouTube Lecture', bg: 'rgba(239,68,68,0.15)', text: '#FCA5A5' },
  pdf_document: { label: 'PDF Document', bg: 'rgba(155,92,246,0.15)', text: '#C4B5FD' },
  audio_recording: { label: 'Audio Recording', bg: 'rgba(16,185,129,0.15)', text: '#6EE7B7' },
};

export const ContentTypeTag: React.FC<ContentTypeTagProps> = ({ type, className, ...props }) => {
  const style = typeStyles[type];

  if (!style) return null;

  return (
    <span
      className={cn(
        "text-[var(--text-xs)] font-semibold uppercase tracking-[0.05em] px-2 py-[3px] rounded-[var(--radius-sm)]",
        className
      )}
      style={{ backgroundColor: style.bg, color: style.text }}
      {...props}
    >
      {style.label}
    </span>
  );
};
