import secrets
import string
from typing import List

WORDLIST = [
    "acorn", "almond", "anchor", "anthem", "apron", "archer", "arrow", "atlas", "autumn", "badge",
    "baker", "bamboo", "banner", "barrel", "beacon", "beetle", "breeze", "bridge", "bronze", "bubble",
    "cabin", "cactus", "camel", "candle", "canyon", "carpet", "castle", "cedar", "cipher", "circus",
    "cliff", "clover", "cobalt", "coffee", "comet", "copper", "coral", "cosmos", "cradle", "crater",
    "crystal", "dagger", "daisy", "delta", "desert", "diamond", "dolphin", "dragon", "drift", "eagle",
    "echo", "ember", "emerald", "falcon", "fathom", "feather", "flame", "forest", "fossil", "fox",
    "frost", "galaxy", "garnet", "geyser", "glacier", "glider", "glow", "granite", "grove", "harbor",
    "haven", "hawk", "helium", "helmet", "horizon", "hound", "hunter", "icicle", "iguana", "impact",
    "island", "jasper", "javelin", "jungle", "jupiter", "kayak", "kernel", "kettle", "knight", "lagoon",
    "lantern", "legend", "lemur", "leopard", "liberty", "lichen", "lightning", "lynx", "magnet", "mango",
    "mantle", "marble", "matrix", "meadow", "meteor", "mirage", "mirror", "monarch", "moon", "mosaic",
    "moss", "mountain", "nebula", "nectar", "nickel", "nomad", "nova", "oasis", "obsidian", "ocean",
    "olive", "onyx", "orbit", "orchid", "otter", "palace", "panther", "parrot", "pebble", "pelican",
    "phantom", "phoenix", "pinnacle", "planet", "plasma", "polar", "prism", "pulsar", "pyramid", "quartz",
    "quiver", "radar", "radiant", "raven", "reef", "ridge", "ripple", "river", "rocket", "ruby",
    "safari", "sailor", "sapphire", "saturn", "scale", "scarlet", "scout", "shadow", "shiver", "sierra",
    "silicon", "silver", "skylark", "solace", "solar", "spark", "spectrum", "spiral", "spring", "summit",
    "sunset", "syntax", "talisman", "tempest", "timber", "titan", "topaz", "tornado", "tower", "tracer",
    "tracker", "tundra", "twilight", "typhoon", "uranium", "valley", "vapor", "velvet", "venture", "vessel",
    "vortex", "voyage", "walnut", "warrior", "wave", "whistle", "willow", "winter", "wizard", "zenith"
]

def generate_random_password(
    length: int = 16,
    include_upper: bool = True,
    include_lower: bool = True,
    include_digits: bool = True,
    include_symbols: bool = True
) -> str:
    """
    Generates a cryptographically secure random password using secrets.
    Guarantees at least one character from each selected character set.
    """
    length = max(8, min(64, length))
    
    char_pool = ""
    mandatory_chars: List[str] = []

    if include_lower:
        char_pool += string.ascii_lowercase
        mandatory_chars.append(secrets.choice(string.ascii_lowercase))
    if include_upper:
        char_pool += string.ascii_uppercase
        mandatory_chars.append(secrets.choice(string.ascii_uppercase))
    if include_digits:
        char_pool += string.digits
        mandatory_chars.append(secrets.choice(string.digits))
    if include_symbols:
        symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?"
        char_pool += symbols
        mandatory_chars.append(secrets.choice(symbols))

    if not char_pool:
        # Default to alphanumeric if nothing selected
        char_pool = string.ascii_letters + string.digits
        mandatory_chars.append(secrets.choice(string.ascii_lowercase))

    remaining_length = max(0, length - len(mandatory_chars))
    random_chars = [secrets.choice(char_pool) for _ in range(remaining_length)]

    all_chars = mandatory_chars + random_chars
    # Cryptographic shuffle
    for i in range(len(all_chars) - 1, 0, -1):
        j = secrets.randbelow(i + 1)
        all_chars[i], all_chars[j] = all_chars[j], all_chars[i]

    return "".join(all_chars)

def generate_passphrase(
    word_count: int = 4,
    separator: str = "-",
    include_number: bool = True,
    capitalize: bool = True
) -> str:
    """
    Generates a memorable high-entropy passphrase (Diceware style)
    from a curated dictionary.
    """
    word_count = max(3, min(8, word_count))
    chosen_words = [secrets.choice(WORDLIST) for _ in range(word_count)]

    if capitalize:
        chosen_words = [w.capitalize() for w in chosen_words]

    if include_number:
        num = secrets.randbelow(90) + 10  # 2-digit number (10–99)
        chosen_words.append(str(num))

    return separator.join(chosen_words)
