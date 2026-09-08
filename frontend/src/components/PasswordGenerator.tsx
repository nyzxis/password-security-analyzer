import React, { useState } from 'react';
import { KeyRound, RefreshCw, Copy, Check, ArrowDownToLine, Sparkles, Sliders, Shield } from 'lucide-react';
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
  const [length, setLength] = useState(20);
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
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${isMinimal ? 'border-[#D8D2C5]' : 'border-[#1E2536]'}`}>
          <div>
            <div
              className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase mb-1 ${
                isMinimal ? 'text-[#767066]' : 'text-emerald-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>CRYPTOGRAPHIC CSPRNG // ENTROPY FORGE</span>
            </div>
            <h3
              className={`text-base sm:text-lg font-bold tracking-tight ${
                isMinimal ? 'font-sans-clean text-[#2C2924]' : 'font-mono text-white'
              }`}
            >
              Hardware Cryptographic Randomness Generator
            </h3>
          </div>

          <div
            className={`flex items-center gap-1 p-1 rounded-lg text-xs font-mono self-start sm:self-auto ${
              isMinimal ? 'bg-[#EAE5DB] border border-[#D8D2C5]' : 'bg-[#0E121B] border border-[#1E2536]'
            }`}
          >
            <button
              onClick={() => setMode('random')}
              className={`px-3 py-1.5 rounded transition-colors duration-150 active:scale-95 font-medium ${
                mode === 'random'
                  ? isMinimal
                    ? 'bg-[#2C2924] text-[#F4F1EA]'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : isMinimal
                  ? 'text-[#767066] hover:text-[#2C2924]'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Random CSPRNG
            </button>
            <button
              onClick={() => setMode('passphrase')}
              className={`px-3 py-1.5 rounded transition-colors duration-150 active:scale-95 font-medium ${
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

        {/* Generated Display Output Box */}
        <div
          className={`rounded-lg p-4.5 flex flex-col sm:flex-row items-center justify-between gap-3 border transition-colors duration-150 ${
            isMinimal
              ? 'bg-[#EAE5DB] border-[#D8D2C5]'
              : 'bg-[#080A0F] border-[#1E2536]'
          }`}
        >
          <div
            className={`font-mono text-sm sm:text-base break-all tracking-wider tabular-nums ${
              generated
                ? isMinimal
                  ? 'text-[#2C2924] font-bold'
                  : 'text-emerald-300 font-bold'
                : isMinimal
                ? 'text-[#767066]'
                : 'text-white/30'
            }`}
          >
            {generated || 'Select parameters below & forge a high-entropy string...'}
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            {generated && (
              <>
                <button
                  onClick={handleCopy}
                  title="Copy Generated Passcode"
                  className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors duration-150 active:scale-95 ${
                    copied
                      ? isMinimal
                        ? 'bg-[#DEE7DC] text-[#2A522E]'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : isMinimal
                      ? 'border border-[#D8D2C5] bg-[#F4F1EA] text-[#2C2924] hover:bg-[#EAE5DB]'
                      : 'border border-[#1E2536] bg-[#0E121B] text-white/70 hover:text-white hover:border-emerald-500/30'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleApply}
                  title="Test in Analyzer above"
                  className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors duration-150 active:scale-95 ${
                    isMinimal
                      ? 'bg-[#2C2924] text-[#F4F1EA] hover:bg-[#3D3A34]'
                      : 'bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  }`}
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  <span>Inspect in Vault</span>
                </button>
              </>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`px-4 py-1.5 rounded text-xs font-mono flex items-center gap-2 transition-colors duration-150 active:scale-95 ${
                !generated
                  ? isMinimal
                    ? 'bg-[#2C2924] text-[#F4F1EA] hover:bg-[#3D3A34]'
                    : 'bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : isMinimal
                  ? 'border border-[#D8D2C5] bg-[#F4F1EA] text-[#2C2924] hover:bg-[#EAE5DB]'
                  : 'border border-[#1E2536] bg-[#0E121B] text-white/80 hover:text-white hover:border-emerald-500/40'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Forging...' : 'Forge Passcode'}</span>
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
                <span className="text-[11px] opacity-60">Search space: ~94^({length}) combinations</span>
              </label>
            </div>

            <input
              type="range"
              min={8}
              max={64}
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
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-mono cursor-pointer border transition-colors duration-150 ${
                    opt.val
                      ? isMinimal
                        ? 'bg-[#DEE7DC] text-[#2A522E] border-[#C7D7C4]'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : isMinimal
                      ? 'bg-[#EAE5DB] text-[#767066] border-[#D8D2C5]'
                      : 'bg-[#0E121B] text-white/40 border-[#1E2536]'
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
                <span>Word Count: {wordCount} diceware tokens</span>
                <span className="text-[11px] opacity-60">High-entropy human-memorability rating</span>
              </label>
            </div>

            <input
              type="range"
              min={3}
              max={8}
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              className={`w-full cursor-pointer ${isMinimal ? 'accent-[#2A522E]' : 'accent-emerald-500'}`}
            />

            <p
              className={`text-xs font-mono ${
                isMinimal ? 'text-[#767066]' : 'text-white/40'
              }`}
            >
              Generates cryptographic passphrases from curated EFF wordlists with numeric separator suffix (e.g. <code>Cobalt-Falcon-Meadow-Beacon-42</code>).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
