import React from 'react';
import { cn } from '../../utils/cn';
import { FileText, Layers, MessageCircle, Presentation } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const items: SidebarItem[] = [
  { icon: <FileText className="w-4 h-4" />, label: 'All Documents', href: '/' },
  { icon: <Layers className="w-4 h-4" />, label: 'Flashcards', href: '/flashcards' },
  { icon: <MessageCircle className="w-4 h-4" />, label: 'Q&A Chat', href: '/qa' },
  { icon: <Presentation className="w-4 h-4" />, label: 'Slide Generator', href: '/slides' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-[260px] h-[calc(100vh-60px)] sticky top-[60px] bg-[var(--color-bg-surface)] border-r-[1px] border-[var(--color-border)] p-6">
      <div className="mb-4">
        <h4 className="text-[var(--text-xs)] font-bold uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-3">
          Library
        </h4>
        <nav className="flex flex-col gap-1">
          {items.map((item, idx) => {
            const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={idx}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-[var(--text-sm)] transition-colors w-full text-left",
                  isActive 
                    ? "bg-[var(--color-accent-glow)] text-[var(--color-accent-primary)] font-semibold" 
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 mb-4">
        <h4 className="text-[var(--text-xs)] font-bold uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-3">
          Tags
        </h4>
        <div className="flex flex-wrap gap-2">
          {['Biology', 'Computer Science', 'History'].map(tag => (
            <span key={tag} className="text-[var(--text-xs)] px-2 py-1 bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] rounded-[var(--radius-sm)] cursor-pointer hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-subtle)]/50 border-[1px] border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[var(--text-xs)] font-semibold text-[var(--color-text-primary)]">Pro Plan</span>
          <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">75% used</span>
        </div>
        <div className="w-full h-1.5 bg-[var(--color-bg-base)] rounded-full overflow-hidden">
          <div className="h-full bg-[var(--color-accent-secondary)] w-[75%] rounded-full"></div>
        </div>
      </div>
    </aside>
  );
};
