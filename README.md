# 🔐 KEYVAULT // Zero-Knowledge Password Security Analyzer

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React 19](https://img.shields.io/badge/Frontend-React_19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![HaveIBeenPwned](https://img.shields.io/badge/Breach_API-HaveIBeenPwned_k--Anonymity-ff5722?style=for-the-badge)](https://haveibeenpwned.com/API/v3#PwnedPasswords)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel_Serverless-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A modern, high-performance cybersecurity application engineered to evaluate password strength, compute Shannon entropy, simulate brute-force crack times across modern hardware clusters, and detect known breach exposures using **Troy Hunt's k-Anonymity mathematical model**.

Built by **Arfa Danial** ([@nyzxis](https://github.com/nyzxis)).

---

## 🛡️ Zero-Knowledge Security Guarantee

> **Your password is NEVER transmitted over the internet in plaintext.**

KEYVAULT implements the industry-standard **k-Anonymity** model:
1. When you type or paste a password, your browser's native **Web Crypto API** computes its SHA-1 hash locally in memory.
2. The browser sends **ONLY the first 5 characters** of the hash (e.g. `21BD1`) to the HaveIBeenPwned API.
3. The API returns a list of all hash suffixes matching that 5-character prefix.
4. Your browser checks locally if the remaining 35 characters exist in the returned list.
5. Neither the server, nor any network snooper, can reconstruct your original password.

---

## ✨ Features

- ⚡ **Instant 0ms Telemetry**: Real-time entropy, character pool, and weakness evaluation as you type.
- 🧮 **Shannon Entropy Engine**: Calculates bit entropy based on character sets with intelligent deductions for repetitions, sequential letters, and keyboard walks (`qwerty`, `asdfgh`).
- 🕵️ **Attack Vector Inspector**: Detects common dictionary roots, dates, sequential numbers, and leetspeak substitutions (`p@ssw0rd` -> `password`).
- ⏱️ **Multi-Tier Crack Time Simulator**:
  - **Online Throttled**: 100 attempts / hour (login forms with rate limiting / CAPTCHA)
  - **Online Unthrottled**: 10 attempts / second (exposed APIs / botnets)
  - **Offline Slow Hash**: 10,000 guesses / second (salted bcrypt / Argon2id)
  - **Offline Fast GPU Cluster**: 100,000,000,000 guesses / second (8x NVIDIA RTX 4090 rig / MD5 / NTLM)
- 🎲 **CSPRNG Password & Passphrase Generator**:
  - Forge cryptographically secure random tokens with custom lengths (8–48 chars) and character classes.
  - Generate high-entropy memorable Diceware passphrases (e.g. `Cobalt-Falcon-Meadow-Beacon-42`).
- 🎨 **Dual-Mode UI Themes**:
  - **Cyber Obsidian**: Deep space canvas (`#07090E`), glowing neon telemetry aurora, and monospace matrix styling.
  - **Minimalist Editorial**: Warm bone canvas (`#F7F6F3`), crisp 1px borders, and `Newsreader` optical serif typography.

---

## 🚀 Quick Start (Local Setup)

### Option 1: One-Click Launcher (Windows)
Double-click `start.bat`. It will automatically:
1. Create and activate a Python virtual environment (`backend/.venv`).
2. Install Python dependencies (`fastapi`, `uvicorn`, `httpx`).
3. Install frontend packages (`npm install`).
4. Launch both the backend on `http://127.0.0.1:8000` and the Vite frontend on `http://localhost:3000`.

### Option 2: Manual Terminal Execution

#### 1. Backend (FastAPI):
```bash
cd backend
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app:app --port 8000 --reload
```

#### 2. Frontend (React 19 + Vite):
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## ☁️ Deploying to Vercel

KEYVAULT is pre-configured for **Vercel Serverless Full-Stack Deployment**:
1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Keep default settings (`vercel.json` automatically manages the build and rewrites).
4. Click **Deploy**!

---

## 📂 Project Architecture

```
password-security-analyzer/
├── backend/
│   ├── app.py                # FastAPI REST application
│   ├── analyzer.py           # Core Shannon entropy & pattern engine
│   ├── generator.py          # CSPRNG & Diceware generator
│   ├── hibp.py               # HaveIBeenPwned k-Anonymity client
│   ├── requirements.txt      # Python dependencies
│   └── tests/                # Automated unit tests
├── frontend/
│   ├── src/
│   │   ├── components/       # UI Components (Input, Meter, Crack Cards, etc.)
│   │   ├── lib/              # Client analyzer, WebCrypto HIBP client, API
│   │   ├── App.tsx           # Dashboard layout & state management
│   │   └── styles.css        # Cyber Obsidian & Minimalist design tokens
│   ├── index.html            # Entry HTML & Google Fonts
│   └── package.json          # Dependencies
├── api/
│   └── index.py              # Vercel serverless Python adapter
├── vercel.json               # Vercel deployment configuration
├── start.bat                 # One-click Windows runner
└── README.md
```

---

## 📄 License
MIT License. Built for security awareness and defensive cybersecurity training.
