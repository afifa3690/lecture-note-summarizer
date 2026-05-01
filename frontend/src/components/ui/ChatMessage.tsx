import React from 'react';
import { cn } from '../../utils/cn';

interface ChatMessageProps {
  role: 'user' | 'ai';
  content: string;
  timestamp?: string;
  citations?: string[];
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, timestamp, citations }) => {
  return (
    <div className={cn(
      "flex flex-col mb-6 max-w-[85%]",
      role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
    )}>
      <div className={cn(
        "px-4 py-3 rounded-[var(--radius-md)] text-[var(--text-base)]",
        role === 'user' 
          ? "bg-[var(--color-accent-primary)] text-white rounded-br-[4px] shadow-sm" 
          : "bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded-bl-[4px] border-[1px] border-[var(--color-border)]"
      )}>
        <p className="leading-relaxed">{content}</p>
        
        {citations && citations.length > 0 && (
          <div className="mt-3 pt-3 border-t-[1px] border-[var(--color-border)] flex flex-wrap gap-2">
            {citations.map((cite, idx) => (
              <span 
                key={idx} 
                className="text-[var(--text-xs)] font-medium px-2 py-0.5 bg-[var(--color-accent-glow)] text-[var(--color-accent-primary)] rounded-[var(--radius-sm)] border-[1px] border-[rgba(79,110,247,0.2)]"
              >
                [{idx + 1}] {cite}
              </span>
            ))}
          </div>
        )}
      </div>
      {timestamp && (
        <span className="mt-1.5 text-[var(--text-xs)] text-[var(--color-text-muted)]">
          {timestamp}
        </span>
      )}
    </div>
  );
};
