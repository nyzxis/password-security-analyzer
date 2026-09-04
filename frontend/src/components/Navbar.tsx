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
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        isMinimal
          ? 'bg-[#FBFBFA]/90 border-b border-[#EAEAEA] backdrop-blur-md'
          : 'bg-[#07090E]/85 border-b border-white/10 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isMinimal
                ? 'bg-[#111111] text-white'
                : 'bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-transparent border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
            }`}
          >
            <KeyRound className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-bold tracking-tight text-sm sm:text-base ${
                  isMinimal ? 'font-sans-clean text-[#111111]' : 'font-mono text-white'
                }`}
              >
                KEYVAULT
              </span>
              <span
                className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${
                  isMinimal
                    ? 'bg-[#EDF3EC] text-[#346538] border border-[#D4EDDA]'
                    : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                }`}
              >
                v1.0 ZERO-KNOWLEDGE
              </span>
            </div>
            <p
              className={`text-[11px] tracking-wider font-mono ${
                isMinimal ? 'text-[#787774]' : 'text-white/40'
              }`}
            >
              CSPRNG ENTROPY &amp; HIBP K-ANONYMITY AUDIT
            </p>
          </div>
        </div>

        {/* Engine Status, Theme Toggle & GitHub */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Status Badge */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono transition-colors ${
              isMinimal
                ? 'bg-[#F7F6F3] text-[#787774] border border-[#EAEAEA]'
                : 'bg-white/5 border border-white/10 text-white/70'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                systemOnline
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-cyan-400'
              }`}
            />
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              {systemOnline ? 'FASTAPI ACTIVE' : 'CLIENT-SIDE SECURE'}
            </span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Minimalist Theme"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all active:scale-[0.97] ${
              isMinimal
                ? 'bg-white border border-[#EAEAEA] text-[#111111] hover:bg-[#F2F1ED] shadow-sm'
                : 'bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            {isMinimal ? (
              <>
                <Moon className="w-3.5 h-3.5 text-[#111111]" />
                <span className="hidden md:inline">Cyber Vault</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Minimalist</span>
              </>
            )}
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/nyzxis/password-security-analyzer"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all active:scale-[0.98] ${
              isMinimal
                ? 'bg-[#111111] text-white hover:bg-[#2F3437]'
                : 'bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-white/10 hover:border-emerald-500/40'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">nyzxis</span>
          </a>
        </div>
      </div>
    </header>
  );
}
