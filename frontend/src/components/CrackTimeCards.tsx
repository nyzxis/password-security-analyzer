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
      category: 'AUTHENTICATION DEFENSE',
      subtitle: 'Web Login with CAPTCHA / Rate-Limit',
      speed: '100 / hour',
      time: crackTimes.online_throttled,
      icon: Globe,
      cyberColor: 'text-cyan-400',
      cyberGlow: 'hover:border-cyan-500/30',
      minimalBadge: 'bg-[#E1F3FE] text-[#1F6C9F] border-[#BEE3F8]',
    },
    {
      title: 'ONLINE UNTHROTTLED',
      category: 'EXPOSED ENDPOINT',
      subtitle: 'Unprotected API or Botnet Attack',
      speed: '10 / second',
      time: crackTimes.online_unthrottled,
      icon: Server,
      cyberColor: 'text-indigo-400',
      cyberGlow: 'hover:border-indigo-500/30',
      minimalBadge: 'bg-[#EBF8FF] text-[#2B6CB0] border-[#BEE3F8]',
    },
    {
      title: 'OFFLINE SLOW HASH',
      category: 'LEAKED DATABASE',
      subtitle: 'Salted bcrypt / Argon2id Database',
      speed: '10k / sec',
      time: crackTimes.offline_slow_hash,
      icon: Shield,
      cyberColor: 'text-amber-400',
      cyberGlow: 'hover:border-amber-500/30',
      minimalBadge: 'bg-[#FBF3DB] text-[#956400] border-[#F5E79E]',
    },
    {
      title: 'OFFLINE GPU CLUSTER',
      category: 'RIG PENETRATION',
      subtitle: '8x NVIDIA RTX 4090 / MD5 / NTLM',
      speed: '100B / sec',
      time: crackTimes.offline_fast_gpu,
      icon: Cpu,
      cyberColor: 'text-rose-400',
      cyberGlow: 'hover:border-rose-500/30',
      minimalBadge: 'bg-[#FDEBEC] text-[#9F2F2D] border-[#F8D7DA]',
    },
  ];

  return (
    <div className="space-y-3.5">
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
          className={`text-[11px] font-mono px-2 py-0.5 rounded ${
            isMinimal ? 'bg-[#F7F6F3] text-[#787774] border border-[#EAEAEA]' : 'bg-white/5 text-white/40 border border-white/10'
          }`}
        >
          4 Threat Scenarios
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          return (
            <div
              key={sc.title}
              className={`rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between ${
                isMinimal
                  ? 'minimalist-card hover:border-[#111111]/40 hover:-translate-y-0.5'
                  : `glass-panel-interactive ${sc.cyberGlow}`
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-xl transition-transform group-hover:scale-105 ${
                      isMinimal
                        ? 'bg-[#F7F6F3] text-[#111111]'
                        : 'bg-white/5 text-white/90 border border-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                      isMinimal ? sc.minimalBadge : 'bg-white/5 text-white/50 border-white/10'
                    }`}
                  >
                    {sc.speed}
                  </span>
                </div>

                <div className="text-[10px] uppercase font-mono tracking-wider mb-1">
                  <span className={isMinimal ? 'text-[#787774]' : 'text-white/40'}>
                    {sc.title}
                  </span>
                </div>

                <div
                  className={`text-lg sm:text-xl font-bold font-mono tracking-tight my-1.5 truncate tabular-nums ${
                    isMinimal ? 'text-[#111111]' : 'text-white'
                  }`}
                  title={sc.time}
                >
                  {sc.time}
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-white/10 mt-2">
                <p
                  className={`text-[11px] font-mono line-clamp-1 ${
                    isMinimal ? 'text-[#787774]' : 'text-white/45'
                  }`}
                >
                  {sc.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
