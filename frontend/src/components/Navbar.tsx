import React from 'react';
import { KeyRound, Shield, Sun, Moon, Lock, Terminal, Cpu } from 'lucide-react';

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
    <header className="sticky top-3 sm:top-5 z-50 px-3 sm:px-6 w-full max-w-7xl mx-auto transition-colors duration-150">
      {/* Island Breadcrumb Header */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 px-3.5 py-1.5 mb-2.5 text-[11px] font-mono rounded-lg transition-colors duration-150 ${
          isMinimal
            ? 'bg-[#EAE5DB]/90 border border-[#D8D2C5] text-[#767066]'
            : 'bg-[#0D1017]/90 border border-[#1E2536] text-white/60 backdrop-blur-md shadow-sm'
        }`}
      >
        <div className="flex items-center gap-1.5 flex-wrap">
          <a
            href="https://nyzxis.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors flex items-center gap-1 font-medium ${
              isMinimal ? 'text-[#2C2924] hover:text-[#000]' : 'text-emerald-400 hover:text-emerald-300'
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
            className={`font-semibold flex items-center gap-1.5 ${
              isMinimal ? 'text-[#2A522E]' : 'text-white'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full inline-block ${
                isMinimal ? 'bg-[#2A522E]' : 'bg-emerald-400 shadow-[0_0_8px_#10B981]'
              } animate-pulse`}
            />
            <span>KeyVault</span>
            <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isMinimal ? 'bg-[#DEE7DC] text-[#2A522E]' : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'}`}>
              [HSM-ENCLAVE]
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className={isMinimal ? 'text-[#8A8275]' : 'text-white/40'}>Suite:</span>
          <a
            href="https://apishield-pi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isMinimal ? 'text-[#5C564C] hover:text-[#000]' : 'text-white/60 hover:text-amber-400'} transition-colors`}
          >
            APIShield
          </a>
          <span className={isMinimal ? 'text-[#C5BFAF]' : 'text-white/20'}>•</span>
          <a
            href="https://malguard.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isMinimal ? 'text-[#5C564C] hover:text-[#000]' : 'text-white/60 hover:text-lime-400'} transition-colors`}
          >
            MalGuard
          </a>
          <span className={isMinimal ? 'text-[#C5BFAF]' : 'text-white/20'}>•</span>
          <a
            href="https://vulnshield.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isMinimal ? 'text-[#5C564C] hover:text-[#000]' : 'text-white/60 hover:text-blue-400'} transition-colors`}
          >
            VulnShield
          </a>
          <span className={isMinimal ? 'text-[#C5BFAF]' : 'text-white/20'}>•</span>
          <a
            href="https://phishingdetector-nyzxis.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isMinimal ? 'text-[#5C564C] hover:text-[#000]' : 'text-white/60 hover:text-purple-400'} transition-colors`}
          >
            PhishGuard
          </a>
        </div>
      </div>

      <nav
        className={`w-full px-4 sm:px-6 py-3 rounded-xl flex items-center justify-between gap-4 transition-colors duration-150 ${
          isMinimal
            ? 'bg-[#F4F1EA]/95 border border-[#D8D2C5] shadow-[0_2px_12px_rgba(44,38,27,0.06)]'
            : 'bg-[#0B0E15]/95 border border-[#1E2536] shadow-[0_12px_36px_rgba(0,0,0,0.7)] backdrop-blur-md'
        }`}
      >
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 ${
              isMinimal
                ? 'bg-[#2C2924] text-[#F4F1EA]'
                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
            }`}
          >
            <KeyRound className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`font-bold tracking-tight text-sm ${
                isMinimal ? 'font-sans-clean text-[#2C2924]' : 'font-mono text-white tracking-wider'
              }`}
            >
              KEYVAULT
            </span>
            <span
              className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded ${
                isMinimal
                  ? 'bg-[#DEE7DC] text-[#2A522E] border border-[#C7D7C4]'
                  : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              }`}
            >
              ZERO-KNOWLEDGE ENCLAVE
            </span>
          </div>
        </div>

        {/* Engine Status & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Capsule */}
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono transition-colors duration-150 ${
              isMinimal
                ? 'bg-[#EAE5DB] text-[#767066] border border-[#D8D2C5]'
                : 'bg-[#0E121B] border border-[#1E2536] text-white/70'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                systemOnline
                  ? 'bg-emerald-400 shadow-[0_0_6px_#10B981] animate-pulse'
                  : 'bg-emerald-400/60'
              }`}
            />
            <span className="text-[10px] uppercase tracking-wider font-medium">
              {systemOnline ? 'ENCLAVE ENGINE ONLINE' : 'LOCAL ZERO-KNOWLEDGE'}
            </span>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Minimalist Theme"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors duration-150 active:scale-95 ${
              isMinimal
                ? 'bg-[#EAE5DB] border border-[#D8D2C5] text-[#2C2924] hover:bg-[#DFDACF]'
                : 'bg-[#0E121B] border border-[#1E2536] text-white/80 hover:text-white hover:border-emerald-500/30'
            }`}
          >
            {isMinimal ? (
              <>
                <Moon className="w-3.5 h-3.5 text-[#2C2924]" />
                <span className="hidden sm:inline">Enclave</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Minimal</span>
              </>
            )}
          </button>

          {/* GitHub Link with standard SVG */}
          <a
            href="https://github.com/nyzxis/password-security-analyzer"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors duration-150 active:scale-95 ${
              isMinimal
                ? 'bg-[#2C2924] text-[#F4F1EA] hover:bg-[#3D3A34]'
                : 'bg-[#0E121B] border border-[#1E2536] text-white hover:border-emerald-500/40 hover:text-emerald-300'
            }`}
          >
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span className="hidden sm:inline">nyzxis</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
