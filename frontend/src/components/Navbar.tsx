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
    <header className="sticky top-3 sm:top-5 z-50 px-4 sm:px-6 w-full max-w-6xl mx-auto transition-colors duration-150">
      {/* Island Breadcrumb Header */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 px-3.5 py-1.5 mb-2.5 text-[11px] font-mono rounded-xl transition-colors duration-150 ${
          isMinimal
            ? 'bg-[#EAE5DB]/90 border border-[#D8D2C5] text-[#767066]'
            : 'bg-white/5 border border-white/10 text-white/60 backdrop-blur-md'
        }`}
      >
        <div className="flex items-center gap-1.5 flex-wrap">
          <a
            href="https://nyzxis.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors flex items-center gap-1 font-medium ${
              isMinimal ? 'text-[#2C2924] hover:text-[#000]' : 'text-white/80 hover:text-white'
            }`}
          >
            <span>✦ Arfa Danial</span>
            <span className={isMinimal ? 'text-[#767066]' : 'text-white/40'}>/</span>
            <span>Portfolio</span>
          </a>
          <span className={isMinimal ? 'text-[#A0988A]' : 'text-white/30'}>›</span>
          <span className={isMinimal ? 'text-[#5C564C]' : 'text-white/50'}>Cybersecurity Suite</span>
          <span className={isMinimal ? 'text-[#A0988A]' : 'text-white/30'}>›</span>
          <span
            className={`font-semibold flex items-center gap-1 ${
              isMinimal ? 'text-[#2A522E]' : 'text-emerald-400'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${
                isMinimal ? 'bg-[#2A522E]' : 'bg-emerald-400'
              }`}
            ></span>
            KeyVault
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className={isMinimal ? 'text-[#8A8275]' : 'text-white/40'}>Suite:</span>
          <a
            href="https://apishield-pi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isMinimal ? 'text-[#5C564C] hover:text-[#000]' : 'text-white/60 hover:text-white'} transition-colors`}
          >
            APIShield
          </a>
          <span className={isMinimal ? 'text-[#C5BFAF]' : 'text-white/20'}>•</span>
          <a
            href="https://malguard.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isMinimal ? 'text-[#5C564C] hover:text-[#000]' : 'text-white/60 hover:text-white'} transition-colors`}
          >
            MalGuard
          </a>
          <span className={isMinimal ? 'text-[#C5BFAF]' : 'text-white/20'}>•</span>
          <a
            href="https://vulnshield.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isMinimal ? 'text-[#5C564C] hover:text-[#000]' : 'text-white/60 hover:text-white'} transition-colors`}
          >
            VulnShield
          </a>
          <span className={isMinimal ? 'text-[#C5BFAF]' : 'text-white/20'}>•</span>
          <a
            href="https://phishingdetector-nyzxis.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isMinimal ? 'text-[#5C564C] hover:text-[#000]' : 'text-white/60 hover:text-white'} transition-colors`}
          >
            PhishGuard
          </a>
        </div>
      </div>

      <nav
        className={`w-full px-4 sm:px-6 py-3 rounded-full flex items-center justify-between gap-4 transition-colors duration-150 ${
          isMinimal
            ? 'bg-[#F4F1EA]/95 border border-[#D8D2C5] shadow-[0_2px_12px_rgba(44,38,27,0.06)]'
            : 'glass-panel shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 ${
              isMinimal
                ? 'bg-[#2C2924] text-[#F4F1EA]'
                : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`font-bold tracking-tight text-sm ${
                isMinimal ? 'font-sans-clean text-[#2C2924]' : 'font-mono text-white'
              }`}
            >
              KEYVAULT
            </span>
            <span
              className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded-full ${
                isMinimal
                  ? 'bg-[#DEE7DC] text-[#2A522E] border border-[#C7D7C4]'
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
            className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono transition-colors duration-150 ${
              isMinimal
                ? 'bg-[#EAE5DB] text-[#767066] border border-[#D8D2C5]'
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors duration-150 active:scale-95 ${
              isMinimal
                ? 'bg-[#EAE5DB] border border-[#D8D2C5] text-[#2C2924] hover:bg-[#DFDACF]'
                : 'bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            {isMinimal ? (
              <>
                <Moon className="w-3.5 h-3.5 text-[#2C2924]" />
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors duration-150 active:scale-95 ${
              isMinimal
                ? 'bg-[#2C2924] text-[#F4F1EA] hover:bg-[#3D3A34]'
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
