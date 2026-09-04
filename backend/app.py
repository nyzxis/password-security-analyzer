from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

from analyzer import analyze_password
from hibp import check_pwned_password, check_pwned_hash_prefix
from generator import generate_random_password, generate_passphrase

app = FastAPI(
    title="Password Security Analyzer API",
    description="Real-time zero-knowledge password entropy & HaveIBeenPwned breach detection API",
    version="1.0.0"
)

# Enable CORS for local Vite dev server and Vercel domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    password: str = Field(..., description="The password string to evaluate")

class BreachRequest(BaseModel):
    password: Optional[str] = Field(None, description="Plaintext password to hash & check")
    sha1_prefix: Optional[str] = Field(None, description="First 5 characters of SHA-1 hash for zero-knowledge client check")
    sha1_suffix: Optional[str] = Field(None, description="Remaining 35 characters of SHA-1 hash")

class GenerateRequest(BaseModel):
    mode: str = Field("random", description="'random' or 'passphrase'")
    length: int = Field(16, ge=8, le=64)
    include_upper: bool = True
    include_lower: bool = True
    include_digits: bool = True
    include_symbols: bool = True
    word_count: int = Field(4, ge=3, le=8)
    separator: str = "-"
    capitalize: bool = True

@app.get("/")
@app.get("/api")
@app.get("/api/health")
@app.get("/health")
def health():
    return {
        "status": "online",
        "service": "Password Security Analyzer API",
        "engine": "FASTAPI + CSPRNG + HIBP",
        "version": "1.0.0",
        "features": ["entropy_analysis", "k_anonymity_breach_detection", "crack_time_simulation", "cryptographic_generator"]
    }

@app.post("/api/analyze")
@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    return analyze_password(req.password)

@app.post("/api/check-breach")
@app.post("/check-breach")
async def check_breach(req: BreachRequest):
    if req.sha1_prefix and req.sha1_suffix:
        return await check_pwned_hash_prefix(req.sha1_prefix, req.sha1_suffix)
    elif req.password:
        return await check_pwned_password(req.password)
    else:
        raise HTTPException(status_code=400, detail="Must provide either password or sha1_prefix & sha1_suffix")

@app.post("/api/generate")
@app.post("/generate")
def generate(req: GenerateRequest):
    if req.mode == "passphrase":
        password = generate_passphrase(
            word_count=req.word_count,
            separator=req.separator,
            include_number=req.include_digits,
            capitalize=req.capitalize
        )
    else:
        password = generate_random_password(
            length=req.length,
            include_upper=req.include_upper,
            include_lower=req.include_lower,
            include_digits=req.include_digits,
            include_symbols=req.include_symbols
        )

    analysis = analyze_password(password)
    return {
        "password": password,
        "mode": req.mode,
        "analysis": analysis
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
