import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Presentation, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ContentTypeTag } from '../components/ui/ContentTypeTag';
import { SummaryOutputCard } from '../components/ui/SummaryOutputCard';
import { KeyConceptPill } from '../components/ui/KeyConceptPill';
import { FlashCard } from '../components/ui/FlashCard';
import { PracticeQuestion } from '../components/ui/PracticeQuestion';

export const SummaryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'detailed'>('medium');

  // Mock data
  const docData = {
    id: '1',
    title: 'Introduction to Artificial Intelligence and Machine Learning Core Concepts',
    type: 'lecture_notes',
    filename: 'intro_ai_week1.pdf',
    timestamp: '2 hours ago',
    summary: {
      short: "This lecture covers the foundational concepts of Artificial Intelligence (AI) and Machine Learning (ML). It defines AI as systems capable of human-like intelligence and ML as a subset where algorithms learn from data without explicit programming.",
      medium: "This lecture introduces Artificial Intelligence (AI) and Machine Learning (ML). AI is defined as creating systems that exhibit human intelligence, encompassing reasoning, learning, and problem-solving. ML, a critical subset of AI, focuses on algorithms that improve automatically through experience. The core paradigms of ML are discussed: Supervised Learning (learning from labeled data), Unsupervised Learning (finding patterns in unlabeled data), and Reinforcement Learning (learning via trial and error to maximize rewards).",
      detailed: "This comprehensive lecture provides a deep dive into Artificial Intelligence (AI) and Machine Learning (ML). It begins by contrasting narrow AI (specialized tasks) with artificial general intelligence (human-level cognition across domains). The focus then shifts to ML, detailing how algorithms parse data, learn representations, and make predictions. Key algorithms such as Linear Regression, Decision Trees, and Neural Networks are introduced conceptually. The lecture concludes with real-world applications of ML in computer vision, natural language processing, and predictive analytics, highlighting both the immense potential and current limitations of these technologies."
    },
    concepts: [
      { term: "Artificial Intelligence (AI)", definition: "The theory and development of computer systems able to perform tasks normally requiring human intelligence." },
      { term: "Machine Learning (ML)", definition: "A subset of AI focused on building systems that learn from data, identifying patterns and making decisions with minimal human intervention." },
      { term: "Supervised Learning", definition: "A type of ML where the model is trained on a labeled dataset, meaning the desired output is known." },
      { term: "Neural Networks", definition: "Computing systems inspired by the biological neural networks that constitute animal brains." }
    ],
    flashcards: [
      { q: "What is the primary difference between AI and Machine Learning?", a: "AI is the broader concept of machines being able to carry out tasks in a way that we would consider 'smart', while ML is a specific application of AI based on the idea that machines can learn from data." },
      { q: "Define Supervised Learning.", a: "Training a model using a labeled dataset where the correct answer is provided during training." }
    ],
    quiz: {
      question: "Which of the following is NOT a core paradigm of Machine Learning mentioned in the lecture?",
      options: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Generative Learning",
        "Reinforcement Learning"
      ],
      correct: 2
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="max-w-[760px] mx-auto mb-10">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <ContentTypeTag type={docData.type as any} />
          <span className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
            {docData.filename} · {docData.timestamp}
          </span>
        </div>
        
        <h1 className="text-[var(--text-xl)] font-bold text-[var(--color-text-primary)] leading-tight mb-8">
          {docData.title}
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

        <SummaryOutputCard content={docData.summary[summaryLength]} className="mb-6" />

        <div className="flex flex-wrap gap-3 mb-12">
          <Button variant="secondary" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share Summary
          </Button>
          <Button variant="secondary" size="sm">
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

        <div className="mb-12">
          <h2 className="text-[var(--text-lg)] font-bold text-[var(--color-text-primary)] mb-4">Key Concepts</h2>
          <div className="flex flex-wrap gap-2">
            {docData.concepts.map((concept, idx) => (
              <KeyConceptPill key={idx} label={concept.term} />
            ))}
          </div>
        </div>

        <hr className="border-[var(--color-border)] mb-12" />

        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[var(--text-lg)] font-bold text-[var(--color-text-primary)]">Flashcards</h2>
            <div className="flex gap-2">
              <Button variant="icon" size="icon" disabled>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="icon" size="icon">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <FlashCard 
              question={docData.flashcards[0].q} 
              answer={docData.flashcards[0].a} 
              cardNumber={1} 
            />
          </div>
          <div className="text-center mt-4 text-[var(--text-sm)] text-[var(--color-text-muted)]">
            Card 1 of {docData.flashcards.length}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-[var(--text-lg)] font-bold text-[var(--color-text-primary)] mb-6">Practice Questions</h2>
          <PracticeQuestion 
            question={docData.quiz.question}
            options={docData.quiz.options}
            correctAnswerIndex={docData.quiz.correct}
            questionNumber={1}
            totalQuestions={1}
          />
        </div>
      </div>
    </div>
  );
};
