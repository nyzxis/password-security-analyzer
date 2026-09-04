import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check, X, ShieldCheck, Lock } from 'lucide-react';

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

  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${
        isMinimal
          ? 'bg-white border border-[#EAEAEA] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
          : 'bg-[#0a0d16]/90 border border-white/10 p-6 backdrop-blur-xl'
      }`}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div
          className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
            isMinimal ? 'text-[#787774]' : 'text-emerald-400'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>PASSCODE ENTROPY AUDITOR</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded ${
              isMinimal
                ? 'bg-[#F7F6F3] text-[#787774] border border-[#EAEAEA]'
                : 'bg-white/5 text-white/50 border border-white/10'
            }`}
          >
            {value.length} CHARS
          </span>

          <span
            className={`hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded ${
              isMinimal
                ? 'bg-[#EDF3EC] text-[#346538]'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            ZERO-KNOWLEDGE
          </span>
        </div>
      </div>

      {/* Input Field Container */}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type or paste a password to inspect security..."
          autoComplete="off"
          spellCheck="false"
          className={`w-full pl-4 pr-28 py-3.5 rounded-xl font-mono text-sm sm:text-base transition-all focus:outline-none ${
            isMinimal
              ? 'bg-[#FBFBFA] border border-[#EAEAEA] text-[#111111] placeholder-[#787774] focus:border-[#111111]'
              : 'bg-black/50 border border-white/15 text-white placeholder-white/30 focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)]'
          }`}
        />

        {/* Action Controls inside Input */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && (
            <button
              onClick={handleClear}
              title="Clear Input"
              className={`p-1.5 rounded-lg transition-colors ${
                isMinimal
                  ? 'text-[#787774] hover:text-[#111111] hover:bg-[#EAEAEA]'
                  : 'text-white/40 hover:text-white hover:bg-white/10'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? 'Mask Password' : 'Show Password'}
            className={`p-1.5 rounded-lg transition-colors ${
              isMinimal
                ? 'text-[#787774] hover:text-[#111111] hover:bg-[#EAEAEA]'
                : 'text-white/40 hover:text-white hover:bg-white/10'
            }`}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          <button
            onClick={handleCopy}
            disabled={!value}
            title={copied ? 'Copied!' : 'Copy to Clipboard'}
            className={`p-1.5 rounded-lg transition-all ${
              copied
                ? isMinimal
                  ? 'bg-[#EDF3EC] text-[#346538]'
                  : 'bg-emerald-500/20 text-emerald-400'
                : isMinimal
                ? 'text-[#787774] hover:text-[#111111] hover:bg-[#EAEAEA] disabled:opacity-30'
                : 'text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-30'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Security Privacy Notice */}
      <p
        className={`text-[11px] font-mono mt-2.5 flex items-center gap-1.5 ${
          isMinimal ? 'text-[#787774]' : 'text-white/40'
        }`}
      >
        <span>🔒 Zero-Knowledge Guarantee:</span>
        <span>Processed in browser memory. Plaintext password is never sent to any server.</span>
      </p>
    </div>
  );
}
