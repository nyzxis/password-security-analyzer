import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

interface PresetsBarProps {
  onSelectPreset: (pwd: string) => void;
  theme?: 'cyber' | 'minimalist';
}

const PRESETS = [
  { label: 'Weak: 123456', pwd: '123456', tag: 'Weak' },
  { label: 'Pwned: password123', pwd: 'password123', tag: 'Breached' },
  { label: 'Substituted: P@ssw0rd2024!', pwd: 'P@ssw0rd2024!', tag: 'Leet' },
  { label: 'Passphrase: Cosmic-Falcon-Beacon-93', pwd: 'Cosmic-Falcon-Beacon-93', tag: 'Diceware' },
  { label: 'Titanium: 9v#K$m8!qZ5*pL2@wR7&', pwd: '9v#K$m8!qZ5*pL2@wR7&', tag: 'Maximum' },
];

export default function PresetsBar({ onSelectPreset, theme = 'cyber' }: PresetsBarProps) {
  const isMinimal = theme === 'minimalist';

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span
        className={`text-xs font-mono flex items-center gap-1.5 mr-1 ${
          isMinimal ? 'text-[#787774]' : 'text-white/40'
        }`}
      >
        <Terminal className="w-3.5 h-3.5" />
        <span>Quick Test Presets:</span>
      </span>

      {PRESETS.map((preset) => (
        <button
          key={preset.label}
          onClick={() => onSelectPreset(preset.pwd)}
          className={`px-3 py-1 rounded-lg text-xs font-mono transition-all active:scale-[0.97] flex items-center gap-1.5 ${
            isMinimal
              ? 'bg-[#FBFBFA] border border-[#EAEAEA] text-[#111111] hover:border-[#111111] hover:bg-white'
              : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-emerald-500/40 hover:bg-white/10'
          }`}
        >
          <span>{preset.label}</span>
        </button>
      ))}
    </div>
  );
}
