import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, UserPlus, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../utils/api';
import { Button } from '../components/ui/Button';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    setIsLoading(true);

    try {
      const res = await registerUser({ name, email, password });
      login(res.token, res.user);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[var(--color-bg-surface)] p-8 rounded-[var(--radius-xl)] shadow-lg border border-[var(--color-border)]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent-glow)] text-[var(--color-accent-primary)] mb-4">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text-primary)]">Create an Account</h1>
          <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)] mt-2">Join us to start summarizing your lectures</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-[var(--radius-md)] mb-6 text-[var(--text-sm)] border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[var(--text-sm)] font-medium text-[var(--color-text-secondary)] mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[var(--color-text-muted)]" />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-md)] pl-10 pr-4 py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                placeholder="Jane Doe"
                required
              />
            </div>
          </div>

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
            <label className="block text-[var(--text-sm)] font-medium text-[var(--color-text-secondary)] mb-1">Password</label>
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
                minLength={6}
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

          <div>
            <label className="block text-[var(--text-sm)] font-medium text-[var(--color-text-secondary)] mb-1">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[var(--color-text-muted)]" />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-md)] pl-10 pr-4 py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <Button 
              variant="primary" 
              type="submit" 
              className="w-full justify-center py-2.5" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-[var(--text-sm)] text-[var(--color-text-secondary)]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[var(--color-accent-primary)] hover:underline transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
