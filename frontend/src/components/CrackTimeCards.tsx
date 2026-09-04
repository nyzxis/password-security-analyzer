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
      minimalBadge: 'bg-[#DFE7EE] text-[#1E4D6E] border-[#C5D5E2]',
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
      minimalBadge: 'bg-[#E3E8F2] text-[#28487A] border-[#CAD5E5]',
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
      minimalBadge: 'bg-[#EFE8D6] text-[#78540B] border-[#DFD4BA]',
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
      minimalBadge: 'bg-[#F2DFDE] text-[#862927] border-[#E5C7C5]',
    },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
            isMinimal ? 'text-[#767066]' : 'text-cyan-400'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>BRUTE-FORCE CRACK TIME SIMULATOR</span>
        </div>

        <span
          className={`text-[11px] font-mono px-2 py-0.5 rounded ${
            isMinimal ? 'bg-[#EAE5DB] text-[#767066] border border-[#D8D2C5]' : 'bg-white/5 text-white/40 border border-white/10'
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
              className={`rounded-2xl p-5 transition-colors duration-150 flex flex-col justify-between ${
                isMinimal
                  ? 'minimalist-card hover:border-[#2C2924]/40 hover:-translate-y-0.5'
                  : `glass-panel-interactive ${sc.cyberGlow}`
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-xl transition-transform group-hover:scale-105 ${
                      isMinimal
                        ? 'bg-[#EAE5DB] text-[#2C2924]'
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
                  <span className={isMinimal ? 'text-[#767066]' : 'text-white/40'}>
                    {sc.title}
                  </span>
                </div>

                <div
                  className={`text-lg sm:text-xl font-bold font-mono tracking-tight my-1.5 truncate tabular-nums ${
                    isMinimal ? 'text-[#2C2924]' : 'text-white'
                  }`}
                  title={sc.time}
                >
                  {sc.time}
                </div>
              </div>

              <div className={`pt-2 border-t border-dashed mt-2 ${isMinimal ? 'border-[#D8D2C5]' : 'border-white/10'}`}>
                <p
                  className={`text-[11px] font-mono line-clamp-1 ${
                    isMinimal ? 'text-[#767066]' : 'text-white/45'
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
