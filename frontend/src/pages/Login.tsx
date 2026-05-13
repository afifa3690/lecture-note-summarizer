import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../utils/api';
import { Button } from '../components/ui/Button';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await loginUser({ email, password });
      login(res.token, res.user);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[var(--color-bg-surface)] p-8 rounded-[var(--radius-xl)] shadow-lg border border-[var(--color-border)]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent-glow)] text-[var(--color-accent-primary)] mb-4">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)]">Welcome Back</h1>
          <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-2">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-[var(--radius-md)] mb-6 text-[var(--text-sm)] border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[var(--text-sm)] font-medium text-[var(--color-text-secondary)] mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[var(--color-text-muted)]" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-md)] pl-10 pr-4 py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[var(--text-sm)] font-medium text-[var(--color-text-secondary)]">Password</label>
              <a href="#" className="text-[var(--text-xs)] text-[var(--color-accent-primary)] hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[var(--color-text-muted)]" />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-md)] pl-10 pr-10 py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input id="remember-me" type="checkbox" className="h-4 w-4 text-[var(--color-accent-primary)] focus:ring-[var(--color-accent-primary)] border-[var(--color-border)] rounded" />
            <label htmlFor="remember-me" className="ml-2 block text-[var(--text-sm)] text-[var(--color-text-secondary)]">
              Remember me
            </label>
          </div>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-full justify-center py-2.5" 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </form>

        <div className="mt-8 text-center text-[var(--text-sm)] text-[var(--color-text-secondary)]">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[var(--color-accent-primary)] hover:underline transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
