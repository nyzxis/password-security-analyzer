import React from 'react';
import { ShieldAlert, ShieldCheck, Database, Loader2, AlertTriangle } from 'lucide-react';
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
        className={`rounded-2xl p-5 text-xs font-mono flex items-center gap-3 transition-colors duration-150 ${
          isMinimal
            ? 'bg-[#F4F1EA] border border-[#D8D2C5] text-[#767066]'
            : 'bg-[#0a0d16]/70 border border-white/10 text-white/40'
        }`}
      >
        <Database className="w-4 h-4 opacity-50 shrink-0" />
        <span>Type a passcode above to cross-reference with 850M+ breached credentials via HaveIBeenPwned k-Anonymity.</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`rounded-2xl p-5 text-xs font-mono flex items-center gap-3 animate-pulse ${
          isMinimal
            ? 'bg-[#DFE7EE] border border-[#C5D5E2] text-[#1E4D6E]'
            : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-300'
        }`}
      >
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        <span>Computing SHA-1 k-Anonymity hash &amp; auditing global breach database...</span>
      </div>
    );
  }

  if (breachResult?.isPwned) {
    return (
      <div
        className={`rounded-2xl p-5.5 transition-colors duration-150 ${
          isMinimal
            ? 'bg-[#F2DFDE] border border-[#E5C7C5] text-[#822B29] shadow-sm'
            : 'bg-rose-500/15 border border-rose-500/35 text-rose-300 cyber-glow-rose'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                isMinimal ? 'bg-[#EAE5DB] text-[#822B29]' : 'bg-black/40 text-rose-400 border border-rose-500/40'
              }`}
            >
              <ShieldAlert className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase font-bold tracking-wider">
                  GLOBAL DATA BREACH EXPOSURE DETECTED
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
                verified breach datasets cataloged by HaveIBeenPwned.
              </p>
              <p className="text-[11px] font-mono opacity-80 mt-0.5">
                Automated credential-stuffing botnets actively test this hash. Never use this combination for any online account!
              </p>
            </div>
          </div>

          <div className="self-end sm:self-center shrink-0">
            <span
              className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border ${
                isMinimal
                  ? 'bg-[#EAE5DB] border-[#E5C7C5] text-[#822B29]'
                  : 'bg-black/60 border-rose-500/40 text-rose-400'
              }`}
            >
              CRITICAL EXPOSURE
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-5 transition-colors duration-150 ${
        isMinimal
          ? 'bg-[#DEE7DC] border border-[#C7D7C4] text-[#2A522E] shadow-sm'
          : 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-300'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl shrink-0 ${
              isMinimal ? 'bg-[#EAE5DB] text-[#2A522E]' : 'bg-black/40 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                NO KNOWN PUBLIC BREACH EXPOSURES
              </span>
            </div>
            <p className="text-xs font-mono mt-0.5 opacity-90">
              Not found in 850M+ publicly leaked passwords via Troy Hunt's k-Anonymity SHA-1 prefix lookup.
            </p>
          </div>
        </div>

        <span
          className={`hidden sm:inline-block text-xs font-mono font-bold px-3 py-1.5 rounded-lg border ${
            isMinimal
              ? 'bg-[#EAE5DB] border-[#C7D7C4] text-[#2A522E]'
              : 'bg-black/50 border-emerald-500/30 text-emerald-400'
          }`}
        >
          ZERO-PWNED HASH
        </span>
      </div>
    </div>
  );
}
