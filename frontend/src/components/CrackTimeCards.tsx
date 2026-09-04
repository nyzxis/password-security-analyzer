import React from 'react';
import { Clock, Globe, Cpu, Server, Shield, Sparkles } from 'lucide-react';
import { CrackTimes } from '../lib/clientAnalyzer';

interface CrackTimeCardsProps {
  crackTimes: CrackTimes;
  score: number;
  theme?: 'cyber' | 'minimalist';
}

export default function CrackTimeCards({
  crackTimes,
  score,
  theme = 'cyber',
}: CrackTimeCardsProps) {
  const isMinimal = theme === 'minimalist';

  const scenarios = [
    {
      title: 'ONLINE THROTTLED',
      subtitle: 'Web Login with CAPTCHA / Rate-Limit',
      speed: '100 attempts / hour',
      time: crackTimes.online_throttled,
      icon: Globe,
      cyberColor: 'text-cyan-400',
      minimalBadge: 'bg-[#E1F3FE] text-[#1F6C9F]',
    },
    {
      title: 'ONLINE UNTHROTTLED',
      subtitle: 'Unprotected API or Botnet Attack',
      speed: '10 attempts / second',
      time: crackTimes.online_unthrottled,
      icon: Server,
      cyberColor: 'text-indigo-400',
      minimalBadge: 'bg-[#EBF8FF] text-[#2B6CB0]',
    },
    {
      title: 'OFFLINE SLOW HASH',
      subtitle: 'Salted bcrypt / Argon2id Database',
      speed: '10,000 guesses / sec',
      time: crackTimes.offline_slow_hash,
      icon: Shield,
      cyberColor: 'text-amber-400',
      minimalBadge: 'bg-[#FBF3DB] text-[#956400]',
    },
    {
      title: 'OFFLINE GPU CLUSTER',
      subtitle: '8x NVIDIA RTX 4090 / MD5 / NTLM',
      speed: '100,000,000,000 guesses / sec',
      time: crackTimes.offline_fast_gpu,
      icon: Cpu,
      cyberColor: 'text-rose-400',
      minimalBadge: 'bg-[#FDEBEC] text-[#9F2F2D]',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
            isMinimal ? 'text-[#787774]' : 'text-cyan-400'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>BRUTE-FORCE CRACK TIME SIMULATOR</span>
        </div>

        <span
          className={`text-[11px] font-mono ${
            isMinimal ? 'text-[#787774]' : 'text-white/40'
          }`}
        >
          4 Threat Vectors
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          return (
            <div
              key={sc.title}
              className={`rounded-2xl p-4.5 transition-all duration-300 ${
                isMinimal
                  ? 'bg-white border border-[#EAEAEA] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#111111]/30'
                  : 'bg-[#0a0d16]/80 border border-white/10 backdrop-blur-xl hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className={`p-2 rounded-xl ${
                    isMinimal
                      ? 'bg-[#F7F6F3] text-[#111111]'
                      : 'bg-white/5 text-white/80 border border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isMinimal ? sc.minimalBadge : 'bg-white/5 text-white/40'
                  }`}
                >
                  {sc.speed}
                </span>
              </div>

              <div className="text-[10px] uppercase font-mono tracking-wider text-white/40 mb-1">
                <span className={isMinimal ? 'text-[#787774]' : 'text-white/40'}>
                  {sc.title}
                </span>
              </div>

              <div
                className={`text-base sm:text-lg font-bold font-mono tracking-tight my-1 truncate ${
                  isMinimal ? 'text-[#111111]' : 'text-white'
                }`}
                title={sc.time}
              >
                {sc.time}
              </div>

              <p
                className={`text-[11px] font-mono line-clamp-1 ${
                  isMinimal ? 'text-[#787774]' : 'text-white/40'
                }`}
              >
                {sc.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
