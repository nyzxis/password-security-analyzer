import React, { useState, useEffect, useRef } from 'react';
import { Shield, KeyRound, Lock, Sparkles, RefreshCw, Cpu, Database, CheckCircle2 } from 'lucide-react';
import Navbar from './components/Navbar';
import PasswordInput from './components/PasswordInput';
import StrengthMeter from './components/StrengthMeter';
import CrackTimeCards from './components/CrackTimeCards';
import BreachAlert from './components/BreachAlert';
import VulnerabilityList from './components/VulnerabilityList';
import PasswordGenerator from './components/PasswordGenerator';
import PresetsBar from './components/PresetsBar';
import CustomCursor from './components/CustomCursor';
import { evaluatePassword, AnalysisResult } from './lib/clientAnalyzer';
import { checkBreach, checkHealth } from './lib/api';
import { PwnedCheckResult } from './lib/hibpClient';

export default function App() {
  const [password, setPassword] = useState('P@ssw0rd2024!');
  const [analysis, setAnalysis] = useState<AnalysisResult>(() => evaluatePassword('P@ssw0rd2024!'));
  const [breachResult, setBreachResult] = useState<PwnedCheckResult | null>(null);
  const [checkingBreach, setCheckingBreach] = useState(false);
  const [systemOnline, setSystemOnline] = useState(false);
  const [engineName, setEngineName] = useState('LOCAL ZERO-KNOWLEDGE');

  const [theme, setTheme] = useState<'cyber' | 'minimalist'>(() => {
    const saved = localStorage.getItem('keyvault_theme');
    return saved === 'minimalist' || saved === 'cyber' ? saved : 'cyber';
  });

  const isMinimal = theme === 'minimalist';
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'cyber' ? 'minimalist' : 'cyber';
      localStorage.setItem('keyvault_theme', next);
      return next;
    });
  };

  // Immediate synchronous entropy evaluation
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    const res = evaluatePassword(newPassword);
    setAnalysis(res);

    if (!newPassword.trim()) {
      setBreachResult(null);
      setCheckingBreach(false);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      return;
    }

    // Debounced zero-knowledge k-Anonymity breach check
    setCheckingBreach(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const pwned = await checkBreach(newPassword);
        setBreachResult(pwned);
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingBreach(false);
      }
    }, 400);
  };

  // Health check on mount
  useEffect(() => {
    async function checkApi() {
      try {
        const h = await checkHealth();
        setSystemOnline(h.status === 'online');
        setEngineName(h.engine);
      } catch {
        setSystemOnline(false);
        setEngineName('CLIENT-SIDE SECURE');
      }
    }
    checkApi();
    handlePasswordChange(password);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Sync theme attribute/class and system color-scheme on document root for custom scrollbars
  useEffect(() => {
    document.documentElement.classList.toggle('theme-minimalist', isMinimal);
    document.body.classList.toggle('theme-minimalist', isMinimal);
    document.documentElement.style.colorScheme = isMinimal ? 'light' : 'dark';
    document.documentElement.style.backgroundColor = isMinimal ? '#EBE7DF' : '#07090E';
    document.body.style.backgroundColor = isMinimal ? '#EBE7DF' : '#07090E';

    const metaTheme = document.getElementById('meta-theme-color');
    if (metaTheme) {
      metaTheme.setAttribute('content', isMinimal ? '#EBE7DF' : '#07090E');
    }
  }, [isMinimal]);

  return (
    <div
      className={`min-h-[100dvh] flex flex-col antialiased transition-colors duration-150 ${
        isMinimal
          ? 'bg-[#EBE7DF] text-[#2C2924] selection:bg-[#DEE7DC] selection:text-[#2A522E] font-sans-clean theme-minimalist'
          : 'bg-[#07090E] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200'
      }`}
    >
      {/* Custom Precision Hardware Cursor */}
      <CustomCursor theme={theme} />

      {/* Background Cyber Grid - persistent GPU layer, zero unmount penalty */}
      <div
        className={`fixed inset-0 cyber-grid-bg pointer-events-none z-0 transition-opacity duration-200 ${
          isMinimal ? 'opacity-0' : 'opacity-35'
        }`}
        style={{ willChange: 'opacity' }}
      />

      {/* Top Ambient Glow - pure CSS radial gradient (0ms GPU blur computation) */}
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12)_0%,rgba(6,182,212,0.04)_50%,transparent_70%)] pointer-events-none z-0 transition-opacity duration-200 ${
          isMinimal ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ willChange: 'opacity' }}
      />

      {/* Navigation */}
      <Navbar
        systemOnline={systemOnline}
        engineName={engineName}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">
        {/* Top Hero / Intro Banner */}
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 ${
            isMinimal ? 'border-b border-[#D8D2C5]' : 'border-b border-white/10'
          }`}
        >
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-2.5 ${
                isMinimal
                  ? 'border border-[#D8D2C5] bg-[#F4F1EA] text-[#767066]'
                  : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>CSPRNG ENTROPY MATRIX • HIBP K-ANONYMITY TELEMETRY</span>
            </div>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] ${
                isMinimal ? 'font-serif-editorial text-[#2C2924]' : 'font-mono text-white'
              }`}
              style={{ textWrap: 'balance' }}
            >
              Password Security Analyzer
            </h1>

            <p
              className={`text-xs sm:text-sm mt-1.5 max-w-[65ch] leading-relaxed ${
                isMinimal ? 'text-[#767066]' : 'text-white/50 font-mono'
              }`}
              style={{ textWrap: 'pretty' }}
            >
              Real-time entropy modeling, brute-force crack time simulation, and Troy Hunt k-Anonymity breach detection.
            </p>
          </div>

          <div
            className={`hidden md:flex flex-col items-end text-right text-xs font-mono p-3.5 rounded-xl border ${
              isMinimal ? 'minimalist-card text-[#767066]' : 'glass-panel text-white/50'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold mb-0.5">
              <Shield className={`w-3.5 h-3.5 ${isMinimal ? 'text-[#2C2924]' : 'text-emerald-400'}`} />
              <span className={isMinimal ? 'text-[#2C2924]' : 'text-white'}>Zero-Knowledge Pipeline</span>
            </div>
            <span>Passcode never sent unhashed</span>
          </div>
        </div>

        {/* Tactile Password Input Field */}
        <PasswordInput
          value={password}
          onChange={handlePasswordChange}
          theme={theme}
        />

        {/* Quick Test Presets Bar */}
        <PresetsBar
          onSelectPreset={handlePasswordChange}
          theme={theme}
        />

        {/* HaveIBeenPwned Breach Alert Status */}
        <BreachAlert
          breachResult={breachResult}
          loading={checkingBreach}
          hasInput={Boolean(password)}
          theme={theme}
        />

        {/* Real-time Strength Meter & Entropy Breakdown */}
        <StrengthMeter
          analysis={analysis}
          theme={theme}
        />

        {/* Crack Time Simulation Cards (4 hardware tiers) */}
        <CrackTimeCards
          crackTimes={analysis.crack_times}
          score={analysis.score}
          theme={theme}
        />

        {/* Vulnerabilities & Remediation Directives */}
        <VulnerabilityList
          vulnerabilities={analysis.vulnerabilities}
          suggestions={analysis.suggestions}
          hasInput={Boolean(password)}
          theme={theme}
        />

        {/* Smart Cryptographic Password Generator & Hardener */}
        <PasswordGenerator
          onApplyPassword={handlePasswordChange}
          theme={theme}
        />
      </main>

      {/* Footer */}
      <footer
        className={`relative z-10 py-6 text-center font-mono text-xs transition-colors duration-150 ${
          isMinimal
            ? 'border-t border-[#D8D2C5] bg-[#E2DDD5] text-[#767066]'
            : 'border-t border-white/10 text-white/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Password Security Analyzer • Built by Arfa Danial</span>
          <span>Stack: Python • FastAPI • React 19 • Tailwind CSS • HaveIBeenPwned API</span>
        </div>
      </footer>
    </div>
  );
}
