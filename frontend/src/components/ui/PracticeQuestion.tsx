import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Check, X, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface PracticeQuestionProps {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  questionNumber: number;
  totalQuestions: number;
}

export const PracticeQuestion: React.FC<PracticeQuestionProps> = ({
  question,
  options,
  correctAnswerIndex,
  questionNumber,
  totalQuestions
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const getOptionStyles = (index: number) => {
    if (!isSubmitted) {
      return selectedOption === index 
        ? "bg-[var(--color-accent-glow)] border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]"
        : "bg-transparent border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]";
    }

    if (index === correctAnswerIndex) {
      return "bg-[var(--color-success-bg)] border-[var(--color-success)] text-[var(--color-success)]";
    }

    if (selectedOption === index && index !== correctAnswerIndex) {
      return "bg-[var(--color-danger-bg)] border-[var(--color-danger)] text-[var(--color-danger)]";
    }

    return "bg-transparent border-[var(--color-border)] text-[var(--color-text-muted)] opacity-50";
  };

  return (
    <div className="bg-[var(--color-bg-surface)] border-[1px] border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <span className="text-[var(--text-xs)] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Question {questionNumber} of {totalQuestions}
        </span>
        {isSubmitted && (
          <Button variant="ghost" size="sm" className="text-[var(--color-accent-primary)]">
            Next <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>

      <h3 className="text-[var(--text-md)] font-bold text-[var(--color-text-primary)] mb-8">
        {question}
      </h3>

      <div className="flex flex-col gap-3 mb-8">
        {options.map((option, idx) => (
          <button
            key={idx}
            disabled={isSubmitted}
            onClick={() => setSelectedOption(idx)}
            className={cn(
              "flex items-center justify-between px-4 py-3.5 border-[1px] rounded-[var(--radius-md)] text-left transition-all duration-150",
              getOptionStyles(idx)
            )}
          >
            <span>{option}</span>
            {isSubmitted && idx === correctAnswerIndex && <Check className="w-4 h-4" />}
            {isSubmitted && selectedOption === idx && idx !== correctAnswerIndex && <X className="w-4 h-4" />}
          </button>
        ))}
      </div>

      {!isSubmitted && (
        <Button 
          variant="primary" 
          fullWidth 
          disabled={selectedOption === null}
          onClick={handleSubmit}
        >
          Check Answer
        </Button>
      )}

      {isSubmitted && (
        <div className={cn(
          "p-4 rounded-[var(--radius-md)] animate-in fade-in slide-in-from-bottom-2 duration-300",
          selectedOption === correctAnswerIndex ? "bg-[var(--color-success-bg)]" : "bg-[var(--color-danger-bg)]"
        )}>
          <p className={cn(
            "text-[var(--text-sm)] font-medium",
            selectedOption === correctAnswerIndex ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"
          )}>
            {selectedOption === correctAnswerIndex 
              ? "Correct! You've grasped this concept well." 
              : `Incorrect. The correct answer was: ${options[correctAnswerIndex]}`}
          </p>
        </div>
      )}
    </div>
  );
};
