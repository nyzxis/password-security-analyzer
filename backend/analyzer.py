import math
import re
import string
from typing import Dict, List, Any

# Common dictionary words and popular password fragments to check
COMMON_DICTIONARY_WORDS = [
    "password", "admin", "welcome", "monkey", "dragon", "master", "sunshine",
    "princess", "football", "baseball", "iloveyou", "superman", "computer",
    "secret", "shadow", "winter", "summer", "autumn", "spring", "orange",
    "purple", "freedom", "trustno1", "starwars", "pokemon", "access",
    "login", "security", "charlie", "michelle", "jessica", "daniel", "thomas"
]

KEYBOARD_WALKS = [
    "qwertyuiop", "asdfghjkl", "zxcvbnm",
    "qwertzuiop", "azertyuiop",
    "1234567890", "0987654321",
    "poiuytrewq", "lkjhgfdsa", "mnbvcxz",
    "qazwsxedc", "wsxedcrfv", "rfvtgbyhn"
]

LEET_REPLACEMENTS = {
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
}

def normalize_leetspeak(text: str) -> str:
    """Converts common leetspeak substitutions back to Latin characters."""
    normalized = []
    for char in text.lower():
        normalized.append(LEET_REPLACEMENTS.get(char, char))
    return "".join(normalized)

def format_duration(seconds: float) -> str:
    """Converts a duration in seconds into a human-readable string."""
    if seconds < 0.001:
        return "Instant (< 1 ms)"
    elif seconds < 1:
        return f"{round(seconds * 1000)} ms"
    elif seconds < 60:
        return f"{round(seconds, 1)} seconds"
    elif seconds < 3600:
        mins = round(seconds / 60)
        return f"{mins} minute{'s' if mins != 1 else ''}"
    elif seconds < 86400:
        hours = round(seconds / 3600)
        return f"{hours} hour{'s' if hours != 1 else ''}"
    elif seconds < 31536000:
        days = round(seconds / 86400)
        return f"{days} day{'s' if days != 1 else ''}"
    elif seconds < 31536000 * 100:
        years = round(seconds / 31536000)
        return f"{years} year{'s' if years != 1 else ''}"
    elif seconds < 31536000 * 10000:
        centuries = round(seconds / (31536000 * 100))
        return f"{centuries:,} centuries"
    elif seconds < 31536000 * 1e9:
        millions_years = round(seconds / (31536000 * 1e6))
        return f"{millions_years:,} million years"
    elif seconds < 31536000 * 1e12:
        billions_years = round(seconds / (31536000 * 1e9))
        return f"{billions_years:,} billion years"
    else:
        trillions = round(seconds / (31536000 * 1e12))
        return f"{trillions:,} trillion years"

def analyze_password(password: str) -> Dict[str, Any]:
    """
    Evaluates password entropy, vulnerabilities, character sets,
    and attack-vector crack times.
    """
    if not password:
        return {
            "password_length": 0,
            "entropy_bits": 0.0,
            "score": 0,
            "verdict": "Very Weak",
            "charset_size": 0,
            "has_lower": False,
            "has_upper": False,
            "has_digits": False,
            "has_symbols": False,
            "vulnerabilities": ["Password is empty"],
            "suggestions": ["Enter a password with at least 12 characters, mixing letters, numbers, and symbols."],
            "crack_times": {
                "online_throttled": "Instant",
                "online_unthrottled": "Instant",
                "offline_slow_hash": "Instant",
                "offline_fast_gpu": "Instant"
            }
        }

    length = len(password)
    has_lower = any(c in string.ascii_lowercase for c in password)
    has_upper = any(c in string.ascii_uppercase for c in password)
    has_digits = any(c in string.digits for c in password)
    has_symbols = any(c in string.punctuation or not c.isalnum() for c in password)

    # Calculate character pool size
    charset_size = 0
    if has_lower:
        charset_size += 26
    if has_upper:
        charset_size += 26
    if has_digits:
        charset_size += 10
    if has_symbols:
        charset_size += 33

    # Baseline Shannon entropy: H = L * log2(R)
    raw_entropy = length * (math.log2(charset_size) if charset_size > 0 else 0)

    # Vulnerability & Pattern Detection
    vulnerabilities = []
    suggestions = []
    penalty_bits = 0.0

    # 1. Length check
    if length < 8:
        vulnerabilities.append("Critically short length (< 8 characters)")
        suggestions.append("Increase length to at least 12–16 characters.")
        penalty_bits += 15.0
    elif length < 12:
        vulnerabilities.append("Sub-optimal length (recommended: 12+ characters)")
        suggestions.append("Add 3–5 more characters to dramatically expand the search space.")
        penalty_bits += 5.0

    # 2. Missing character classes
    missing_classes = []
    if not has_lower:
        missing_classes.append("lowercase letters")
    if not has_upper:
        missing_classes.append("uppercase letters")
    if not has_digits:
        missing_classes.append("numbers")
    if not has_symbols:
        missing_classes.append("symbols/special characters")

    if missing_classes:
        vulnerabilities.append(f"Missing character variety: {', '.join(missing_classes)}")
        suggestions.append(f"Incorporate {', '.join(missing_classes)}.")

    # 3. Repeated characters (e.g. 'aaaa', '111')
    repeats = re.findall(r'(.)\1{2,}', password)
    if repeats:
        vulnerabilities.append("Contains repeated identical characters (e.g., 'aaa')")
        penalty_bits += 8.0 * len(repeats)

    # 4. Sequential numbers or letters (e.g. '12345', 'abcdef')
    lowered = password.lower()
    for i in range(len(lowered) - 2):
        chunk = lowered[i:i+3]
        if chunk.isdigit() and ("0123456789".find(chunk) != -1 or "9876543210".find(chunk) != -1):
            vulnerabilities.append(f"Sequential number sequence detected: '{chunk}'")
            penalty_bits += 10.0
            break
        elif chunk.isalpha() and ("abcdefghijklmnopqrstuvwxyz".find(chunk) != -1 or "zyxwvutsrqponmlkjihgfedcba".find(chunk) != -1):
            vulnerabilities.append(f"Sequential alphabet sequence detected: '{chunk}'")
            penalty_bits += 10.0
            break

    # 5. Keyboard walks (e.g. 'qwerty', 'asdfgh')
    for walk in KEYBOARD_WALKS:
        for i in range(len(walk) - 3):
            sub = walk[i:i+4]
            if sub in lowered:
                vulnerabilities.append(f"Keyboard pattern walk detected: '{sub}'")
                penalty_bits += 14.0
                break

    # 6. Common dictionary & leetspeak word matches
    normalized = normalize_leetspeak(password)
    for word in COMMON_DICTIONARY_WORDS:
        if word in lowered:
            vulnerabilities.append(f"Common dictionary word found: '{word}'")
            penalty_bits += 18.0
            break
        elif word in normalized:
            vulnerabilities.append(f"Leetspeak variation of common word detected: '{word}'")
            penalty_bits += 14.0
            break

    # 7. Year / Date patterns (e.g. 1998, 2024)
    years = re.findall(r'(19\d\d|20\d\d)', password)
    if years:
        vulnerabilities.append(f"Year or birthdate format detected: '{years[0]}'")
        penalty_bits += 8.0

    # Effective Entropy after penalties
    effective_entropy = max(0.0, raw_entropy - penalty_bits)
    effective_entropy = round(effective_entropy, 1)

    # Score and Verdict
    # 0: Very Weak (< 28)
    # 1: Weak (28 - 44)
    # 2: Moderate (45 - 59)
    # 3: Strong (60 - 79)
    # 4: Titanium (>= 80)
    if effective_entropy < 28 or length < 8:
        score = 0
        verdict = "Very Weak"
    elif effective_entropy < 45:
        score = 1
        verdict = "Weak"
    elif effective_entropy < 60:
        score = 2
        verdict = "Moderate"
    elif effective_entropy < 80:
        score = 3
        verdict = "Strong"
    else:
        score = 4
        verdict = "Titanium"

    # Crack Time Estimations based on effective entropy: 2^H search space
    # Average guesses = 2^(H - 1)
    # Scenario rates:
    # 1. Online Throttled: 100/hr = 100/3600 = ~0.02778 guesses/sec
    # 2. Online Unthrottled: 10 guesses/sec
    # 3. Offline Slow Hash (bcrypt/argon2): 10,000 guesses/sec
    # 4. Offline Fast Hash / GPU Cluster (MD5/NTLM with 8x RTX 4090): 100,000,000,000 guesses/sec (10^11)

    search_space = 2.0 ** min(effective_entropy, 256.0)
    avg_guesses = search_space / 2.0

    time_online_throttled = avg_guesses / (100.0 / 3600.0)
    time_online_unthrottled = avg_guesses / 10.0
    time_offline_slow = avg_guesses / 10000.0
    time_offline_fast = avg_guesses / 100000000000.0

    crack_times = {
        "online_throttled": format_duration(time_online_throttled),
        "online_unthrottled": format_duration(time_online_unthrottled),
        "offline_slow_hash": format_duration(time_offline_slow),
        "offline_fast_gpu": format_duration(time_offline_fast)
    }

    if not suggestions and score < 4:
        suggestions.append("Consider combining 4 or more random unrelated words for high-entropy memorability.")

    return {
        "password_length": length,
        "entropy_bits": effective_entropy,
        "raw_entropy": round(raw_entropy, 1),
        "score": score,
        "verdict": verdict,
        "charset_size": charset_size,
        "has_lower": has_lower,
        "has_upper": has_upper,
        "has_digits": has_digits,
        "has_symbols": has_symbols,
        "vulnerabilities": vulnerabilities,
        "suggestions": suggestions,
        "crack_times": crack_times
    }
