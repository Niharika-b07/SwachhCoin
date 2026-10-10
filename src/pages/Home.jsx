import React, { useState } from 'react';
import WalletBalance from '../components/WalletBalance';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  TrendingUp,
  Store,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Camera,
  Receipt,
  Zap,
  Phone
} from 'lucide-react';

const REAL_CLEANUPS = [
  {
    id: 1,
    user: 'Niharika Boredha',
    area: 'Prakash Nagar Park - Park Entrance, Hyderabad',
    time: '10 Jun 2024 • Verified',
    coins: 75,
    inr: '7.50',
    reduction: '98%',
    gps: '17.3850° N, 78.4867° E',
    beforeImg: '/assets/proofs/prakash-nagar-before.jpg',
    afterImg: '/assets/proofs/prakash-nagar-after.jpg',
    description: 'Cleaned massive plastic bottle pile and litter across Prakash Nagar Park entrance gate.'
  },
  {
    id: 2,
    user: 'Citizen Volunteer Team',
    area: 'Sai Kirana Store Corner, Hyderabad',
    time: '12 Oct 2024 • Verified',
    coins: 50,
    inr: '5.00',
    reduction: '94%',
    gps: '17.4239° N, 78.4738° E',
    beforeImg: '/assets/proofs/sai-kirana-before.jpg',
    afterImg: '/assets/proofs/sai-kirana-after.jpg',
    description: 'Swept corner heap of discarded plastic bottles and snack wrappers outside Sai Kirana Store.'
  }
];

const LOCAL_REDEMPTIONS = [
  { name: 'Sai Kirana & Local Stores', discount: '₹10 Off Groceries', category: 'Local Kirana', coins: 100, inr: '₹10', icon: Store },
  { name: 'Electricity Bill (TSSPDCL)', discount: '₹50 Bill Credit', category: 'Utility Bill', coins: 500, inr: '₹50', icon: Zap },
  { name: 'Water Board (HMWSSB)', discount: '₹30 Bill Payment', category: 'Utility Bill', coins: 300, inr: '₹30', icon: Receipt },
  { name: 'Mobile Recharge (Jio/Airtel)', discount: '₹20 Talktime / Data', category: 'Telecom', coins: 200, inr: '₹20', icon: Phone },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState({});

  const toggleImage = (id, state) => {
    setActiveTab((prev) => ({ ...prev, [id]: state }));
  };

  return (
    <div className="space-y-6 pb-6">
      {/* 3D Animated Coin Wallet Card */}
      <WalletBalance balance={150} />

      {/* Conversion Rate Callout Banner */}
      <div className="bg-amber-400/15 border border-amber-300/40 rounded-2xl p-3.5 backdrop-blur-md flex items-center justify-between text-white">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🪙</span>
          <div>
            <p className="text-xs font-black text-amber-300">Official Conversion Rate</p>
            <p className="text-[11px] text-slate-200">10 SwachhCoins = ₹1 Rupee (Redeemable in local shops & bill payments)</p>
          </div>
        </div>
        <Link to="/rewards" className="text-xs font-bold bg-amber-400 text-slate-950 px-3 py-1 rounded-xl shadow shrink-0">
          Redeem →
        </Link>
      </div>

      {/* Community Impact Metrics */}
      <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-5 border border-white/15 shadow-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs uppercase tracking-widest font-black text-slate-300 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Hyderabad Impact Today
          </h3>
          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 rounded-full">
            ● Live GHMC Feed
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-2xl font-black text-white">42</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Spots Cleaned</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-400/30">
            <p className="text-2xl font-black text-emerald-400">1,280 kg</p>
            <p className="text-[11px] text-emerald-300 font-medium mt-0.5">Plastic Diverted</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/30">
            <p className="text-2xl font-black text-amber-400">1,050</p>
            <p className="text-[11px] text-amber-300 font-medium mt-0.5">Coins (₹105.00)</p>
          </div>
        </div>
      </div>

      {/* Primary Action Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-950 text-white shadow-2xl border border-emerald-400/40">
        <div className="relative z-10 max-w-[70%]">
          <span className="bg-emerald-400/25 border border-emerald-300/40 text-emerald-200 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            AI Automated Audit
          </span>
          <h3 className="font-black text-lg mt-2 tracking-tight">Spot Trash in Hyderabad?</h3>
          <p className="text-xs text-emerald-100/90 mt-1.5 leading-relaxed">
            Upload Before & After photos with GPS. Gemini AI verifies your cleanup and instantly rewards you with SwachhCoins!
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 bg-white text-emerald-900 hover:bg-emerald-50 px-4 py-2 rounded-xl text-xs font-black mt-4 transition-all shadow-lg active:scale-95"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Upload Cleanup Proof</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Ambient 3D coin video */}
        <div className="absolute -right-4 -bottom-4 w-36 h-36 opacity-85 pointer-events-none rounded-full overflow-hidden shadow-2xl">
          <video
            src="/assets/swachhcoin-spin.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110"
          />
        </div>
      </div>

      {/* Local Shops & Bill Payments Redemption */}
      <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-5 border border-white/15 shadow-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-400" />
              Redeem at Local Shops & Bill Payments
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">10 Coins = ₹1 INR spend value</p>
          </div>
          <Link to="/rewards" className="text-xs font-bold text-emerald-400 hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {LOCAL_REDEMPTIONS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 hover:bg-white/10 rounded-2xl p-3.5 border border-white/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs truncate max-w-[110px]">{p.name}</span>
                    <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-emerald-400 font-black text-sm mt-1.5">{p.discount}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{p.coins} Coins ({p.inr})</span>
                  <Link to="/rewards" className="text-emerald-400 font-bold hover:underline">
                    Redeem
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Cleanups Feed with User's Real Verified Examples */}
      <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-5 border border-white/15 shadow-2xl text-white space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Community Proofs
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">GPS Tagged • Multi-modal AI Audited</p>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">10 Coins = ₹1</span>
        </div>

        <div className="space-y-4">
          {REAL_CLEANUPS.map((item) => {
            const isShowingAfter = activeTab[item.id] !== 'before'; // default to after
            return (
              <div
                key={item.id}
                className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-lg transition-all"
              >
                {/* Header */}
                <div className="p-3.5 flex items-center justify-between bg-white/5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                      {item.user.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-white">{item.user}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {item.area}
                      </p>
                      <p className="text-[10px] font-mono text-emerald-400 mt-0.5">
                        {item.gps}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/40 inline-block">
                      +{item.coins} Coins
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold block mt-0.5">
                      ₹{item.inr} INR
                    </span>
                  </div>
                </div>

                {/* Photo with toggle */}
                <div className="relative h-56 bg-slate-950">
                  <img
                    src={isShowingAfter ? item.afterImg : item.beforeImg}
                    alt={item.area}
                    className="w-full h-full object-cover transition-all duration-300"
                  />

                  {/* Toggle Pill */}
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md p-1 rounded-xl flex gap-1 border border-white/20">
                    <button
                      type="button"
                      onClick={() => toggleImage(item.id, 'before')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        !isShowingAfter
                          ? 'bg-rose-500 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Before Clean
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleImage(item.id, 'after')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        isShowingAfter
                          ? 'bg-emerald-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      After Clean
                    </button>
                  </div>

                  {/* Reduction badge */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-400/30 flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5 text-emerald-400" />
                    {item.reduction} Waste Cleared
                  </div>
                </div>

                {/* Description & time */}
                <div className="p-3.5 text-xs text-slate-300 flex items-center justify-between">
                  <p className="truncate max-w-[280px]">{item.description}</p>
                  <span className="text-[11px] text-slate-500 shrink-0 ml-2">{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}