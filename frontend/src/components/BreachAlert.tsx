import React from 'react';
import { ShieldAlert, ShieldCheck, Database, Loader2, AlertTriangle, KeyRound } from 'lucide-react';
import { PwnedCheckResult } from '../lib/hibpClient';

interface BreachAlertProps {
  breachResult: PwnedCheckResult | null;
  loading: boolean;
  hasInput: boolean;
  theme?: 'cyber' | 'minimalist';
}

export default function BreachAlert({
  breachResult,
  loading,
  hasInput,
  theme = 'cyber',
}: BreachAlertProps) {
  const isMinimal = theme === 'minimalist';

  if (!hasInput) {
    return (
      <div
        className={`p-4 sm:p-5 text-xs font-mono flex items-center gap-3 rounded-xl transition-colors duration-150 ${
          isMinimal
            ? 'bg-[#F4F1EA] border border-[#D8D2C5] text-[#767066]'
            : 'bg-[#0A0D14] border border-[#1E2536] text-white/40'
        }`}
      >
        <Database className="w-4 h-4 text-emerald-400/60 shrink-0" />
        <span>Awaiting input to audit against 850M+ breached credentials via HaveIBeenPwned SHA-1 k-Anonymity protocol.</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`p-4 sm:p-5 text-xs font-mono flex items-center gap-3 rounded-xl animate-pulse ${
          isMinimal
            ? 'bg-[#DFE7EE] border border-[#C5D5E2] text-[#1E4D6E]'
            : 'bg-[#0E1522] border border-cyan-500/30 text-cyan-300'
        }`}
      >
        <Loader2 className="w-4 h-4 animate-spin shrink-0 text-cyan-400" />
        <span>Hashing SHA-1 prefix [5-char hex] &amp; verifying k-Anonymity against global breach corpus...</span>
      </div>
    );
  }

  if (breachResult?.isPwned) {
    return (
      <div
        className={`p-5 sm:p-6 rounded-xl transition-colors duration-150 ${
          isMinimal
            ? 'bg-[#F2DFDE] border border-[#E5C7C5] text-[#822B29] shadow-sm'
            : 'bg-[#150A0E] border border-rose-500/40 text-rose-300 shadow-[0_0_28px_rgba(244,63,94,0.15)]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${
                isMinimal ? 'bg-[#EAE5DB] text-[#822B29]' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}
            >
              <ShieldAlert className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase font-bold tracking-wider">
                  CRITICAL: PUBLIC DATA BREACH EXPOSURE DETECTED
                </span>
              </div>
              <p
                className={`text-sm font-mono mt-1 ${
                  isMinimal ? 'text-[#822B29]' : 'text-rose-200'
                }`}
              >
                This exact passcode was uncovered in{' '}
                <strong className="font-bold underline tabular-nums">
                  {breachResult.pwnedCount.toLocaleString()}
                </strong>{' '}
                verified corporate and database breaches recorded by HaveIBeenPwned.
              </p>
              <p className="text-[11px] font-mono opacity-80 mt-0.5">
                Automated credential-stuffing dictionaries contain this string. Do not use this under any circumstance.
              </p>
            </div>
          </div>

          <div className="self-end sm:self-center shrink-0">
            <span
              className={`text-xs font-mono font-bold px-3 py-1.5 rounded border ${
                isMinimal
                  ? 'bg-[#EAE5DB] border-[#E5C7C5] text-[#822B29]'
                  : 'bg-rose-500/15 border-rose-500/40 text-rose-400'
              }`}
            >
              CRITICAL THREAT
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Safe / Clean Result
  return (
    <div
      className={`p-4 sm:p-5 rounded-xl transition-colors duration-150 ${
        isMinimal
          ? 'bg-[#DEE7DC] border border-[#C7D7C4] text-[#2A522E]'
          : 'bg-[#08120E] border border-emerald-500/30 text-emerald-300'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShieldCheck className={`w-5 h-5 shrink-0 ${isMinimal ? 'text-[#2A522E]' : 'text-emerald-400'}`} />
          <div className="text-xs font-mono">
            <span className="font-bold uppercase tracking-wider block">
              ZERO LEAKAGE DETECTED // CLEAN CORPUS
            </span>
            <span className="opacity-80">
              No matching SHA-1 hash occurrences found in 850M+ verified HaveIBeenPwned breach records.
            </span>
          </div>
        </div>

        <span
          className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded border shrink-0 hidden sm:inline-block ${
            isMinimal
              ? 'bg-[#F4F1EA] text-[#2A522E] border-[#C7D7C4]'
              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
          }`}
        >
          K-ANONYMITY VERIFIED
        </span>
      </div>
    </div>
  );
}
