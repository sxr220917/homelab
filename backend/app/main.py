from fastapi import FastAPI

app = FastAPI(
    title="HomeLab API",
    description="Running",
)

@app.get("/health")
def health():
    return {
        "status": "ok", 
        "message": "hello world"
    }