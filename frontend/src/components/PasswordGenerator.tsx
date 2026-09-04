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
    <div
      className={`rounded-2xl p-6 transition-all duration-300 space-y-5 ${
        isMinimal
          ? 'bg-white border border-[#EAEAEA] shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
          : 'bg-[#0a0d16]/85 border border-white/10 backdrop-blur-xl'
      }`}
    >
      {/* Header & Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div
            className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase mb-1 ${
              isMinimal ? 'text-[#787774]' : 'text-emerald-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>CRYPTOGRAPHIC CSPRNG GENERATOR</span>
          </div>
          <h3
            className={`text-base sm:text-lg font-bold tracking-tight ${
              isMinimal ? 'font-serif-editorial text-[#111111]' : 'font-mono text-white'
            }`}
          >
            Generate High-Entropy Passwords &amp; Passphrases
          </h3>
        </div>

        <div
          className={`flex items-center gap-1 p-1 rounded-xl text-xs font-mono self-start sm:self-auto ${
            isMinimal ? 'bg-[#F7F6F3] border border-[#EAEAEA]' : 'bg-black/40 border border-white/10'
          }`}
        >
          <button
            onClick={() => setMode('random')}
            className={`px-3 py-1 rounded-lg transition-all ${
              mode === 'random'
                ? isMinimal
                  ? 'bg-[#111111] text-white'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : isMinimal
                ? 'text-[#787774] hover:text-[#111111]'
                : 'text-white/40 hover:text-white'
            }`}
          >
            Random Token
          </button>
          <button
            onClick={() => setMode('passphrase')}
            className={`px-3 py-1 rounded-lg transition-all ${
              mode === 'passphrase'
                ? isMinimal
                  ? 'bg-[#111111] text-white'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : isMinimal
                ? 'text-[#787774] hover:text-[#111111]'
                : 'text-white/40 hover:text-white'
            }`}
          >
            Memorable Passphrase
          </button>
        </div>
      </div>

      {/* Generated Display Box */}
      <div
        className={`rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border ${
          isMinimal
            ? 'bg-[#FBFBFA] border-[#EAEAEA]'
            : 'bg-black/60 border-white/15 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]'
        }`}
      >
        <div
          className={`font-mono text-sm sm:text-base break-all tracking-wider ${
            generated
              ? isMinimal
                ? 'text-[#111111] font-bold'
                : 'text-emerald-400 font-bold'
              : isMinimal
              ? 'text-[#787774]'
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
                className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                  copied
                    ? isMinimal
                      ? 'bg-[#EDF3EC] text-[#346538]'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : isMinimal
                    ? 'border border-[#EAEAEA] bg-white text-[#111111] hover:bg-[#F2F1ED]'
                    : 'border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleApply}
                title="Load into Analyzer above"
                className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                  isMinimal
                    ? 'bg-[#111111] text-white hover:bg-[#2F3437]'
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
            className={`px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-all active:scale-[0.98] ${
              !generated
                ? isMinimal
                  ? 'bg-[#111111] text-white hover:bg-[#2F3437]'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : isMinimal
                ? 'border border-[#EAEAEA] bg-white text-[#111111] hover:bg-[#F2F1ED]'
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
                isMinimal ? 'text-[#111111]' : 'text-white/80'
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
            className="w-full accent-emerald-500 cursor-pointer"
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
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-mono cursor-pointer border transition-colors ${
                  opt.val
                    ? isMinimal
                      ? 'bg-[#EDF3EC] text-[#346538] border-[#D4EDDA]'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                    : isMinimal
                    ? 'bg-[#F7F6F3] text-[#787774] border-[#EAEAEA]'
                    : 'bg-white/5 text-white/40 border-white/5'
                }`}
              >
                <input
                  type="checkbox"
                  checked={opt.val}
                  onChange={(e) => opt.set(e.target.checked)}
                  className="rounded accent-emerald-500"
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
                isMinimal ? 'text-[#111111]' : 'text-white/80'
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
            className="w-full accent-emerald-500 cursor-pointer"
          />

          <p
            className={`text-xs font-mono ${
              isMinimal ? 'text-[#787774]' : 'text-white/40'
            }`}
          >
            Generates passphrases from curated English wordlists with numeric suffix (e.g. <code>Cobalt-Falcon-Meadow-Beacon-42</code>).
          </p>
        </div>
      )}
    </div>
  );
}
