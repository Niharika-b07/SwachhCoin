import React from 'react';
import { CheckCircle2, XCircle, Sparkles, MapPin, Trash2, Award } from 'lucide-react';

export default function VerificationCard({ result }) {
  if (!result) return null;

  const isVerified = Boolean(result.verified);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 ${
        isVerified
          ? 'bg-gradient-to-b from-emerald-50 via-white to-teal-50/60 border-emerald-300'
          : 'bg-gradient-to-b from-rose-50 via-white to-orange-50/50 border-rose-300'
      }`}
    >
      {/* Top Banner */}
      <div
        className={`p-5 flex items-center justify-between text-white ${
          isVerified
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
            : 'bg-gradient-to-r from-rose-600 to-red-600'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {isVerified ? (
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
          ) : (
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <XCircle className="w-6 h-6 text-white" />
            </div>
          )}
          <div>
            <h3 className="font-extrabold text-base tracking-tight">
              {isVerified ? '🎉 Cleanup Verified by Gemini AI!' : 'Verification Incomplete'}
            </h3>
            <p className="text-xs text-white/80">
              {isVerified
                ? 'AI verified the location and confirmed waste reduction.'
                : 'AI could not verify sufficient garbage cleanup.'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* If Verified: Reward Showcase with 3D Video Coin */}
        {isVerified && (
          <div className="flex items-center gap-4 bg-emerald-100/70 border border-emerald-300/80 p-3.5 rounded-2xl">
            {/* 3D Coin celebration video */}
            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md bg-emerald-900 shrink-0">
              <video
                src="/assets/swachhcoin-spin.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-110"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1 text-emerald-800 font-extrabold text-lg">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>+{result.coinsEarned || 25} SwachhCoins</span>
              </div>
              <p className="text-xs text-emerald-700 font-medium mt-0.5">
                Credited directly to your SwachhCoin wallet!
              </p>
            </div>
          </div>
        )}

        {/* Gemini AI Assessment Highlights */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3">
          <p className="text-xs uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            Gemini Multimodal Audit Report
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-500 block text-[11px]">Location Match</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {isVerified ? 'Same Physical Spot' : 'Mismatch or unclear'}
              </span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-500 block text-[11px]">Cleanup Reduction</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Trash2 className="w-3.5 h-3.5 text-emerald-600" />
                {result.cleanupPercentage !== undefined ? `${result.cleanupPercentage}% Cleaned` : 'Assessed'}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">AI Observation: </strong>
              {result.reason || "The submitted photos were evaluated for community cleanliness standards."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
