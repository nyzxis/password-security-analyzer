/**
 * High-Performance Client-Side Entropy & Vulnerability Analyzer
 * Runs instantly in the browser for 0ms typing latency.
 */

export interface CrackTimes {
  online_throttled: string;
  online_unthrottled: string;
  offline_slow_hash: string;
  offline_fast_gpu: string;
}

export interface AnalysisResult {
  password_length: number;
  entropy_bits: number;
  raw_entropy: number;
  score: number; // 0 to 4
  verdict: 'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Titanium';
  charset_size: number;
  has_lower: boolean;
  has_upper: boolean;
  has_digits: boolean;
  has_symbols: boolean;
  vulnerabilities: string[];
  suggestions: string[];
  crack_times: CrackTimes;
}

const COMMON_WORDS = [
  'password', 'admin', 'welcome', 'monkey', 'dragon', 'master', 'sunshine',
  'princess', 'football', 'baseball', 'iloveyou', 'superman', 'computer',
  'secret', 'shadow', 'winter', 'summer', 'autumn', 'spring', 'orange',
  'purple', 'freedom', 'trustno1', 'starwars', 'pokemon', 'access',
  'login', 'security', 'charlie', 'michelle', 'jessica', 'daniel', 'thomas'
];

const KEYBOARD_WALKS = [
  'qwertyuiop', 'asdfghjkl', 'zxcvbnm',
  'qwertzuiop', 'azertyuiop',
  '1234567890', '0987654321',
  'poiuytrewq', 'lkjhgfdsa', 'mnbvcxz',
  'qazwsxedc', 'wsxedcrfv', 'rfvtgbyhn'
];

const LEET_MAP: Record<string, string> = {
  '@': 'a', '4': 'a',
  '8': 'b',
  '(': 'c', '<': 'c',
  '3': 'e',
  '9': 'g',
  '#': 'h',
  '!': 'i', '1': 'i', '|': 'i',
  '0': 'o',
  '5': 's', '$': 's',
  '7': 't', '+': 't',
  '2': 'z'
};

function normalizeLeet(text: string): string {
  return text.toLowerCase().split('').map((c) => LEET_MAP[c] || c).join('');
}

function formatDuration(seconds: number): string {
  if (seconds < 0.001) return 'Instant (< 1 ms)';
  if (seconds < 1) return `${Math.round(seconds * 1000)} ms`;
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) {
    const mins = Math.round(seconds / 60);
    return `${mins} minute${mins !== 1 ? 's' : ''}`;
  }
  if (seconds < 86400) {
    const hours = Math.round(seconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  if (seconds < 31536000) {
    const days = Math.round(seconds / 86400);
    return `${days} day${days !== 1 ? 's' : ''}`;
  }
  if (seconds < 31536000 * 100) {
    const years = Math.round(seconds / 31536000);
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  if (seconds < 31536000 * 10000) {
    const centuries = Math.round(seconds / (31536000 * 100));
    return `${centuries.toLocaleString()} centuries`;
  }
  if (seconds < 31536000 * 1e9) {
    const millions = Math.round(seconds / (31536000 * 1e6));
    return `${millions.toLocaleString()} million years`;
  }
  if (seconds < 31536000 * 1e12) {
    const billions = Math.round(seconds / (31536000 * 1e9));
    return `${billions.toLocaleString()} billion years`;
  }
  const trillions = Math.round(seconds / (31536000 * 1e12));
  return `${trillions.toLocaleString()} trillion years`;
}

export function evaluatePassword(password: string): AnalysisResult {
  if (!password) {
    return {
      password_length: 0,
      entropy_bits: 0,
      raw_entropy: 0,
      score: 0,
      verdict: 'Very Weak',
      charset_size: 0,
      has_lower: false,
      has_upper: false,
      has_digits: false,
      has_symbols: false,
      vulnerabilities: ['No password entered yet'],
      suggestions: ['Enter a password of at least 12 characters combining letters, numbers, and symbols.'],
      crack_times: {
        online_throttled: 'Instant',
        online_unthrottled: 'Instant',
        offline_slow_hash: 'Instant',
        offline_fast_gpu: 'Instant',
      },
    };
  }

  const length = password.length;
  const has_lower = /[a-z]/.test(password);
  const has_upper = /[A-Z]/.test(password);
  const has_digits = /[0-9]/.test(password);
  const has_symbols = /[^a-zA-Z0-9]/.test(password);

  let charset_size = 0;
  if (has_lower) charset_size += 26;
  if (has_upper) charset_size += 26;
  if (has_digits) charset_size += 10;
  if (has_symbols) charset_size += 33;

  const raw_entropy = length * (charset_size > 0 ? Math.log2(charset_size) : 0);

  const vulnerabilities: string[] = [];
  const suggestions: string[] = [];
  let penalty_bits = 0.0;

  // Length checks
  if (length < 8) {
    vulnerabilities.push('Critically short length (< 8 characters)');
    suggestions.push('Expand password length to at least 12–16 characters.');
    penalty_bits += 15.0;
  } else if (length < 12) {
    vulnerabilities.push('Sub-optimal length (recommended: 12+ characters)');
    suggestions.push('Add 3–5 more characters to vastly multiply key entropy.');
    penalty_bits += 5.0;
  }

  // Character class variety
  const missing: string[] = [];
  if (!has_lower) missing.push('lowercase');
  if (!has_upper) missing.push('uppercase');
  if (!has_digits) missing.push('numbers');
  if (!has_symbols) missing.push('special symbols');

  if (missing.length > 0) {
    vulnerabilities.push(`Missing character variety: ${missing.join(', ')}`);
    suggestions.push(`Add ${missing.join(', ')} to increase character pool.`);
  }

  // Repeating characters
  const repeats = password.match(/(.)\1{2,}/g);
  if (repeats) {
    vulnerabilities.push("Contains repeated identical characters (e.g., 'aaa')");
    penalty_bits += 8.0 * repeats.length;
  }

  // Sequential chars
  const lower = password.toLowerCase();
  for (let i = 0; i < lower.length - 2; i++) {
    const chunk = lower.substring(i, i + 3);
    if (/^\d{3}$/.test(chunk) && ('0123456789'.includes(chunk) || '9876543210'.includes(chunk))) {
      vulnerabilities.push(`Sequential number run: '${chunk}'`);
      penalty_bits += 10.0;
      break;
    } else if (/^[a-z]{3}$/.test(chunk) && ('abcdefghijklmnopqrstuvwxyz'.includes(chunk) || 'zyxwvutsrqponmlkjihgfedcba'.includes(chunk))) {
      vulnerabilities.push(`Sequential alphabet sequence: '${chunk}'`);
      penalty_bits += 10.0;
      break;
    }
  }

  // Keyboard walks
  for (const walk of KEYBOARD_WALKS) {
    for (let i = 0; i < walk.length - 3; i++) {
      const sub = walk.substring(i, i + 4);
      if (lower.includes(sub)) {
        vulnerabilities.push(`Keyboard pattern walk detected: '${sub}'`);
        penalty_bits += 14.0;
        break;
      }
    }
  }

  // Dictionary words and leet
  const normalized = normalizeLeet(password);
  for (const w of COMMON_WORDS) {
    if (lower.includes(w)) {
      vulnerabilities.push(`Common dictionary word found: '${w}'`);
      penalty_bits += 18.0;
      break;
    } else if (normalized.includes(w)) {
      vulnerabilities.push(`Leetspeak variation of common word: '${w}'`);
      penalty_bits += 14.0;
      break;
    }
  }

  // Year or date
  const yearMatch = password.match(/(19\d\d|20\d\d)/);
  if (yearMatch) {
    vulnerabilities.push(`Year or date pattern detected: '${yearMatch[0]}'`);
    penalty_bits += 8.0;
  }

  const effective_entropy = Math.max(0, Math.round((raw_entropy - penalty_bits) * 10) / 10);

  let score = 0;
  let verdict: 'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Titanium' = 'Very Weak';

  if (effective_entropy < 28 || length < 8) {
    score = 0;
    verdict = 'Very Weak';
  } else if (effective_entropy < 45) {
    score = 1;
    verdict = 'Weak';
  } else if (effective_entropy < 60) {
    score = 2;
    verdict = 'Moderate';
  } else if (effective_entropy < 80) {
    score = 3;
    verdict = 'Strong';
  } else {
    score = 4;
    verdict = 'Titanium';
  }

  const search_space = Math.pow(2, Math.min(effective_entropy, 256));
  const avg_guesses = search_space / 2.0;

  const crack_times: CrackTimes = {
    online_throttled: formatDuration(avg_guesses / (100.0 / 3600.0)),
    online_unthrottled: formatDuration(avg_guesses / 10.0),
    offline_slow_hash: formatDuration(avg_guesses / 10000.0),
    offline_fast_gpu: formatDuration(avg_guesses / 100000000000.0),
  };

  if (suggestions.length === 0 && score < 4) {
    suggestions.push('Combine 4 or more random unrelated words for high-entropy memorability.');
  }

  return {
    password_length: length,
    entropy_bits: effective_entropy,
    raw_entropy: Math.round(raw_entropy * 10) / 10,
    score,
    verdict,
    charset_size,
    has_lower,
    has_upper,
    has_digits,
    has_symbols,
    vulnerabilities,
    suggestions,
    crack_times,
  };
}
