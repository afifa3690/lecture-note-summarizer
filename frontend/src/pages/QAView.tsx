import React, { useState } from 'react';
import { Send, Search, FileText, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ChatMessage } from '../components/ui/ChatMessage';
import { ContentTypeTag } from '../components/ui/ContentTypeTag';
import { cn } from '../utils/cn';

export const QAView: React.FC = () => {
  const [message, setMessage] = useState('');
  const [activeDocId, setActiveDocId] = useState('1');

  // Mock data
  const docs = [
    { id: '1', title: 'Intro to AI & ML', type: 'lecture_notes' },
    { id: '2', title: 'Cellular Respiration', type: 'textbook_chapter' },
    { id: '3', title: 'History of Rome', type: 'youtube_lecture' },
  ];

  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', content: "Hello! I've analyzed your documents. Ask me anything about the core concepts of AI or cellular respiration.", timestamp: '10:05 AM' },
    { role: 'user', content: "What are the three main types of Machine Learning mentioned in the AI lecture?", timestamp: '10:06 AM' },
    { 
      role: 'ai', 
      content: "Based on your 'Intro to AI & ML' notes, the three main types are Supervised Learning, Unsupervised Learning, and Reinforcement Learning.", 
      timestamp: '10:06 AM',
      citations: ['Intro to AI & ML, Slide 14']
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newUserMsg = { role: 'user' as const, content: message, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatHistory([...chatHistory, newUserMsg]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { 
        role: 'ai' as const, 
        content: "That's a great question. According to the source material...", 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: ['Intro to AI & ML, Page 4']
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-100px)] flex bg-[var(--color-bg-surface)] rounded-[var(--radius-lg)] border-[1px] border-[var(--color-border)] overflow-hidden animate-in fade-in duration-300">
      {/* Document Sidebar (Desktop) */}
      <div className="hidden lg:flex flex-col w-[320px] border-r-[1px] border-[var(--color-border)]">
        <div className="p-4 border-b-[1px] border-[var(--color-border)]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--color-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search sources..." 
              className="w-full bg-[var(--color-bg-elevated)] border-[1px] border-[var(--color-border)] rounded-[var(--radius-md)] pl-10 pr-4 py-2 text-[var(--text-sm)] focus:outline-none focus:border-[var(--color-accent-primary)]"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          <h4 className="text-[var(--text-xs)] font-bold uppercase text-[var(--color-text-muted)] px-3 py-2">Sources</h4>
          <div className="space-y-1">
            {docs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setActiveDocId(doc.id)}
                className={cn(
                  "w-full flex flex-col gap-2 p-3 rounded-[var(--radius-md)] text-left transition-colors",
                  activeDocId === doc.id 
                    ? "bg-[var(--color-accent-glow)] border-[1px] border-[rgba(79,110,24,0.2)]" 
                    : "hover:bg-[var(--color-bg-elevated)]"
                )}
              >
                <div className="flex items-center gap-2">
                  <FileText className={cn("w-4 h-4", activeDocId === doc.id ? "text-[var(--color-accent-primary)]" : "text-[var(--color-text-muted)]")} />
                  <span className={cn("text-[var(--text-sm)] font-medium", activeDocId === doc.id ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]")}>
                    {doc.title}
                  </span>
                </div>
                <ContentTypeTag type={doc.type as any} className="scale-90 origin-left" />
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t-[1px] border-[var(--color-border)]">
          <Button variant="ghost" fullWidth size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add Source
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-bg-base)]/30">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b-[1px] border-[var(--color-border)] bg-[var(--color-bg-surface)]">
          <h2 className="text-[var(--text-md)] font-bold text-[var(--color-text-primary)]">
            Ask anything about your materials
          </h2>
          <p className="text-[var(--text-xs)] text-[var(--color-text-secondary)] mt-0.5">
            AI responses are strictly grounded in your {docs.length} uploaded sources
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          {chatHistory.map((msg, idx) => (
            <ChatMessage 
              key={idx} 
              role={msg.role as any} 
              content={msg.content} 
              timestamp={msg.timestamp}
              citations={msg.citations}
            />
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-[var(--color-bg-surface)] border-t-[1px] border-[var(--color-border)]">
          <div className="max-w-[800px] mx-auto relative">
            <textarea 
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask a question about your notes..."
              className="w-full bg-[var(--color-bg-elevated)] border-[1px] border-[var(--color-border)] rounded-[var(--radius-md)] pl-4 pr-12 py-3 text-[var(--text-base)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] resize-none"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="absolute right-3 bottom-2.5 p-1.5 bg-[var(--color-accent-primary)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-accent-primary-hover)] disabled:opacity-40 disabled:hover:bg-[var(--color-accent-primary)] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[var(--text-xs)] text-center text-[var(--color-text-muted)] mt-2">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};
