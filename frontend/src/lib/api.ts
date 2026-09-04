import { evaluatePassword, AnalysisResult } from './clientAnalyzer';
import { checkPasswordBreach, PwnedCheckResult } from './hibpClient';

const viteApiUrl = (import.meta as any)?.env?.VITE_API_URL;
const API_BASE = viteApiUrl ? `${viteApiUrl.replace(/\/$/, '')}/api` : '/api';

export interface HealthResponse {
  status: string;
  service: string;
  engine: string;
  version: string;
  features: string[];
}

export interface GenerateOptions {
  mode: 'random' | 'passphrase';
  length?: number;
  include_upper?: boolean;
  include_lower?: boolean;
  include_digits?: boolean;
  include_symbols?: boolean;
  word_count?: number;
  separator?: string;
  capitalize?: boolean;
}

export interface GenerateResponse {
  password: string;
  mode: string;
  analysis: AnalysisResult;
}

export async function checkHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
  if (!res.ok) throw new Error('Health check failed');
  return res.json();
}

export async function analyzePassword(password: string): Promise<AnalysisResult> {
  try {
    const res = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Fall back to client-side engine if backend is offline or on standalone static host
  }

  return evaluatePassword(password);
}

export async function checkBreach(password: string): Promise<PwnedCheckResult> {
  // Directly execute client-side k-Anonymity HIBP lookup so password never leaves browser
  return checkPasswordBreach(password);
}

export async function generatePassword(options: GenerateOptions): Promise<GenerateResponse> {
  try {
    const res = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Fallback client generation
  }

  // Client-side fallback generation
  const words = [
    'acorn', 'almond', 'anchor', 'anthem', 'apron', 'archer', 'arrow', 'atlas', 'autumn', 'badge',
    'baker', 'bamboo', 'banner', 'barrel', 'beacon', 'beetle', 'breeze', 'bridge', 'bronze', 'bubble',
    'cabin', 'cactus', 'camel', 'candle', 'canyon', 'carpet', 'castle', 'cedar', 'cipher', 'circus',
    'cliff', 'clover', 'cobalt', 'coffee', 'comet', 'copper', 'coral', 'cosmos', 'cradle', 'crater',
    'crystal', 'dagger', 'daisy', 'delta', 'desert', 'diamond', 'dolphin', 'dragon', 'drift', 'eagle',
    'echo', 'ember', 'emerald', 'falcon', 'fathom', 'feather', 'flame', 'forest', 'fossil', 'fox'
  ];

  let generated = '';
  if (options.mode === 'passphrase') {
    const count = options.word_count || 4;
    const chosen: string[] = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * words.length);
      const w = words[idx];
      chosen.push(options.capitalize !== false ? w.charAt(0).toUpperCase() + w.slice(1) : w);
    }
    if (options.include_digits !== false) {
      chosen.push(String(Math.floor(Math.random() * 90) + 10));
    }
    generated = chosen.join(options.separator || '-');
  } else {
    const len = options.length || 16;
    let pool = '';
    if (options.include_lower !== false) pool += 'abcdefghijklmnopqrstuvwxyz';
    if (options.include_upper !== false) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.include_digits !== false) pool += '0123456789';
    if (options.include_symbols !== false) pool += '!@#$%^&*()-_=+[]{}|;:,.<>?';
    if (!pool) pool = 'abcdefghijklmnopqrstuvwxyz0123456789';

    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    for (let i = 0; i < len; i++) {
      generated += pool[arr[i] % pool.length];
    }
  }

  return {
    password: generated,
    mode: options.mode,
    analysis: evaluatePassword(generated),
  };
}
