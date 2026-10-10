import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  Key,
  Sparkles,
  ArrowRight,
  UserCheck,
  ShieldAlert,
  Loader2
} from 'lucide-react';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { loginWithGoogle, loginWithEmail, registerWithEmail, loginDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleGoogleLogin = async () => {
    setError('');
    setSubmitting(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Google sign-in encountered an issue.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      if (isSignUp) {
        await registerWithEmail(email, password, displayName);
      } else {
        await loginWithEmail(email, password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemo = (role) => {
    loginDemo('Niharika Boredha', role);
    navigate(from, { replace: true });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        boxSizing: 'border-box'
      }}
      className="relative z-10"
    >
      {/* Central Glassmorphic Security Portal Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          boxSizing: 'border-box'
        }}
        className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 text-white relative overflow-hidden"
      >
        {/* Glow ambient effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Security Wall Badge */}
        <div className="flex items-center justify-between text-xs mb-6 border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>GHMC SECURE GATEWAY</span>
          </div>
          <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Lock className="w-2.5 h-2.5 shrink-0" /> 256-Bit SSL
          </span>
        </div>

        {/* Brand Header with 3D Coin Badge */}
        <div className="text-center mb-6">
          <div
            style={{ width: '80px', height: '80px' }}
            className="mx-auto rounded-2xl overflow-hidden shadow-2xl bg-emerald-950 border-2 border-emerald-400/50 mb-3 relative"
          >
            <video
              src="/assets/swachhcoin-spin.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="scale-110"
            />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            Swachh<span className="text-emerald-400">Coin</span> Portal
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Hyderabad's AI-Powered Clean-To-Earn Civic Network
          </p>
        </div>

        {/* Error message if any */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Google One-Click Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submitting}
          style={{ width: '100%' }}
          className="bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.99] disabled:opacity-50"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            style={{ width: '18px', height: '18px', flexShrink: 0 }}
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative my-4 flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-slate-900 px-3 text-[10px] text-slate-400 uppercase tracking-widest font-semibold absolute">
            or email credentials
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Niharika Boredha"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="citizen@hyderabad.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', boxSizing: 'border-box' }}
                className="bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', boxSizing: 'border-box' }}
                className="bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{ width: '100%' }}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs py-3 rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all mt-4 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? 'Create Citizen Account' : 'Authenticate & Enter'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <div className="text-center mt-3">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-emerald-300 hover:underline font-medium"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'New citizen volunteer? Register here'}
          </button>
        </div>

        {/* Quick Demo Access Button (No login hassle) */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest text-center font-bold mb-2">
            ⚡ Quick Citizen Verification (1-Click)
          </p>
          <button
            type="button"
            onClick={() => handleQuickDemo('Chief Citizen Auditor')}
            style={{ width: '100%' }}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <UserCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>Enter as Verified Citizen (Niharika B.)</span>
          </button>
        </div>

        {/* Security footnote */}
        <div className="mt-4 text-center text-[10px] text-slate-400 flex items-center justify-center gap-2">
          <span>Protected by Gemini AI Vision Firewall</span>
          <span>•</span>
          <span>GHMC Verified</span>
        </div>
      </div>
    </div>
  );
}
