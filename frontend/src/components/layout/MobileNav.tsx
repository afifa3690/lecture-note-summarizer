import React from 'react';
import { cn } from '../../utils/cn';
import { FileText, Layers, MessageCircle, Presentation } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: <FileText className="w-5 h-5" />, label: 'Docs', href: '/' },
  { icon: <Layers className="w-5 h-5" />, label: 'Cards', href: '/flashcards' },
  { icon: <MessageCircle className="w-5 h-5" />, label: 'Q&A', href: '/qa' },
  { icon: <Presentation className="w-5 h-5" />, label: 'Slides', href: '/slides' },
];

export const MobileNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[var(--color-bg-surface)] border-t-[1px] border-[var(--color-border)] px-4 flex items-center justify-around z-50">
      {navItems.map((item, idx) => {
        const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
        return (
          <Link
            key={idx}
            to={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive 
                ? "text-[var(--color-accent-primary)]" 
                : "text-[var(--color-text-secondary)]"
            )}
          >
            {item.icon}
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
