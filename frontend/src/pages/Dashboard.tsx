import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { UploadDropZone } from '../components/ui/UploadDropZone';
import { UploadCard } from '../components/ui/UploadCard';
import { Link2, Plus } from 'lucide-react';
import type { ContentType } from '../components/ui/ContentTypeTag';
import type { ProcessingStatus } from '../components/ui/ProcessingBadge';

// Mock data
const mockDocuments = [
  {
    id: '1',
    title: 'Introduction to Artificial Intelligence and Machine Learning Core Concepts',
    type: 'lecture_notes' as ContentType,
    status: 'ready' as ProcessingStatus,
    filename: 'intro_ai_week1.pdf',
    filesize: '2.4 MB',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    title: 'Cellular Respiration and Photosynthesis',
    type: 'textbook_chapter' as ContentType,
    status: 'processing' as ProcessingStatus,
    filename: 'bio_ch4.docx',
    filesize: '1.1 MB',
    timestamp: '5 hours ago'
  },
  {
    id: '3',
    title: 'History of the Roman Empire - Fall of Rome',
    type: 'youtube_lecture' as ContentType,
    status: 'ready' as ProcessingStatus,
    filename: 'youtube.com/watch?v=123',
    timestamp: 'Yesterday'
  },
  {
    id: '4',
    title: 'Calculus III - Handwritten Notes',
    type: 'scanned_notes' as ContentType,
    status: 'ocr' as ProcessingStatus,
    filename: 'scan_001.jpg',
    filesize: '4.8 MB',
    timestamp: 'Yesterday'
  }
];

export const Dashboard: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (files: FileList) => {
    console.log('Files selected:', files);
    // Handle file upload logic here
    setShowUpload(false);
  };

  return (
    <div className="animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-[var(--text-xl)] font-bold text-[var(--color-text-primary)]">
            My Documents
          </h1>
          <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-1">
            4 documents · Last uploaded 2 hours ago
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => setShowUpload(true)}>
            <Link2 className="w-4 h-4 mr-2" />
            Add URL
          </Button>
          <Button variant="primary" onClick={() => setShowUpload(!showUpload)}>
            <Plus className="w-4 h-4 mr-2" />
            Upload New
          </Button>
        </div>
      </div>

      {showUpload && (
        <div className="mb-8 animate-in slide-in-from-top-4 duration-200">
          <UploadDropZone onFileSelect={handleFileSelect} />
        </div>
      )}

      {mockDocuments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockDocuments.map((doc) => (
            <UploadCard
              key={doc.id}
              title={doc.title}
              type={doc.type}
              status={doc.status}
              filename={doc.filename}
              filesize={doc.filesize}
              timestamp={doc.timestamp}
              onClick={() => navigate(`/summary/${doc.id}`)}
              onActionClick={() => console.log(`Action menu for ${doc.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[var(--color-bg-subtle)] rounded-full flex items-center justify-center mb-6">
            <Plus className="w-8 h-8 text-[var(--color-text-muted)]" />
          </div>
          <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text-secondary)] mb-2">
            No documents yet
          </h2>
          <p className="text-[var(--text-base)] text-[var(--color-text-muted)] max-w-md mx-auto mb-6">
            Upload your first lecture note, PDF, or paste a YouTube link to generate summaries and flashcards.
          </p>
          <Button variant="primary" onClick={() => setShowUpload(true)}>
            Upload your first document
          </Button>
        </div>
      )}
    </div>
  );
};
