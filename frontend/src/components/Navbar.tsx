import React from 'react';
import { KeyRound, Shield, Sun, Moon, Github, Lock } from 'lucide-react';

interface NavbarProps {
  systemOnline: boolean;
  engineName: string;
  theme: 'cyber' | 'minimalist';
  onToggleTheme: () => void;
}

export default function Navbar({
  systemOnline,
  engineName,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const isMinimal = theme === 'minimalist';

  return (
    <header className="sticky top-4 sm:top-6 z-50 px-4 sm:px-6 w-full max-w-6xl mx-auto transition-all duration-500">
      <nav
        className={`w-full px-4 sm:px-6 py-3 rounded-full flex items-center justify-between gap-4 transition-all duration-500 ${
          isMinimal
            ? 'bg-[#FBFBFA]/90 border border-[#EAEAEA] backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
            : 'glass-panel shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isMinimal
                ? 'bg-[#111111] text-white'
                : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`font-bold tracking-tight text-sm ${
                isMinimal ? 'font-sans-clean text-[#111111]' : 'font-mono text-white'
              }`}
            >
              KEYVAULT
            </span>
            <span
              className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded-full ${
                isMinimal
                  ? 'bg-[#EDF3EC] text-[#346538] border border-[#D4EDDA]'
                  : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              }`}
            >
              ZERO-KNOWLEDGE
            </span>
          </div>
        </div>

        {/* Engine Status & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Capsule */}
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono transition-colors ${
              isMinimal
                ? 'bg-[#F7F6F3] text-[#787774] border border-[#EAEAEA]'
                : 'bg-white/5 border border-white/10 text-white/70'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                systemOnline
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-cyan-400'
              }`}
            />
            <span className="text-[10px] uppercase tracking-wider font-semibold">
              {systemOnline ? 'FASTAPI ACTIVE' : 'CLIENT-SIDE SECURE'}
            </span>
          </div>

          {/* Theme Switcher Island */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Minimalist Theme"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all active:scale-95 ${
              isMinimal
                ? 'bg-white border border-[#EAEAEA] text-[#111111] hover:bg-[#F2F1ED] shadow-sm'
                : 'bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            {isMinimal ? (
              <>
                <Moon className="w-3.5 h-3.5 text-[#111111]" />
                <span className="hidden sm:inline">Cyber</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Minimal</span>
              </>
            )}
          </button>

          {/* GitHub Island */}
          <a
            href="https://github.com/nyzxis/password-security-analyzer"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all active:scale-95 ${
              isMinimal
                ? 'bg-[#111111] text-white hover:bg-[#2F3437]'
                : 'bg-white/10 border border-white/15 text-white hover:bg-white/20 hover:border-emerald-500/40'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">nyzxis</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
