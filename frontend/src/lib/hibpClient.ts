/**
 * Zero-Knowledge HaveIBeenPwned k-Anonymity Client
 *
 * Uses the Web Crypto API to compute SHA-1 locally in the browser.
 * ONLY the first 5 characters of the hash are sent to the HIBP API.
 * The remaining 35 characters are compared locally.
 * Plaintext passwords NEVER touch any network wire.
 */

const HIBP_CACHE = new Map<string, Map<string, number>>();

async function sha1Hex(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export interface PwnedCheckResult {
  isPwned: boolean;
  pwnedCount: number;
  hashPrefix: string;
  error?: string;
}

export async function checkPasswordBreach(password: string): Promise<PwnedCheckResult> {
  if (!password || password.trim().length === 0) {
    return { isPwned: false, pwnedCount: 0, hashPrefix: '' };
  }

  try {
    const fullHash = await sha1Hex(password);
    const prefix = fullHash.substring(0, 5);
    const suffix = fullHash.substring(5);

    let suffixMap = HIBP_CACHE.get(prefix);

    if (!suffixMap) {
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
        headers: {
          'Add-Padding': 'true', // Mitigates response length side-channel attacks
        },
      });

      if (!response.ok) {
        throw new Error(`HIBP API responded with HTTP ${response.status}`);
      }

      const bodyText = await response.text();
      suffixMap = new Map<string, number>();

      for (const line of bodyText.split('\n')) {
        const parts = line.trim().split(':');
        if (parts.length === 2) {
          const s = parts[0].toUpperCase();
          const count = parseInt(parts[1], 10);
          suffixMap.set(s, count);
        }
      }

      // Keep cache size bounded
      if (HIBP_CACHE.size > 500) {
        HIBP_CACHE.clear();
      }
      HIBP_CACHE.set(prefix, suffixMap);
    }

    const matchCount = suffixMap.get(suffix) || 0;

    return {
      isPwned: matchCount > 0,
      pwnedCount: matchCount,
      hashPrefix: prefix,
    };
  } catch (err: any) {
    console.warn('[HIBP] Range lookup failed or was throttled:', err.message);
    return {
      isPwned: false,
      pwnedCount: 0,
      hashPrefix: '',
      error: 'Breach verification service unavailable',
    };
  }
}
