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
      category: 'AUTHENTICATION PERIMETER',
      subtitle: 'CAPTCHA & IP Rate-Limiting Active',
      speed: '100 requests / hour',
      time: crackTimes.online_throttled,
      icon: Globe,
      accentColor: 'text-emerald-400',
      borderGlow: 'hover:border-emerald-500/40',
      minimalBadge: 'bg-[#DEE7DC] text-[#2A522E] border-[#C7D7C4]',
    },
    {
      title: 'ONLINE UNTHROTTLED',
      category: 'EXPOSED API VECTOR',
      subtitle: 'Unprotected Endpoint / Credential Stuffing',
      speed: '10 attempts / second',
      time: crackTimes.online_unthrottled,
      icon: Server,
      accentColor: 'text-cyan-400',
      borderGlow: 'hover:border-cyan-500/40',
      minimalBadge: 'bg-[#DFE7EE] text-[#1E4D6E] border-[#C5D5E2]',
    },
    {
      title: 'OFFLINE SLOW HASH',
      category: 'DATABASE EXFILTRATION',
      subtitle: 'Salted Argon2id / bcrypt Leaked Table',
      speed: '10,000 hashes / sec',
      time: crackTimes.offline_slow_hash,
      icon: Shield,
      accentColor: 'text-amber-400',
      borderGlow: 'hover:border-amber-500/40',
      minimalBadge: 'bg-[#EFE8D6] text-[#78540B] border-[#DFD4BA]',
    },
    {
      title: 'OFFLINE GPU CLUSTER',
      category: 'HARDWARE RIG PENETRATION',
      subtitle: '8x NVIDIA RTX 4090 Array (MD5 / NTLM)',
      speed: '100 Billion hashes / sec',
      time: crackTimes.offline_fast_gpu,
      icon: Cpu,
      accentColor: 'text-rose-400',
      borderGlow: 'hover:border-rose-500/40',
      minimalBadge: 'bg-[#F2DFDE] text-[#862927] border-[#E5C7C5]',
    },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
            isMinimal ? 'text-[#767066]' : 'text-emerald-400'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>BRUTE-FORCE ATTACK SIMULATION // 4 HARDWARE THREAT VECTORS</span>
        </div>

        <span
          className={`text-[11px] font-mono px-2 py-0.5 rounded ${
            isMinimal ? 'bg-[#EAE5DB] text-[#767066] border border-[#D8D2C5]' : 'bg-[#0E121B] text-white/50 border border-[#1E2536]'
          }`}
        >
          FIPS EXHAUSTION
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          return (
            <div
              key={sc.title}
              className={`p-5 rounded-xl transition-all duration-150 flex flex-col justify-between ${
                isMinimal
                  ? 'minimalist-card hover:border-[#2C2924]/40 hover:-translate-y-0.5'
                  : `vault-panel-interactive ${sc.borderGlow}`
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center ${
                      isMinimal
                        ? 'bg-[#EAE5DB] text-[#2C2924]'
                        : 'bg-white/5 text-white/80 border border-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${
                      isMinimal
                        ? sc.minimalBadge
                        : 'bg-white/5 text-white/50 border-white/10'
                    }`}
                  >
                    {sc.speed}
                  </span>
                </div>

                <div className={`text-[10px] font-mono uppercase tracking-wider ${isMinimal ? 'text-[#767066]' : 'text-white/40'}`}>
                  {sc.category}
                </div>
                <h4
                  className={`text-xs font-mono font-bold mt-0.5 ${
                    isMinimal ? 'text-[#2C2924]' : 'text-white'
                  }`}
                >
                  {sc.title}
                </h4>

                <p className={`text-[11px] font-mono mt-1 leading-snug ${isMinimal ? 'text-[#767066]' : 'text-white/50'}`}>
                  {sc.subtitle}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t ${isMinimal ? 'border-[#D8D2C5]' : 'border-white/10'}`}>
                <div className={`text-[9px] font-mono uppercase ${isMinimal ? 'text-[#767066]' : 'text-white/40'}`}>
                  ESTIMATED EXHAUSTION
                </div>
                <div
                  className={`text-base font-mono font-bold mt-0.5 truncate tabular-nums ${
                    isMinimal ? 'text-[#2C2924]' : sc.accentColor
                  }`}
                  title={sc.time}
                >
                  {sc.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
