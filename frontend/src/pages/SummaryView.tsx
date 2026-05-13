import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Presentation, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ContentTypeTag } from '../components/ui/ContentTypeTag';
import { SummaryOutputCard } from '../components/ui/SummaryOutputCard';
import { KeyConceptPill } from '../components/ui/KeyConceptPill';
import { FlashCard } from '../components/ui/FlashCard';
import { PracticeQuestion } from '../components/ui/PracticeQuestion';
import { fetchDocumentById } from '../utils/api';
import type { ContentType } from '../components/ui/ContentTypeTag';

export const SummaryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [docData, setDocData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    fetchDocumentById(id)
      .then(data => {
        setDocData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load document:", err);
        setIsLoading(false);
      });
  }, [id]);

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: docData?.title || 'Lecture Summary',
        text: 'Check out this lecture summary!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center text-[var(--color-text-secondary)]">Loading document data...</div>;
  }

  if (!docData) {
    return <div className="p-10 text-center text-[var(--color-text-secondary)]">Document not found or failed to load.</div>;
  }

  // Handle defaults
  const type = docData.sourceType || 'lecture_notes';
  const timestamp = new Date(docData.createdAt).toLocaleDateString();
  const summaryContent = 
    summaryLength === 'short' ? docData.summaryShort :
    summaryLength === 'medium' ? docData.summaryMedium :
    docData.summaryDetailed;

  return (
    <div className="animate-in fade-in duration-300">
      <div className="max-w-[760px] mx-auto mb-10">
        <Link to="/" className="print:hidden">
          <Button variant="ghost" size="sm" className="mb-6 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <ContentTypeTag type={type as ContentType} />
          <span className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
            {docData.sourceFilename || docData.sourceUrl || ''} · {timestamp}
          </span>
        </div>
        
        <h1 className="text-[var(--text-xl)] font-bold text-[var(--color-text-primary)] leading-tight mb-8">
          {docData.title || 'Untitled Document'}
        </h1>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[var(--color-bg-surface)] border-[1px] border-[var(--color-border)] p-1 rounded-full">
            {(['short', 'medium', 'detailed'] as const).map((len) => (
              <button
                key={len}
                onClick={() => setSummaryLength(len)}
                className={`px-6 py-1.5 rounded-full text-[var(--text-sm)] font-medium transition-all ${
                  summaryLength === len 
                    ? "bg-[var(--color-accent-primary)] text-white shadow-md" 
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {len.charAt(0).toUpperCase() + len.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <SummaryOutputCard content={summaryContent || 'Summary not available.'} className="mb-6" />

        <div className="flex flex-wrap gap-3 mb-12 print:hidden">
          <Button variant="secondary" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share Summary
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDownloadPDF}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Link to="/slides" state={{ docId: docData.id }}>
            <Button variant="secondary" size="sm">
              <Presentation className="w-4 h-4 mr-2" />
              Generate Slides
            </Button>
          </Link>
        </div>

        {docData.keyConcepts && docData.keyConcepts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-[var(--text-lg)] font-bold text-[var(--color-text-primary)] mb-4">Key Concepts</h2>
            <div className="flex flex-wrap gap-2">
              {docData.keyConcepts.map((concept: any, idx: number) => (
                <KeyConceptPill key={idx} label={concept.term} />
              ))}
            </div>
          </div>
        )}

        <hr className="border-[var(--color-border)] mb-12" />

        {docData.flashcards && docData.flashcards.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[var(--text-lg)] font-bold text-[var(--color-text-primary)]">Flashcards</h2>
              <div className="flex gap-2">
                <Button 
                  variant="icon" 
                  size="icon" 
                  disabled={flashcardIndex === 0}
                  onClick={() => setFlashcardIndex(prev => prev - 1)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button 
                  variant="icon" 
                  size="icon"
                  disabled={flashcardIndex === docData.flashcards.length - 1}
                  onClick={() => setFlashcardIndex(prev => prev + 1)}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <FlashCard 
                question={docData.flashcards[flashcardIndex].q} 
                answer={docData.flashcards[flashcardIndex].a} 
                cardNumber={flashcardIndex + 1} 
              />
            </div>
            <div className="text-center mt-4 text-[var(--text-sm)] text-[var(--color-text-muted)]">
              Card {flashcardIndex + 1} of {docData.flashcards.length}
            </div>
          </div>
        )}

        {docData.practiceQuestions && docData.practiceQuestions.length > 0 && (
          <div className="mb-16">
            <h2 className="text-[var(--text-lg)] font-bold text-[var(--color-text-primary)] mb-6">Practice Questions</h2>
            <div className="flex flex-col gap-8">
              {docData.practiceQuestions.map((q: any, idx: number) => (
                <PracticeQuestion 
                  key={idx}
                  question={q.question}
                  options={q.options}
                  correctAnswerIndex={q.correct}
                  questionNumber={idx + 1}
                  totalQuestions={docData.practiceQuestions.length}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
