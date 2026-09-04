import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Zap, CheckCircle2, XCircle, Activity, Gauge } from 'lucide-react';
import { AnalysisResult } from '../lib/clientAnalyzer';

interface StrengthMeterProps {
  analysis: AnalysisResult;
  theme?: 'cyber' | 'minimalist';
}

export default function StrengthMeter({ analysis, theme = 'cyber' }: StrengthMeterProps) {
  const isMinimal = theme === 'minimalist';
  const { score, verdict, entropy_bits, charset_size, has_lower, has_upper, has_digits, has_symbols, password_length } = analysis;

  // Visual color maps based on score - calibrated for dark & warm paper
  const scoreConfig = [
    {
      label: 'VERY WEAK',
      color: isMinimal ? 'bg-[#A32938]' : 'bg-rose-500',
      stroke: isMinimal ? '#A32938' : '#F43F5E',
      glow: 'rgba(244, 63, 94, 0.4)',
      text: isMinimal ? 'text-[#822B29]' : 'text-rose-400',
      badge: isMinimal ? 'bg-[#F2DFDE] text-[#862927] border-[#E5C7C5]' : 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      icon: ShieldAlert,
    },
    {
      label: 'WEAK',
      color: isMinimal ? 'bg-[#B8591B]' : 'bg-orange-500',
      stroke: isMinimal ? '#B8591B' : '#F97316',
      glow: 'rgba(249, 115, 22, 0.4)',
      text: isMinimal ? 'text-[#8A4A18]' : 'text-orange-400',
      badge: isMinimal ? 'bg-[#F4E4D3] text-[#8A4A18] border-[#E8D0BA]' : 'bg-orange-500/15 text-orange-300 border-orange-500/30',
      icon: AlertTriangle,
    },
    {
      label: 'MODERATE',
      color: isMinimal ? 'bg-[#A36500]' : 'bg-amber-500',
      stroke: isMinimal ? '#A36500' : '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
      text: isMinimal ? 'text-[#7A5310]' : 'text-amber-400',
      badge: isMinimal ? 'bg-[#EFE8D6] text-[#78540B] border-[#DFD4BA]' : 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      icon: AlertTriangle,
    },
    {
      label: 'STRONG',
      color: isMinimal ? 'bg-[#1C567A]' : 'bg-cyan-500',
      stroke: isMinimal ? '#1C567A' : '#06B6D4',
      glow: 'rgba(6, 182, 212, 0.4)',
      text: isMinimal ? 'text-[#1E4D6E]' : 'text-cyan-400',
      badge: isMinimal ? 'bg-[#DFE7EE] text-[#1E4D6E] border-[#C5D5E2]' : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      icon: ShieldCheck,
    },
    {
      label: 'TITANIUM',
      color: isMinimal ? 'bg-[#236437]' : 'bg-emerald-500',
      stroke: isMinimal ? '#236437' : '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
      text: isMinimal ? 'text-[#2A522E]' : 'text-emerald-400',
      badge: isMinimal ? 'bg-[#DEE7DC] text-[#2A522E] border-[#C7D7C4]' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      icon: Zap,
    },
  ];

  const current = scoreConfig[score] || scoreConfig[0];
  const IconComponent = current.icon;

  // Arc Gauge Math (240 degree sweep)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * (240 / 360);
  const entropyRatio = Math.min(Math.max(entropy_bits / 100, 0), 1);
  const strokeOffset = arcLength * (1 - (password_length > 0 ? entropyRatio : 0));

  return (
    <div
      className={`rounded-2xl transition-colors duration-150 p-6 ${
        isMinimal ? 'minimalist-card' : 'glass-panel'
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 mb-5">
        <div
          className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
            isMinimal ? 'text-[#767066]' : 'text-emerald-400'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>SHANNON ENTROPY &amp; COMPLEXITY TELEMETRY</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-mono px-2.5 py-0.5 rounded-lg border ${
              isMinimal ? 'bg-[#EAE5DB] text-[#767066] border-[#D8D2C5]' : 'bg-white/5 text-white/50 border-white/10'
            }`}
          >
            Level {score}/4 Security Index
          </span>
        </div>
      </div>

      {/* Main Grid: Radial Dial + Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Radial Arc Dial */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-3">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-120 transform" viewBox="0 0 100 100">
              {/* Background track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={isMinimal ? '#D8D2C5' : 'rgba(255,255,255,0.08)'}
                strokeWidth="7"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
              />
              {/* Active animated stroke */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={current.stroke}
                strokeWidth="7"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
                style={{
                  filter: !isMinimal ? `drop-shadow(0 0 6px ${current.glow})` : undefined,
                }}
              />
            </svg>

            {/* Centered Dial Readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span
                className={`text-2xl sm:text-3xl font-mono font-bold tracking-tighter tabular-nums ${
                  isMinimal ? 'text-[#2C2924]' : 'text-white'
                }`}
              >
                {password_length > 0 ? entropy_bits.toFixed(1) : '0.0'}
              </span>
              <span
                className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                  isMinimal ? 'text-[#767066]' : 'text-white/40'
                }`}
              >
                BITS ENTROPY
              </span>
            </div>
          </div>

          <div className="mt-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${current.badge}`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              {verdict.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Breakdown & Telemetry Matrix */}
        <div className="md:col-span-8 space-y-4">
          {/* Segmented Strength Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className={isMinimal ? 'text-[#767066]' : 'text-white/50'}>CRYPTOGRAPHIC GRADE</span>
              <span className={`font-bold ${current.text}`}>{current.label}</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((seg) => {
                const filled = seg <= score && password_length > 0;
                return (
                  <div
                    key={seg}
                    className={`h-2.5 rounded-full transition-colors duration-150 ${
                      filled
                        ? current.color
                        : isMinimal
                        ? 'bg-[#D8D2C5]'
                        : 'bg-white/10'
                    } ${filled && !isMinimal ? 'shadow-[0_0_12px_currentColor]' : ''}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div
              className={`p-3 rounded-xl border ${
                isMinimal ? 'bg-[#EAE5DB] border-[#D8D2C5]' : 'bg-white/5 border-white/10'
              }`}
            >
              <div className={`text-[11px] font-mono ${isMinimal ? 'text-[#767066]' : 'text-white/40'}`}>
                CHARACTER POOL DIVERSITY
              </div>
              <div className={`text-base font-mono font-bold mt-0.5 tabular-nums ${isMinimal ? 'text-[#2C2924]' : 'text-white'}`}>
                {charset_size} <span className="text-xs font-normal opacity-60">possibilities / char</span>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isMinimal ? 'bg-[#EAE5DB] border-[#D8D2C5]' : 'bg-white/5 border-white/10'
              }`}
            >
              <div className={`text-[11px] font-mono ${isMinimal ? 'text-[#767066]' : 'text-white/40'}`}>
                THEORETICAL SEARCH SPACE
              </div>
              <div className={`text-base font-mono font-bold mt-0.5 tabular-nums ${isMinimal ? 'text-[#2C2924]' : 'text-white'}`}>
                {password_length > 0 ? `~${charset_size}^${password_length}` : '0 combinations'}
              </div>
            </div>
          </div>

          {/* Character Classes Checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { label: 'Lowercase (a-z)', active: has_lower },
              { label: 'Uppercase (A-Z)', active: has_upper },
              { label: 'Numbers (0-9)', active: has_digits },
              { label: 'Symbols (!@#)', active: has_symbols },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors duration-150 ${
                  item.active
                    ? isMinimal
                      ? 'bg-[#DEE7DC] text-[#2A522E] border border-[#C7D7C4]'
                      : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    : isMinimal
                    ? 'bg-[#EAE5DB] text-[#767066] border border-[#D8D2C5]'
                    : 'bg-white/[0.02] text-white/30 border border-white/5'
                }`}
              >
                {item.active ? (
                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isMinimal ? 'text-[#2A522E]' : 'text-emerald-400'}`} />
                ) : (
                  <XCircle className="w-3.5 h-3.5 opacity-40 shrink-0" />
                )}
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
