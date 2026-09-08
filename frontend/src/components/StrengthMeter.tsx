import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Zap, CheckCircle2, XCircle, Activity, Gauge, Lock } from 'lucide-react';
import { AnalysisResult } from '../lib/clientAnalyzer';

interface StrengthMeterProps {
  analysis: AnalysisResult;
  theme?: 'cyber' | 'minimalist';
}

export default function StrengthMeter({ analysis, theme = 'cyber' }: StrengthMeterProps) {
  const isMinimal = theme === 'minimalist';
  const { score, verdict, entropy_bits, charset_size, has_lower, has_upper, has_digits, has_symbols, password_length } = analysis;

  // Visual color maps based on score - calibrated for Swiss Dark Enclave & Minimal Paper
  const scoreConfig = [
    {
      label: 'VERY WEAK',
      color: isMinimal ? 'bg-[#A32938]' : 'bg-rose-500',
      stroke: isMinimal ? '#A32938' : '#F43F5E',
      glow: 'rgba(244, 63, 94, 0.35)',
      text: isMinimal ? 'text-[#822B29]' : 'text-rose-400',
      badge: isMinimal ? 'bg-[#F2DFDE] text-[#862927] border-[#E5C7C5]' : 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      icon: ShieldAlert,
    },
    {
      label: 'WEAK',
      color: isMinimal ? 'bg-[#B8591B]' : 'bg-orange-500',
      stroke: isMinimal ? '#B8591B' : '#F97316',
      glow: 'rgba(249, 115, 22, 0.35)',
      text: isMinimal ? 'text-[#8A4A18]' : 'text-orange-400',
      badge: isMinimal ? 'bg-[#F4E4D3] text-[#8A4A18] border-[#E8D0BA]' : 'bg-orange-500/10 text-orange-300 border-orange-500/30',
      icon: AlertTriangle,
    },
    {
      label: 'MODERATE',
      color: isMinimal ? 'bg-[#A36500]' : 'bg-amber-500',
      stroke: isMinimal ? '#A36500' : '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.35)',
      text: isMinimal ? 'text-[#7A5310]' : 'text-amber-400',
      badge: isMinimal ? 'bg-[#EFE8D6] text-[#78540B] border-[#DFD4BA]' : 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      icon: AlertTriangle,
    },
    {
      label: 'STRONG',
      color: isMinimal ? 'bg-[#1C567A]' : 'bg-emerald-500',
      stroke: isMinimal ? '#1C567A' : '#10B981',
      glow: 'rgba(16, 185, 129, 0.35)',
      text: isMinimal ? 'text-[#1E4D6E]' : 'text-emerald-400',
      badge: isMinimal ? 'bg-[#DFE7EE] text-[#1E4D6E] border-[#C5D5E2]' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      icon: ShieldCheck,
    },
    {
      label: 'ENCLAVE TITANIUM',
      color: isMinimal ? 'bg-[#236437]' : 'bg-emerald-400',
      stroke: isMinimal ? '#236437' : '#34D399',
      glow: 'rgba(52, 211, 153, 0.45)',
      text: isMinimal ? 'text-[#2A522E]' : 'text-emerald-300',
      badge: isMinimal ? 'bg-[#DEE7DC] text-[#2A522E] border-[#C7D7C4]' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: Zap,
    },
  ];

  const current = scoreConfig[score] || scoreConfig[0];
  const IconComponent = current.icon;

  // Swiss Arc Gauge Math (240 degree sweep)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * (240 / 360);
  const entropyRatio = Math.min(Math.max(entropy_bits / 128, 0), 1);
  const strokeOffset = arcLength * (1 - (password_length > 0 ? entropyRatio : 0));

  return (
    <div
      className={`transition-colors duration-150 p-6 sm:p-7 ${
        isMinimal ? 'minimalist-card' : 'vault-panel'
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 mb-6 pb-3 border-b border-white/[0.08]">
        <div
          className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
            isMinimal ? 'text-[#767066]' : 'text-emerald-400'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>SHANNON ENTROPY TELEMETRY // BIT DENSITY</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${
              isMinimal ? 'bg-[#EAE5DB] text-[#767066] border-[#D8D2C5]' : 'bg-[#0A0D14] text-white/60 border-[#1E2536]'
            }`}
          >
            FIPS TIER {score}/4
          </span>
        </div>
      </div>

      {/* Main Grid: Radial Dial + Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Radial Arc Dial */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-3">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-120 transform" viewBox="0 0 100 100">
              {/* Background track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={isMinimal ? '#D8D2C5' : '#1A2030'}
                strokeWidth="6"
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
                strokeWidth="6"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
                style={{
                  filter: !isMinimal ? `drop-shadow(0 0 8px ${current.glow})` : undefined,
                }}
              />
            </svg>

            {/* Centered Dial Readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span
                className={`text-3xl font-mono font-bold tracking-tighter tabular-nums ${
                  isMinimal ? 'text-[#2C2924]' : 'text-white'
                }`}
              >
                {entropy_bits.toFixed(1)}
              </span>
              <span className={`text-[10px] font-mono uppercase tracking-wider ${isMinimal ? 'text-[#767066]' : 'text-white/40'}`}>
                BITS ENTROPY
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-bold uppercase border ${current.badge}`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{current.label}</span>
            </span>
          </div>
        </div>

        {/* Detailed Analytics Telemetry */}
        <div className="md:col-span-8 space-y-4">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
              className={`p-3 rounded-lg border ${
                isMinimal ? 'bg-[#EAE5DB] border-[#D8D2C5]' : 'bg-[#080A10] border-[#1E2536]'
              }`}
            >
              <div className={`text-[10px] font-mono uppercase ${isMinimal ? 'text-[#767066]' : 'text-white/40'}`}>
                CHARSET POOL
              </div>
              <div className={`text-lg font-mono font-bold mt-0.5 tabular-nums ${isMinimal ? 'text-[#2C2924]' : 'text-emerald-400'}`}>
                {charset_size} <span className="text-xs font-normal opacity-50">/ 94</span>
              </div>
            </div>

            <div
              className={`p-3 rounded-lg border ${
                isMinimal ? 'bg-[#EAE5DB] border-[#D8D2C5]' : 'bg-[#080A10] border-[#1E2536]'
              }`}
            >
              <div className={`text-[10px] font-mono uppercase ${isMinimal ? 'text-[#767066]' : 'text-white/40'}`}>
                SECURITY VERDICT
              </div>
              <div className={`text-sm font-mono font-bold mt-1 uppercase ${current.text}`}>
                {verdict}
              </div>
            </div>

            <div
              className={`p-3 rounded-lg border col-span-2 sm:col-span-1 ${
                isMinimal ? 'bg-[#EAE5DB] border-[#D8D2C5]' : 'bg-[#080A10] border-[#1E2536]'
              }`}
            >
              <div className={`text-[10px] font-mono uppercase ${isMinimal ? 'text-[#767066]' : 'text-white/40'}`}>
                TARGET RATIO
              </div>
              <div className={`text-lg font-mono font-bold mt-0.5 tabular-nums ${isMinimal ? 'text-[#2C2924]' : 'text-white'}`}>
                {Math.min(100, Math.round((entropy_bits / 128) * 100))}% <span className="text-xs font-normal opacity-50">of 128b</span>
              </div>
            </div>
          </div>

          {/* Character Distribution Matrix */}
          <div
            className={`p-4 rounded-lg border ${
              isMinimal ? 'bg-[#F0ECE4] border-[#D8D2C7]' : 'bg-[#080A10] border-[#1E2536]'
            }`}
          >
            <div className={`text-[11px] font-mono uppercase tracking-wider mb-3 ${isMinimal ? 'text-[#767066]' : 'text-white/50'}`}>
              CHARACTER SET REPERTOIRE VERIFICATION
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div
                className={`flex items-center justify-between p-2 rounded text-xs font-mono border ${
                  has_lower
                    ? isMinimal
                      ? 'bg-[#DEE7DC] border-[#C7D7C4] text-[#2A522E]'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : isMinimal
                    ? 'bg-[#EAE5DB] border-[#D8D2C5] text-[#8A8479]'
                    : 'bg-white/5 border-white/10 text-white/30'
                }`}
              >
                <span>Lower [a-z]</span>
                {has_lower ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`flex items-center justify-between p-2 rounded text-xs font-mono border ${
                  has_upper
                    ? isMinimal
                      ? 'bg-[#DEE7DC] border-[#C7D7C4] text-[#2A522E]'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : isMinimal
                    ? 'bg-[#EAE5DB] border-[#D8D2C5] text-[#8A8479]'
                    : 'bg-white/5 border-white/10 text-white/30'
                }`}
              >
                <span>Upper [A-Z]</span>
                {has_upper ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`flex items-center justify-between p-2 rounded text-xs font-mono border ${
                  has_digits
                    ? isMinimal
                      ? 'bg-[#DEE7DC] border-[#C7D7C4] text-[#2A522E]'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : isMinimal
                    ? 'bg-[#EAE5DB] border-[#D8D2C5] text-[#8A8479]'
                    : 'bg-white/5 border-white/10 text-white/30'
                }`}
              >
                <span>Digits [0-9]</span>
                {has_digits ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`flex items-center justify-between p-2 rounded text-xs font-mono border ${
                  has_symbols
                    ? isMinimal
                      ? 'bg-[#DEE7DC] border-[#C7D7C4] text-[#2A522E]'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : isMinimal
                    ? 'bg-[#EAE5DB] border-[#D8D2C5] text-[#8A8479]'
                    : 'bg-white/5 border-white/10 text-white/30'
                }`}
              >
                <span>Symbols [!#$]</span>
                {has_symbols ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
