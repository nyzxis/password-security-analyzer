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
        className={`rounded-2xl p-5 text-xs font-mono flex items-center gap-3 transition-colors ${
          isMinimal
            ? 'bg-white border border-[#EAEAEA] text-[#787774]'
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
            ? 'bg-[#E1F3FE] border border-[#BEE3F8] text-[#1F6C9F]'
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
        className={`rounded-2xl p-5 transition-all ${
          isMinimal
            ? 'bg-[#FDEBEC] border border-[#F8D7DA] text-[#9F2F2D] shadow-sm'
            : 'bg-rose-500/15 border border-rose-500/40 text-rose-300 cyber-glow-rose'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-xl mt-0.5 ${
                isMinimal ? 'bg-white text-[#9F2F2D]' : 'bg-black/40 text-rose-400 border border-rose-500/40'
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
                  isMinimal ? 'text-[#9F2F2D]' : 'text-rose-200'
                }`}
              >
                This exact password was found in{' '}
                <strong className="font-bold underline">
                  {breachResult.pwnedCount.toLocaleString()}
                </strong>{' '}
                public data breaches cataloged by HaveIBeenPwned.
              </p>
              <p className="text-[11px] font-mono opacity-80 mt-0.5">
                Automated credential-stuffing bots routinely test this combination. Change this password immediately!
              </p>
            </div>
          </div>

          <div className="self-end sm:self-center shrink-0">
            <span
              className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border ${
                isMinimal
                  ? 'bg-white border-[#F8D7DA] text-[#9F2F2D]'
                  : 'bg-black/50 border-rose-500/40 text-rose-400'
              }`}
            >
              HIGH RISK
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-5 transition-all ${
        isMinimal
          ? 'bg-[#EDF3EC] border border-[#D4EDDA] text-[#346538] shadow-sm'
          : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl ${
              isMinimal ? 'bg-white text-[#346538]' : 'bg-black/40 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                NO KNOWN BREACH EXPOSURES
              </span>
            </div>
            <p className="text-xs font-mono mt-0.5 opacity-90">
              Not found in 850M+ publicly leaked passwords via k-Anonymity SHA-1 prefix audit.
            </p>
          </div>
        </div>

        <span
          className={`hidden sm:inline-block text-xs font-mono font-bold px-3 py-1.5 rounded-lg border ${
            isMinimal
              ? 'bg-white border-[#D4EDDA] text-[#346538]'
              : 'bg-black/50 border-emerald-500/30 text-emerald-400'
          }`}
        >
          CLEAN HASH
        </span>
      </div>
    </div>
  );
}
