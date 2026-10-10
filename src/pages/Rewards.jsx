import React, { useState } from 'react';
import { Gift, CheckCircle2, Copy, Sparkles, Store, Zap, Receipt, Phone, Train, HeartPulse } from 'lucide-react';

const LOCAL_REWARD_ITEMS = [
  {
    id: 'sai-kirana-10',
    title: '₹10 Off at Sai Kirana Store & Local Shops',
    cost: 100,
    inr: '₹10',
    category: 'Local Kirana',
    icon: Store,
    badge: 'Local Shop',
    validity: 'Valid across Sai Kirana and registered corner stores in Hyderabad',
    code: 'KIRANA-SAI-10'
  },
  {
    id: 'tsspdcl-power-50',
    title: '₹50 TSSPDCL Electricity Bill Credit',
    cost: 500,
    inr: '₹50',
    category: 'Electricity Bill',
    icon: Zap,
    badge: 'Bill Payment',
    validity: 'Direct discount applied on your monthly Telangana power bill',
    code: 'TSSPDCL-POW-50'
  },
  {
    id: 'hmwssb-water-30',
    title: '₹30 HMWSSB Water Bill Payment',
    cost: 300,
    inr: '₹30',
    category: 'Water Board',
    icon: Receipt,
    badge: 'Bill Payment',
    validity: 'Hyderabad Metropolitan Water Supply & Sewerage Board credit',
    code: 'HMWSSB-WAT-30'
  },
  {
    id: 'mobile-recharge-20',
    title: '₹20 Mobile Recharge (Jio / Airtel / Vi)',
    cost: 200,
    inr: '₹20',
    category: 'Mobile Recharge',
    icon: Phone,
    badge: 'Telecom',
    validity: 'Instant prepaid talktime or data top-up voucher code',
    code: 'MOBILE-RECH-20'
  },
  {
    id: 'metro-token-15',
    title: '₹15 Hyderabad Metro Rail Token Ticket',
    cost: 150,
    inr: '₹15',
    category: 'Transit',
    icon: Train,
    badge: 'Metro',
    validity: 'Single ride ticket across Red, Blue & Green lines',
    code: 'METRO-HYD-15'
  },
  {
    id: 'medical-store-20',
    title: '₹20 Discount at Local Medical Store',
    cost: 200,
    inr: '₹20',
    category: 'Pharmacy',
    icon: HeartPulse,
    badge: 'Healthcare',
    validity: 'Applicable on general OTC medicines and healthcare essentials',
    code: 'MED-HEALTH-20'
  }
];

export default function Rewards() {
  const [balance, setBalance] = useState(150);
  const [claimedCodes, setClaimedCodes] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const handleRedeem = (item) => {
    if (balance < item.cost) {
      alert(`Insufficient SwachhCoins! You need ${item.cost} Coins (${item.inr}) to claim this reward.`);
      return;
    }

    if (claimedCodes[item.id]) {
      return;
    }

    setBalance((prev) => prev - item.cost);
    setClaimedCodes((prev) => ({ ...prev, [item.id]: item.code }));
  };

  const copyToClipboard = (id, code) => {
    navigator.clipboard?.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const inrBalance = (balance / 10).toFixed(2);

  return (
    <div className="space-y-5 pb-6">
      {/* Title */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Redemption Store</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-mono">
              Local & Utility
            </span>
          </h2>

          <div className="bg-amber-400/20 border border-amber-300/40 px-3 py-1 rounded-2xl backdrop-blur-md">
            <span className="text-xs font-black text-amber-300">
              🪙 10 Coins = ₹1 INR
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-300 mt-1">
          Redeem your cleanup coins for discounts at local kirana shops, electricity & water bills, and mobile recharges.
        </p>
      </div>

      {/* Balance Summary Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-950 text-white p-5 rounded-3xl shadow-2xl border border-emerald-400/30 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-emerald-200 uppercase tracking-widest font-bold">Your Available Balance</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black">{balance}</span>
            <span className="text-sm font-bold text-emerald-200">SwachhCoins</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-base font-black text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-lg border border-amber-300/30">
              ≈ ₹{inrBalance} INR
            </span>
            <span className="text-xs text-emerald-100 font-medium">Ready to Spend</span>
          </div>
        </div>

        {/* 3D Coin Badge */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-emerald-950 shadow-2xl shrink-0 border border-white/20">
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

      {/* Rewards Grid */}
      <div className="space-y-3.5">
        {LOCAL_REWARD_ITEMS.map((item) => {
          const Icon = item.icon;
          const isClaimed = Boolean(claimedCodes[item.id]);

          return (
            <div
              key={item.id}
              className={`rounded-3xl border p-5 shadow-xl transition-all ${
                isClaimed
                  ? 'bg-emerald-950/70 border-emerald-400/50 backdrop-blur-xl'
                  : 'bg-slate-900/80 border-white/15 backdrop-blur-2xl hover:border-white/25'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-full font-mono">
                        {item.category}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-white mt-1 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{item.validity}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-emerald-400 block">{item.cost} Coins</span>
                  <span className="text-xs font-bold text-amber-300">({item.inr})</span>
                </div>
              </div>

              {/* Action Button / Claimed Code */}
              <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between">
                {!isClaimed ? (
                  <>
                    <span className="text-xs text-slate-400">
                      {balance >= item.cost ? 'Eligible for instant claim' : `Requires ${item.cost - balance} more coins`}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRedeem(item)}
                      disabled={balance < item.cost}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg transition-all active:scale-95"
                    >
                      Redeem Voucher ({item.inr})
                    </button>
                  </>
                ) : (
                  <div className="w-full flex items-center justify-between bg-emerald-500/20 border border-emerald-400/40 p-3 rounded-2xl">
                    <div className="flex items-center gap-2 text-xs text-emerald-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Redemption Code: <strong className="font-mono text-white text-sm ml-1">{claimedCodes[item.id]}</strong></span>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.id, claimedCodes[item.id])}
                      className="text-xs font-bold bg-white text-slate-950 px-3 py-1.5 rounded-lg hover:bg-slate-100 flex items-center gap-1 shadow-md transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedId === item.id ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
