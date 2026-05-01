import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface FlashCardProps {
  question: string;
  answer: string;
  cardNumber?: number;
}

export const FlashCard: React.FC<FlashCardProps> = ({ question, answer, cardNumber }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full h-[240px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-[var(--color-bg-surface)] border-[1px] border-[var(--color-accent-primary)] rounded-[var(--radius-lg)] p-8 flex flex-col items-center justify-center text-center shadow-[var(--shadow-sm)]">
          {cardNumber && (
            <span className="absolute top-4 right-4 text-[var(--text-xs)] text-[var(--color-text-muted)] font-medium">
              #{cardNumber}
            </span>
          )}
          <h3 className="text-[var(--text-md)] font-medium text-[var(--color-text-primary)]">
            {question}
          </h3>
          <p className="mt-4 text-[var(--text-xs)] text-[var(--color-text-muted)] uppercase tracking-wider">
            Tap to reveal
          </p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[var(--color-bg-elevated)] border-[1px] border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 flex flex-col items-center justify-center text-center shadow-[var(--shadow-sm)]">
          <h3 className="text-[var(--text-md)] font-medium text-[var(--color-text-primary)] leading-relaxed">
            {answer}
          </h3>
          <p className="mt-4 text-[var(--text-xs)] text-[var(--color-text-muted)] uppercase tracking-wider">
            Tap to flip back
          </p>
        </div>
      </div>
    </div>
  );
};
