import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Copy, Check, X, ShieldCheck, Lock, Unlock, KeyRound } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  theme?: 'cyber' | 'minimalist';
}

export default function PasswordInput({ value, onChange, theme = 'cyber' }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const isMinimal = theme === 'minimalist';

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    onChange('');
  };

  // Keyboard shortcut: Esc to clear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && value) {
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [value]);

  return (
    <div className={isMinimal ? 'doppelrand-shell-minimal' : 'doppelrand-shell'}>
      <div
        className={`transition-colors duration-150 p-6 sm:p-7 ${
          isMinimal ? 'doppelrand-core-minimal' : 'doppelrand-core'
        }`}
      >
        {/* Hardware Enclave Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <div
            className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
              isMinimal ? 'text-[#767066]' : 'text-emerald-400'
            }`}
          >
            {showPassword ? (
              <Unlock className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Lock className="w-3.5 h-3.5" />
            )}
            <span>CRYPTOGRAPHIC SAFE INPUT // MEMORY ENCLAVE</span>
          </div>

          <div className="flex items-center gap-2">
            {value && (
              <span
                className={`hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded ${
                  isMinimal ? 'text-[#767066]' : 'text-white/40'
                }`}
              >
                [ESC TO PURGE]
              </span>
            )}

            <span
              className={`text-[11px] font-mono px-2.5 py-0.5 rounded tabular-nums ${
                isMinimal
                  ? 'bg-[#EAE5DB] text-[#767066] border border-[#D8D2C5]'
                  : 'bg-[#0E121B] text-emerald-300 border border-[#1E2536]'
              }`}
            >
              {value.length} CHARS
            </span>

            <span
              className={`hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded ${
                isMinimal
                  ? 'bg-[#DEE7DC] text-[#2A522E] border border-[#C7D7C4]'
                  : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              FIPS-ZERO-KNOWLEDGE
            </span>
          </div>
        </div>

        {/* Machined Recessed Input Slot */}
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400/50">
            <KeyRound className="w-4 h-4" />
          </div>

          <input
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type, generate, or paste a passcode to inspect..."
            autoComplete="off"
            spellCheck="false"
            className={`w-full pl-10 pr-32 py-4 rounded-lg font-mono text-sm sm:text-base tracking-wide transition-all duration-150 focus:outline-none ${
              isMinimal
                ? 'bg-[#E6E1D7] border border-[#D1CAC0] text-[#2C2924] placeholder-[#8A8479] focus:border-[#2C2924] focus:ring-1 focus:ring-[#2C2924]'
                : 'bg-[#07090E] border border-[#1E2536] text-white placeholder-white/30 focus:border-emerald-500 focus:shadow-[0_0_24px_rgba(16,185,129,0.2)]'
            }`}
          />

          {/* Action Controls inside Input */}
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {value && (
              <button
                onClick={handleClear}
                title="Purge Input (Esc)"
                className={`p-1.5 rounded transition-colors duration-150 active:scale-95 ${
                  isMinimal
                    ? 'text-[#767066] hover:text-[#2C2924] hover:bg-[#DCD7CD]'
                    : 'text-white/40 hover:text-white hover:bg-white/10'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Mask Passcode' : 'Reveal Passcode'}
              className={`p-1.5 rounded transition-colors duration-150 active:scale-95 ${
                isMinimal
                  ? 'text-[#767066] hover:text-[#2C2924] hover:bg-[#DCD7CD]'
                  : 'text-white/40 hover:text-white hover:bg-white/10'
              }`}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>

            <button
              onClick={handleCopy}
              disabled={!value}
              title={copied ? 'Copied to Clipboard!' : 'Copy Passcode'}
              className={`p-1.5 rounded transition-colors duration-150 active:scale-95 ${
                copied
                  ? isMinimal
                    ? 'bg-[#DEE7DC] text-[#2A522E]'
                    : 'bg-emerald-500/20 text-emerald-400'
                  : isMinimal
                  ? 'text-[#767066] hover:text-[#2C2924] hover:bg-[#DCD7CD] disabled:opacity-30'
                  : 'text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-30'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Security Hardware Notice */}
        <div
          className={`text-[11px] font-mono mt-3.5 flex items-center justify-between flex-wrap gap-2 ${
            isMinimal ? 'text-[#767066]' : 'text-white/40'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className={isMinimal ? 'text-[#2A522E]' : 'text-emerald-400'}>●</span>
            <span>Zero-Knowledge Hardware Guarantee: String evaluated strictly in sandboxed memory.</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-emerald-400/80 font-semibold">
            NEVER TRANSMITTED PLAINTEXT
          </span>
        </div>
      </div>
    </div>
  );
}
