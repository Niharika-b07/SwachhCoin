import React from 'react';
import { Trophy, Medal, Award, Flame, Users, Sparkles, MapPin, ShieldCheck } from 'lucide-react';

const TOP_WARRIORS = [
  { rank: 1, name: 'Niharika Boredha', ward: 'Serilingampally Ward', coins: 485, cleanups: 19, badge: '🥇 Champion' },
  { rank: 2, name: 'Sai Kiran', ward: 'Khairatabad Ward', coins: 390, cleanups: 15, badge: '🥈 Elite' },
  { rank: 3, name: 'Ananya Rao', ward: 'Madhapur / Hitec', coins: 340, cleanups: 13, badge: '🥉 Star' },
  { rank: 4, name: 'Rahul Varma', ward: 'Gachibowli Ward', coins: 280, cleanups: 11, badge: 'Guardian' },
  { rank: 5, name: 'Pooja Reddy', ward: 'Kondapur Ward', coins: 225, cleanups: 9, badge: 'Guardian' },
];

const WARD_RANKS = [
  { name: 'Serilingampally', cleanups: 324, score: '98/100' },
  { name: 'Kukatpally', cleanups: 289, score: '94/100' },
  { name: 'Jubilee Hills / Banjara', cleanups: 254, score: '91/100' },
  { name: 'Secunderabad Cantt', cleanups: 210, score: '87/100' },
];

export default function Leaderboard() {
  return (
    <div className="space-y-5 pb-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <span>Hyderabad Clean Champions</span>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-mono">
            GHMC
          </span>
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          Top verified clean-up volunteers across GHMC Hyderabad wards.
        </p>
      </div>

      {/* Your Standing Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-900 text-white p-5 shadow-2xl border border-emerald-400/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center font-black text-xl border border-white/20 shadow-inner">
              #8
            </div>
            <div>
              <p className="text-[11px] text-emerald-200 uppercase tracking-widest font-bold">Your Standing</p>
              <h3 className="font-extrabold text-lg text-white">Eco Warrior • Level 2</h3>
              <p className="text-xs text-emerald-100/90 mt-0.5">150 SwachhCoins • 6 Verified Cleanups</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-black bg-amber-400 text-slate-950 px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-slate-950" /> Top 10%
            </span>
          </div>
        </div>
      </div>

      {/* Individual Rankings List */}
      <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/15 p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Individual Citizen Rankings
          </h3>
          <span className="text-[11px] text-emerald-400 font-mono">Live Audited</span>
        </div>

        <div className="space-y-2.5">
          {TOP_WARRIORS.map((warrior) => (
            <div
              key={warrior.rank}
              className={`rounded-2xl p-3.5 border transition-all flex items-center justify-between gap-3 ${
                warrior.rank === 1
                  ? 'bg-amber-500/15 border-amber-400/40 text-white'
                  : warrior.rank === 2
                  ? 'bg-white/10 border-white/20 text-white'
                  : warrior.rank === 3
                  ? 'bg-orange-500/10 border-orange-400/30 text-white'
                  : 'bg-white/5 border-white/10 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-sm ${
                    warrior.rank === 1
                      ? 'bg-amber-400 text-slate-950'
                      : warrior.rank === 2
                      ? 'bg-slate-200 text-slate-900'
                      : warrior.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {warrior.rank}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-white">{warrior.name}</h4>
                    <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-emerald-300 font-semibold border border-white/10">
                      {warrior.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {warrior.ward} • {warrior.cleanups} Cleanups
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-black text-emerald-400 block">{warrior.coins} SC</span>
                <span className="text-[10px] text-slate-400">Earned</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ward Cleanliness Index */}
      <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/15 p-5 shadow-2xl space-y-3">
        <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-3">
          <Award className="w-4 h-4 text-emerald-400" />
          GHMC Ward Cleanliness Index
        </h3>

        <div className="space-y-2">
          {WARD_RANKS.map((w, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs py-2 border-b border-white/5 last:border-0"
            >
              <span className="font-medium text-slate-200">
                {idx + 1}. {w.name}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">{w.cleanups} Cleanups</span>
                <span className="font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-lg">
                  {w.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
