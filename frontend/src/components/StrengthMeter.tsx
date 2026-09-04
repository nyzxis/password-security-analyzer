import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Zap, CheckCircle2, XCircle } from 'lucide-react';
import { AnalysisResult } from '../lib/clientAnalyzer';

interface StrengthMeterProps {
  analysis: AnalysisResult;
  theme?: 'cyber' | 'minimalist';
}

export default function StrengthMeter({ analysis, theme = 'cyber' }: StrengthMeterProps) {
  const isMinimal = theme === 'minimalist';
  const { score, verdict, entropy_bits, charset_size, has_lower, has_upper, has_digits, has_symbols } = analysis;

  // Visual color maps based on score
  const scoreConfig = [
    {
      label: 'VERY WEAK',
      color: 'bg-rose-500',
      text: isMinimal ? 'text-[#9F2F2D]' : 'text-rose-400',
      badge: isMinimal ? 'bg-[#FDEBEC] text-[#9F2F2D] border-[#F8D7DA]' : 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      icon: ShieldAlert,
    },
    {
      label: 'WEAK',
      color: 'bg-orange-500',
      text: isMinimal ? 'text-[#C05621]' : 'text-orange-400',
      badge: isMinimal ? 'bg-[#FEEBC8] text-[#C05621] border-[#FBD38D]' : 'bg-orange-500/15 text-orange-300 border-orange-500/30',
      icon: AlertTriangle,
    },
    {
      label: 'MODERATE',
      color: 'bg-amber-500',
      text: isMinimal ? 'text-[#956400]' : 'text-amber-400',
      badge: isMinimal ? 'bg-[#FBF3DB] text-[#956400] border-[#F5E79E]' : 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      icon: AlertTriangle,
    },
    {
      label: 'STRONG',
      color: 'bg-cyan-500',
      text: isMinimal ? 'text-[#1F6C9F]' : 'text-cyan-400',
      badge: isMinimal ? 'bg-[#E1F3FE] text-[#1F6C9F] border-[#BEE3F8]' : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      icon: ShieldCheck,
    },
    {
      label: 'TITANIUM',
      color: 'bg-emerald-500',
      text: isMinimal ? 'text-[#346538]' : 'text-emerald-400',
      badge: isMinimal ? 'bg-[#EDF3EC] text-[#346538] border-[#D4EDDA]' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      icon: Zap,
    },
  ];

  const current = scoreConfig[score] || scoreConfig[0];
  const IconComponent = current.icon;

  return (
    <div
      className={`rounded-2xl transition-all duration-300 p-6 ${
        isMinimal
          ? 'bg-white border border-[#EAEAEA] shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
          : 'bg-[#0a0d16]/90 border border-white/10 backdrop-blur-xl'
      }`}
    >
      {/* Top row: Verdict & Entropy Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${current.badge}`}
          >
            <IconComponent className="w-3.5 h-3.5" />
            {verdict.toUpperCase()}
          </span>

          <span
            className={`text-xs font-mono ${
              isMinimal ? 'text-[#787774]' : 'text-white/40'
            }`}
          >
            Level {score}/4 Security Rating
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 ${
              isMinimal
                ? 'bg-[#F7F6F3] text-[#111111] border border-[#EAEAEA]'
                : 'bg-white/5 border border-white/10 text-white'
            }`}
          >
            <span className={current.text}>{entropy_bits} bits</span>
            <span className="text-[11px] font-normal opacity-60">entropy</span>
          </div>

          <div
            className={`px-2.5 py-1 rounded-xl text-[11px] font-mono ${
              isMinimal
                ? 'bg-[#F7F6F3] text-[#787774] border border-[#EAEAEA]'
                : 'bg-white/5 border border-white/10 text-white/50'
            }`}
          >
            Pool: {charset_size}
          </div>
        </div>
      </div>

      {/* Segmented Strength Bar */}
      <div className="grid grid-cols-5 gap-2 mb-5">
        {[0, 1, 2, 3, 4].map((seg) => {
          const filled = seg <= score && analysis.password_length > 0;
          return (
            <div
              key={seg}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                filled
                  ? current.color
                  : isMinimal
                  ? 'bg-[#EAEAEA]'
                  : 'bg-white/10'
              } ${filled && !isMinimal ? 'shadow-[0_0_10px_currentColor]' : ''}`}
            />
          );
        })}
      </div>

      {/* Character Pool Checklist */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-dashed border-white/10">
        {[
          { label: 'Lowercase (a-z)', active: has_lower },
          { label: 'Uppercase (A-Z)', active: has_upper },
          { label: 'Numbers (0-9)', active: has_digits },
          { label: 'Symbols (!@#)', active: has_symbols },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-colors ${
              item.active
                ? isMinimal
                  ? 'bg-[#EDF3EC] text-[#346538] border border-[#D4EDDA]'
                  : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                : isMinimal
                ? 'bg-[#F7F6F3] text-[#787774] border border-[#EAEAEA]'
                : 'bg-white/[0.02] text-white/30 border border-white/5'
            }`}
          >
            {item.active ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-3.5 h-3.5 opacity-40 shrink-0" />
            )}
            <span className="truncate">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
