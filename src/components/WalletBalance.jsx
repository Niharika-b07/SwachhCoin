import React from 'react';
import { Coins, Flame, ArrowUpRight, ShieldCheck, Sparkles, Store, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WalletBalance({ balance = 150 }) {
  const inrValue = (balance / 10).toFixed(2);

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-950 text-white p-5 sm:p-6 border border-emerald-400/40">
      {/* Subtle ambient lighting */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top bar with rank and exchange rate notice */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Green Citizen • Lv. 2</span>
          </div>

          <div className="flex items-center gap-1 bg-amber-400/25 border border-amber-300/40 px-2.5 py-1 rounded-full text-amber-200 font-bold text-[11px]">
            <span>10 Coins = ₹1 INR</span>
          </div>
        </div>

        {/* Center content: Coin Balance, Rupee Value & 3D Video Token */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-200 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Total Balance
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black tracking-tight drop-shadow-sm">
                {balance}
              </span>
              <span className="text-sm font-bold text-emerald-200">SwachhCoins</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-base font-black text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-lg border border-amber-300/30">
                ≈ ₹{inrValue} INR
              </span>
              <span className="text-xs text-emerald-100 font-medium">
                in Cash Value
              </span>
            </div>
            <p className="text-[11px] text-slate-200 mt-1.5">
              Redeem at local kirana stores, electricity & water bills
            </p>
          </div>

          {/* 3D Spinning SwachhCoin Video Token */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/30 bg-emerald-950/40 shrink-0">
            <video
              src="/assets/swachhcoin-spin.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl pointer-events-none" />
          </div>
        </div>

        {/* Quick action shortcuts */}
        <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-white/15">
          <Link
            to="/submit"
            className="flex items-center justify-center gap-1.5 bg-white text-emerald-900 hover:bg-emerald-50 py-2.5 px-3 rounded-xl font-black text-xs shadow-md transition-all active:scale-[0.98]"
          >
            <span>+ Clean & Earn Coins</span>
          </Link>

          <Link
            to="/rewards"
            className="flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 text-white py-2.5 px-3 rounded-xl font-bold text-xs border border-white/20 transition-all active:scale-[0.98]"
          >
            <span>Pay Bills / Redeem</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
