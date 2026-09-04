import React, { useState } from 'react';
import { KeyRound, RefreshCw, Copy, Check, ArrowDownToLine, Sparkles, Sliders } from 'lucide-react';
import { generatePassword, GenerateOptions } from '../lib/api';

interface PasswordGeneratorProps {
  onApplyPassword: (pwd: string) => void;
  theme?: 'cyber' | 'minimalist';
}

export default function PasswordGenerator({
  onApplyPassword,
  theme = 'cyber',
}: PasswordGeneratorProps) {
  const isMinimal = theme === 'minimalist';

  const [mode, setMode] = useState<'random' | 'passphrase'>('random');
  const [length, setLength] = useState(18);
  const [wordCount, setWordCount] = useState(4);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeDigits, setIncludeDigits] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const opts: GenerateOptions = {
        mode,
        length,
        include_upper: includeUpper,
        include_lower: includeLower,
        include_digits: includeDigits,
        include_symbols: includeSymbols,
        word_count: wordCount,
        separator: '-',
        capitalize: true,
      };
      const res = await generatePassword(opts);
      setGenerated(res.password);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generated) return;
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (!generated) return;
    onApplyPassword(generated);
  };

  return (
    <div className={isMinimal ? 'doppelrand-shell-minimal' : 'doppelrand-shell'}>
      <div
        className={`p-6 sm:p-7 transition-colors duration-150 space-y-5 ${
          isMinimal ? 'doppelrand-core-minimal' : 'doppelrand-core'
        }`}
      >
        {/* Header & Mode Tabs */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${isMinimal ? 'border-[#D8D2C5]' : 'border-white/10'}`}>
        <div>
          <div
            className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase mb-1 ${
              isMinimal ? 'text-[#767066]' : 'text-emerald-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>CRYPTOGRAPHIC CSPRNG GENERATOR</span>
          </div>
          <h3
            className={`text-base sm:text-lg font-bold tracking-tight ${
              isMinimal ? 'font-serif-editorial text-[#2C2924]' : 'font-mono text-white'
            }`}
          >
            Forge Cryptographically Secure Passwords &amp; Passphrases
          </h3>
        </div>

        <div
          className={`flex items-center gap-1 p-1 rounded-xl text-xs font-mono self-start sm:self-auto ${
            isMinimal ? 'bg-[#EAE5DB] border border-[#D8D2C5]' : 'bg-black/40 border border-white/10'
          }`}
        >
          <button
            onClick={() => setMode('random')}
            className={`px-3 py-1.5 rounded-lg transition-colors duration-150 active:scale-95 font-medium ${
              mode === 'random'
                ? isMinimal
                  ? 'bg-[#2C2924] text-[#F4F1EA]'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : isMinimal
                ? 'text-[#767066] hover:text-[#2C2924]'
                : 'text-white/40 hover:text-white'
            }`}
          >
            Random Token
          </button>
          <button
            onClick={() => setMode('passphrase')}
            className={`px-3 py-1.5 rounded-lg transition-colors duration-150 active:scale-95 font-medium ${
              mode === 'passphrase'
                ? isMinimal
                  ? 'bg-[#2C2924] text-[#F4F1EA]'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : isMinimal
                ? 'text-[#767066] hover:text-[#2C2924]'
                : 'text-white/40 hover:text-white'
            }`}
          >
            Diceware Passphrase
          </button>
        </div>
      </div>

      {/* Generated Display Box */}
      <div
        className={`rounded-xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-3 border transition-colors duration-150 ${
          isMinimal
            ? 'bg-[#EAE5DB] border-[#D8D2C5]'
            : 'bg-black/60 border-white/15 shadow-[inset_0_0_24px_rgba(0,0,0,0.6)]'
        }`}
      >
        <div
          className={`font-mono text-sm sm:text-base break-all tracking-wider tabular-nums ${
            generated
              ? isMinimal
                ? 'text-[#2C2924] font-bold'
                : 'text-emerald-400 font-bold'
              : isMinimal
              ? 'text-[#767066]'
              : 'text-white/30'
          }`}
        >
          {generated || 'Click Generate to forge a secure password...'}
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          {generated && (
            <>
              <button
                onClick={handleCopy}
                title="Copy Generated Password"
                className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors duration-150 active:scale-95 ${
                  copied
                    ? isMinimal
                      ? 'bg-[#DEE7DC] text-[#2A522E]'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : isMinimal
                    ? 'border border-[#D8D2C5] bg-[#F4F1EA] text-[#2C2924] hover:bg-[#EAE5DB]'
                    : 'border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleApply}
                title="Load into Analyzer above"
                className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors duration-150 active:scale-95 ${
                  isMinimal
                    ? 'bg-[#2C2924] text-[#F4F1EA] hover:bg-[#3D3A34]'
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold hover:brightness-110 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                }`}
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>Test in Analyzer</span>
              </button>
            </>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-colors duration-150 active:scale-95 ${
              !generated
                ? isMinimal
                  ? 'bg-[#2C2924] text-[#F4F1EA] hover:bg-[#3D3A34]'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : isMinimal
                ? 'border border-[#D8D2C5] bg-[#F4F1EA] text-[#2C2924] hover:bg-[#EAE5DB]'
                : 'border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Generate</span>
          </button>
        </div>
      </div>

      {/* Controls & Options */}
      {mode === 'random' ? (
        <div className="space-y-4 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label
              className={`text-xs font-mono flex items-center justify-between w-full ${
                isMinimal ? 'text-[#2C2924]' : 'text-white/80'
              }`}
            >
              <span>Password Length: {length} characters</span>
              <span className="text-[11px] opacity-60">Search space: ~72^({length})</span>
            </label>
          </div>

          <input
            type="range"
            min={8}
            max={48}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className={`w-full cursor-pointer ${isMinimal ? 'accent-[#2A522E]' : 'accent-emerald-500'}`}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {[
              { label: 'Uppercase (A-Z)', val: includeUpper, set: setIncludeUpper },
              { label: 'Lowercase (a-z)', val: includeLower, set: setIncludeLower },
              { label: 'Numbers (0-9)', val: includeDigits, set: setIncludeDigits },
              { label: 'Symbols (!@#$)', val: includeSymbols, set: setIncludeSymbols },
            ].map((opt) => (
              <label
                key={opt.label}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-mono cursor-pointer border transition-colors duration-150 ${
                  opt.val
                    ? isMinimal
                      ? 'bg-[#DEE7DC] text-[#2A522E] border-[#C7D7C4]'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                    : isMinimal
                    ? 'bg-[#EAE5DB] text-[#767066] border-[#D8D2C5]'
                    : 'bg-white/5 text-white/40 border-white/5'
                }`}
              >
                <input
                  type="checkbox"
                  checked={opt.val}
                  onChange={(e) => opt.set(e.target.checked)}
                  className={`rounded ${isMinimal ? 'accent-[#2A522E]' : 'accent-emerald-500'}`}
                />
                <span className="truncate">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label
              className={`text-xs font-mono flex items-center justify-between w-full ${
                isMinimal ? 'text-[#2C2924]' : 'text-white/80'
              }`}
            >
              <span>Word Count: {wordCount} words</span>
              <span className="text-[11px] opacity-60">High-entropy memorable diceware</span>
            </label>
          </div>

          <input
            type="range"
            min={3}
            max={7}
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
            className={`w-full cursor-pointer ${isMinimal ? 'accent-[#2A522E]' : 'accent-emerald-500'}`}
          />

          <p
            className={`text-xs font-mono ${
              isMinimal ? 'text-[#767066]' : 'text-white/40'
            }`}
          >
            Generates passphrases from curated English wordlists with numeric suffix (e.g. <code>Cobalt-Falcon-Meadow-Beacon-42</code>).
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
