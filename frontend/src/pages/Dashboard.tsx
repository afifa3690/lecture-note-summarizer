import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { UploadDropZone } from '../components/ui/UploadDropZone';
import { UploadCard } from '../components/ui/UploadCard';
import { Link2, Plus } from 'lucide-react';
import { uploadFile, uploadUrl, fetchDocuments } from '../utils/api';
import type { ContentType } from '../components/ui/ContentTypeTag';
import type { ProcessingStatus } from '../components/ui/ProcessingBadge';

export const Dashboard: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const getContentType = (sourceType: string): ContentType => {
    switch (sourceType) {
      case 'pdf': return 'pdf_document';
      case 'youtube': return 'youtube_lecture';
      case 'url': return 'website_link';
      case 'pptx':
      case 'document': return 'lecture_notes';
      default: return 'lecture_notes';
    }
  };

  useEffect(() => {
    fetchDocuments()
      .then(docs => {
        if (Array.isArray(docs)) setDocuments(docs);
      })
      .catch(err => console.error('Failed to fetch documents:', err));
  }, []);

  const handleFileSelect = async (files: FileList) => {
    if (files.length === 0) return;
    setIsUploading(true);
    try {
      const res = await uploadFile(files[0]);
      if (res.document) {
        setDocuments(prev => [res.document, ...prev]);
      }
      setShowUpload(false);
    } catch (err: any) {
      console.error('Upload failed:', err);
      alert('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = async (url: string) => {
    if (!url) return;
    setIsUploading(true);
    try {
      const res = await uploadUrl(url);
      if (res.document) {
        setDocuments(prev => [res.document, ...prev]);
      }
      setShowUpload(false);
    } catch (err: any) {
      console.error('URL upload failed:', err);
      alert('URL Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-[var(--text-xl)] font-bold text-[var(--color-text-primary)]">
            My Documents
          </h1>
          <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-1">
            {documents.length} {documents.length === 1 ? 'document' : 'documents'}
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
          <UploadDropZone 
            onFileSelect={handleFileSelect} 
            onUrlSubmit={handleUrlSubmit} 
          />
          {isUploading && <p className="text-center mt-4 text-[var(--color-text-secondary)] font-medium">Uploading and processing document... this may take a few seconds.</p>}
        </div>
      )}

      {documents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <UploadCard
              key={doc.id}
              title={doc.title}
              type={doc.type || getContentType(doc.sourceType)}
              status={doc.status || doc.processingStatus || 'ready'}
              filename={doc.filename || doc.sourceFilename || doc.sourceUrl || ''}
              filesize={doc.filesize}
              timestamp={doc.timestamp || new Date(doc.createdAt).toLocaleDateString()}
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
