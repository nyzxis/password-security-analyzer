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

  return (
    <div
      className={`min-h-[100dvh] flex flex-col antialiased transition-colors duration-300 ${
        isMinimal
          ? 'bg-[#F7F6F3] text-[#111111] selection:bg-[#E1F3FE] selection:text-[#1F6C9F] font-sans-clean'
          : 'bg-[#07090E] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200'
      }`}
    >
      {/* Background Cyber Grid */}
      {!isMinimal && (
        <div className="fixed inset-0 cyber-grid-bg opacity-30 pointer-events-none z-0" />
      )}

      {/* Top Ambient Glow */}
      {!isMinimal && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[750px] h-[300px] bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none z-0" />
      )}

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
            isMinimal ? 'border-b border-[#EAEAEA]' : 'border-b border-white/10'
          }`}
        >
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-2.5 ${
                isMinimal
                  ? 'border border-[#EAEAEA] bg-white text-[#787774]'
                  : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>CSPRNG ENTROPY MATRIX • HIBP K-ANONYMITY TELEMETRY</span>
            </div>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
                isMinimal ? 'font-serif-editorial text-[#111111]' : 'font-mono text-white'
              }`}
            >
              Password Security Analyzer
            </h1>

            <p
              className={`text-xs sm:text-sm mt-1.5 max-w-[65ch] leading-relaxed ${
                isMinimal ? 'text-[#787774]' : 'text-white/50 font-mono'
              }`}
            >
              Real-time entropy modeling, brute-force crack time simulation, and Troy Hunt k-Anonymity breach detection.
            </p>
          </div>

          <div
            className={`hidden md:flex flex-col items-end text-right text-xs font-mono p-3 rounded-xl border ${
              isMinimal ? 'bg-white border-[#EAEAEA] text-[#787774]' : 'bg-white/5 border-white/10 text-white/50'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-white mb-0.5">
              <Shield className={`w-3.5 h-3.5 ${isMinimal ? 'text-[#111111]' : 'text-emerald-400'}`} />
              <span className={isMinimal ? 'text-[#111111]' : 'text-white'}>Zero-Knowledge Pipeline</span>
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
        className={`relative z-10 py-6 text-center font-mono text-xs transition-colors ${
          isMinimal
            ? 'border-t border-[#EAEAEA] bg-[#FBFBFA] text-[#787774]'
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
