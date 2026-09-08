import React from 'react';
import { Sparkles, Terminal, KeyRound } from 'lucide-react';

interface PresetsBarProps {
  onSelectPreset: (pwd: string) => void;
  theme?: 'cyber' | 'minimalist';
}

const PRESETS = [
  { label: '123456', pwd: '123456', tag: 'WEAK', color: 'text-rose-400' },
  { label: 'password123', pwd: 'password123', tag: 'PWNED', color: 'text-orange-400' },
  { label: 'P@ssw0rd2024!', pwd: 'P@ssw0rd2024!', tag: 'LEET', color: 'text-amber-400' },
  { label: 'Cosmic-Falcon-Beacon-93', pwd: 'Cosmic-Falcon-Beacon-93', tag: 'DICEWARE', color: 'text-cyan-400' },
  { label: '9v#K$m8!qZ5*pL2@wR7&', pwd: '9v#K$m8!qZ5*pL2@wR7&', tag: 'ENCLAVE', color: 'text-emerald-400' },
];

export default function PresetsBar({ onSelectPreset, theme = 'cyber' }: PresetsBarProps) {
  const isMinimal = theme === 'minimalist';

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span
        className={`text-xs font-mono flex items-center gap-1.5 mr-1 ${
          isMinimal ? 'text-[#767066]' : 'text-white/40'
        }`}
      >
        <Terminal className="w-3.5 h-3.5 text-emerald-400/70" />
        <span>Benchmark Presets:</span>
      </span>

      {PRESETS.map((preset) => (
        <button
          key={preset.pwd}
          onClick={() => onSelectPreset(preset.pwd)}
          className={`px-3 py-1 rounded text-xs font-mono transition-all duration-150 active:scale-[0.97] flex items-center gap-2 ${
            isMinimal
              ? 'bg-[#EAE5DB] border border-[#D8D2C5] text-[#2C2924] hover:border-[#2C2924] hover:bg-[#F4F1EA]'
              : 'bg-[#0E121B] border border-[#1E2536] text-white/70 hover:text-white hover:border-emerald-500/40 hover:bg-[#121722]'
          }`}
        >
          <span>{preset.label}</span>
          <span
            className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
              isMinimal
                ? 'bg-[#DCD7CD] text-[#2C2924]'
                : 'bg-white/5 border border-white/10 text-white/50'
            }`}
          >
            {preset.tag}
          </span>
        </button>
      ))}
    </div>
  );
}
