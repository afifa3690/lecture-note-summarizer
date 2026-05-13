import React from 'react';
import { BookOpen, User, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'Dashboard', href: '/', active: true },
];

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 h-[60px] px-8 bg-[var(--color-bg-surface)]/85 backdrop-blur-[12px] border-b-[1px] border-[var(--color-border)] flex items-center justify-between">
      <div className="flex items-center gap-8 h-full">
        <div className="flex items-center gap-2 cursor-pointer">
          <BookOpen className="text-[var(--color-accent-primary)] w-6 h-6" />
          <span className="text-[var(--text-lg)] font-bold text-[var(--color-text-primary)] hidden sm:block">
            LectureSummarizer
          </span>
        </div>
        
        <div className="hidden md:flex items-center h-full space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "h-full flex items-center text-[var(--text-sm)] font-medium transition-colors border-b-2",
                link.active 
                  ? "text-[var(--color-text-primary)] border-[var(--color-accent-primary)]" 
                  : "text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)]"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-[var(--text-sm)] text-[var(--color-text-secondary)] hidden sm:block">
              {user.name || user.email}
            </span>
            <button 
              onClick={logout}
              title="Logout"
              className="w-8 h-8 rounded-full bg-[var(--color-bg-subtle)] flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
