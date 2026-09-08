import { useState } from 'react';
import { Dumbbell, Mail, Lock, User, Eye, EyeOff, ArrowLeft, Chrome, Smartphone } from 'lucide-react';
import type { Page } from '@/types';

interface AuthPageProps {
  onNavigate: (page: Page) => void;
}

type AuthMode = 'login' | 'signup';

export default function AuthPage({ onNavigate }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && !email.match(/^\+?[\d\s-]{10,}$/)) {
      newErrors.email = 'Please enter a valid email or phone';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (mode === 'signup' && name.trim().length < 2) {
      newErrors.name = 'Please enter your name';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate('select');
    }, 1200);
  };

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-light shadow-3d-sm">
            <Dumbbell className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-ink">Fit Path</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-5 py-6 perspective-2000">
        <div className="w-full max-w-md card-3d rounded-3xl border border-canvas-border bg-white p-8 shadow-3d-lg" style={{ transform: 'rotateX(1deg)' }}>
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-light shadow-3d float-anim">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold text-ink">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-1.5 text-center text-sm text-ink-muted">
            {mode === 'login'
              ? 'Log in to find gyms near you and on your route.'
              : 'Join Fit Path and start discovering gyms on your commute.'}
          </p>

          <div className="mt-6 flex rounded-xl bg-canvas-elevated p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                mode === 'login' ? 'bg-gradient-to-br from-accent to-accent-hover text-white shadow-3d-sm' : 'text-ink-muted hover:text-ink'
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                mode === 'signup' ? 'bg-gradient-to-br from-accent to-accent-hover text-white shadow-3d-sm' : 'text-ink-muted hover:text-ink'
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-accent/50" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={`w-full rounded-xl bg-canvas-elevated border py-3 pl-10 pr-4 text-sm text-ink placeholder-ink-light outline-none transition-colors ${
                      errors.name ? 'border-error' : 'border-canvas-border focus:border-accent'
                    }`}
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Email or phone</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-accent/50" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl bg-canvas-elevated border py-3 pl-10 pr-4 text-sm text-ink placeholder-ink-light outline-none transition-colors ${
                    errors.email ? 'border-error' : 'border-canvas-border focus:border-accent'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-accent/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full rounded-xl bg-canvas-elevated border py-3 pl-10 pr-10 text-sm text-ink placeholder-ink-light outline-none transition-colors ${
                    errors.password ? 'border-error' : 'border-canvas-border focus:border-accent'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-accent/50 hover:text-accent"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-error">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-br from-accent to-accent-hover py-3.5 text-sm font-bold text-white shadow-3d transition-all hover:shadow-3d-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                </span>
              ) : mode === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-canvas-border" />
            <span className="text-xs text-ink-light">or</span>
            <div className="h-px flex-1 bg-canvas-border" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-canvas-border bg-white py-3 text-sm font-semibold text-ink-soft shadow-3d-sm transition-all hover:shadow-3d hover:-translate-y-0.5"
            >
              <Chrome className="h-4 w-4 text-accent" />
              Continue with Google
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-canvas-border bg-white py-3 text-sm font-semibold text-ink-soft shadow-3d-sm transition-all hover:shadow-3d hover:-translate-y-0.5"
            >
              <Smartphone className="h-4 w-4 text-accent" />
              Send OTP
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-ink-light">
            By continuing, you agree to our{' '}
            <a href="#" className="text-accent font-medium hover:text-accent-hover">Terms</a> and{' '}
            <a href="#" className="text-accent font-medium hover:text-accent-hover">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
