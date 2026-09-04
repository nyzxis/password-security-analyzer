import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from analyzer import analyze_password, normalize_leetspeak, format_duration
from generator import generate_random_password, generate_passphrase

class TestPasswordAnalyzer(unittest.TestCase):
    def test_empty_password(self):
        result = analyze_password("")
        self.assertEqual(result["score"], 0)
        self.assertEqual(result["verdict"], "Very Weak")
        self.assertEqual(result["entropy_bits"], 0.0)

    def test_weak_common_password(self):
        result = analyze_password("password123")
        self.assertIn(result["verdict"], ["Very Weak", "Weak"])
        self.assertTrue(any("dictionary word" in v.lower() for v in result["vulnerabilities"]))

    def test_leetspeak_detection(self):
        normalized = normalize_leetspeak("p@ssw0rd")
        self.assertEqual(normalized, "password")
        result = analyze_password("P@ssw0rd!")
        self.assertTrue(any("leetspeak" in v.lower() or "dictionary" in v.lower() for v in result["vulnerabilities"]))

    def test_titanium_password(self):
        result = analyze_password("9v#K$m8!qZ5*pL2@wR7&")
        self.assertGreaterEqual(result["entropy_bits"], 75)
        self.assertIn(result["verdict"], ["Strong", "Titanium"])
        self.assertTrue(result["has_lower"])
        self.assertTrue(result["has_upper"])
        self.assertTrue(result["has_digits"])
        self.assertTrue(result["has_symbols"])

    def test_generator_random(self):
        pwd = generate_random_password(length=20)
        self.assertEqual(len(pwd), 20)
        res = analyze_password(pwd)
        self.assertGreaterEqual(res["score"], 3)

    def test_generator_passphrase(self):
        phrase = generate_passphrase(word_count=4, separator="-")
        parts = phrase.split("-")
        self.assertGreaterEqual(len(parts), 4)

    def test_duration_formatting(self):
        self.assertEqual(format_duration(0.0001), "Instant (< 1 ms)")
        self.assertIn("second", format_duration(45))
        self.assertIn("hour", format_duration(7200))
        self.assertIn("centur", format_duration(31536000 * 200).lower())

if __name__ == "__main__":
    unittest.main()
