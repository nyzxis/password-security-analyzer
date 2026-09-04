import hashlib
import httpx
from typing import Dict, Any

HIBP_API_URL = "https://api.pwnedpasswords.com/range/"

# In-memory LRU cache to avoid duplicate API calls
_HIBP_CACHE: Dict[str, Dict[str, int]] = {}

async def query_hibp_range(prefix: str) -> Dict[str, int]:
    """
    Queries HaveIBeenPwned API for all 35-character SHA-1 suffixes
    matching the given 5-character prefix.
    """
    prefix = prefix.upper()
    if prefix in _HIBP_CACHE:
        return _HIBP_CACHE[prefix]

    url = f"{HIBP_API_URL}{prefix}"
    headers = {
        "User-Agent": "Password-Security-Analyzer/1.0 (Zero-Knowledge k-Anonymity Audit)",
        "Add-Padding": "true"  # Prevents response size side-channel leakage
    }

    try:
        async with httpx.AsyncClient(timeout=6.0) as client:
            resp = await client.get(url, headers=headers)
            if resp.status_code != 200:
                return {}

            suffix_map = {}
            for line in resp.text.splitlines():
                parts = line.strip().split(":")
                if len(parts) == 2:
                    suffix, count = parts[0].upper(), int(parts[1])
                    suffix_map[suffix] = count

            # Cache up to 1000 prefixes
            if len(_HIBP_CACHE) > 1000:
                _HIBP_CACHE.clear()
            _HIBP_CACHE[prefix] = suffix_map
            return suffix_map
    except Exception as e:
        print(f"[HIBP Warning] Failed to query HIBP range {prefix}: {e}")
        return {}

async def check_pwned_password(password: str) -> Dict[str, Any]:
    """
    Computes SHA-1 hash and applies k-Anonymity range lookup against HIBP.
    """
    if not password:
        return {"is_pwned": False, "pwned_count": 0, "status": "empty"}

    sha1_full = hashlib.sha1(password.encode("utf-8")).hexdigest().upper()
    prefix = sha1_full[:5]
    suffix = sha1_full[5:]

    suffix_map = await query_hibp_range(prefix)
    pwned_count = suffix_map.get(suffix, 0)

    return {
        "is_pwned": pwned_count > 0,
        "pwned_count": pwned_count,
        "sha1_prefix": prefix,
        "status": "success"
    }

async def check_pwned_hash_prefix(prefix: str, suffix: str) -> Dict[str, Any]:
    """
    Zero-knowledge API: Accepts prefix and suffix from the client,
    meaning the server never receives the plaintext password.
    """
    prefix = prefix.upper().strip()
    suffix = suffix.upper().strip()

    if len(prefix) != 5:
        return {"error": "Prefix must be exactly 5 hex characters", "is_pwned": False, "pwned_count": 0}

    suffix_map = await query_hibp_range(prefix)
    pwned_count = suffix_map.get(suffix, 0)

    return {
        "is_pwned": pwned_count > 0,
        "pwned_count": pwned_count,
        "status": "success"
    }
