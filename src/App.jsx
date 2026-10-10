import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import BackgroundVideo from './components/BackgroundVideo';

// Pages
import Home from './pages/Home';
import SubmitCleanup from './pages/SubmitCleanup';
import MapExplore from './pages/MapExplore';
import Rewards from './pages/Rewards';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';

// Icons
import {
  Camera,
  MapPin,
  Wallet,
  Gift,
  Trophy,
  Sparkles,
  LogOut,
  ShieldCheck,
  User
} from 'lucide-react';

function TopNavbar() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  // Do not render top navigation on login page
  if (path === '/login') return null;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 shadow-xl">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Brand Logo & Tag */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-emerald-950 shadow-md flex items-center justify-center border border-emerald-400/50 group-hover:scale-105 transition-transform shrink-0">
            <video
              src="/assets/swachhcoin-spin.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-125"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-black tracking-tight text-white leading-none">
                Swachh<span className="text-emerald-400">Coin</span>
              </h1>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.2 rounded font-mono">
                HYD
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-400 tracking-wide mt-0.5">
              Civic AI Clean-to-Earn
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              path === '/' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Wallet
          </Link>
          <Link
            to="/map"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              path === '/map' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Hotspots Map
          </Link>
          <Link
            to="/submit"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              path === '/submit'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                : 'text-emerald-400 hover:bg-emerald-500/10'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Clean & Earn</span>
          </Link>
          <Link
            to="/rewards"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              path === '/rewards' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Rewards Store
          </Link>
          <Link
            to="/leaderboard"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              path === '/leaderboard' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Leaderboard
          </Link>
        </nav>

        {/* User Profile & Security Badge */}
        {currentUser ? (
          <div className="flex items-center gap-3">
            <Link
              to="/rewards"
              className="hidden sm:flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-black text-emerald-300 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>{currentUser.swachhCoins || 150} SC</span>
            </Link>

            <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-2.5 py-1.5 rounded-2xl backdrop-blur-md">
              <img
                src={currentUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={currentUser.displayName}
                className="w-6 h-6 rounded-full object-cover border border-emerald-400/50"
              />
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold text-white truncate max-w-[100px] leading-tight">
                  {currentUser.displayName}
                </p>
                <p className="text-[9px] text-emerald-400 font-mono leading-none">
                  {currentUser.role || 'Citizen'}
                </p>
              </div>

              <button
                type="button"
                onClick={logout}
                title="Sign Out"
                className="text-slate-400 hover:text-rose-400 transition-colors p-1 rounded-lg hover:bg-white/10 ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-1.5 px-3.5 rounded-xl shadow-md transition-all"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

function MobileBottomNav() {
  const location = useLocation();
  const path = location.pathname;

  // Do not show on login page
  if (path === '/login') return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-2xl border-t border-white/15 z-50 shadow-2xl">
      <div className="max-w-md mx-auto flex justify-around items-center py-2 px-2">
        <Link
          to="/"
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            path === '/' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Wallet</span>
        </Link>

        <Link
          to="/map"
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            path === '/map' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Map</span>
        </Link>

        {/* Center Floating Clean & Earn Button */}
        <Link to="/submit" className="flex flex-col items-center -mt-6 group focus:outline-none">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-2xl border-4 border-slate-900 group-hover:scale-105 active:scale-95 transition-all">
            <Camera className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-black text-emerald-400 mt-1 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
            Clean & Earn
          </span>
        </Link>

        <Link
          to="/rewards"
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            path === '/rewards' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Rewards</span>
        </Link>

        <Link
          to="/leaderboard"
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            path === '/leaderboard' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Ranks</span>
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen w-full relative flex flex-col selection:bg-emerald-400 selection:text-slate-950">
          {/* Fullscreen Video Background */}
          <BackgroundVideo />

          {/* Top Navbar */}
          <TopNavbar />

          {/* Main App Container */}
          <main className="flex-1 w-full flex flex-col items-center justify-center">
            <Routes>
              {/* Public Login Wall */}
              <Route path="/login" element={<Login />} />

              {/* Protected Security Walls */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 pb-28 md:pb-12">
                      <Home />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/submit"
                element={
                  <ProtectedRoute>
                    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 pb-28 md:pb-12">
                      <SubmitCleanup />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 pb-28 md:pb-12">
                      <MapExplore />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rewards"
                element={
                  <ProtectedRoute>
                    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 pb-28 md:pb-12">
                      <Rewards />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 pb-28 md:pb-12">
                      <Leaderboard />
                    </div>
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Mobile Navigation */}
          <MobileBottomNav />
        </div>
      </Router>
    </AuthProvider>
  );
}