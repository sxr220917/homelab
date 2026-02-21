from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 只允许你信任的来源访问
origins = [
    "http://localhost:5173",
    "http://api.homelab.local",
    "https://www.pourquoi.cc", 
    "https://api.pourquoi.cc",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     # 精确匹配，拒绝其他所有来源
    allow_credentials=True,    # 如果你的前端需要发送 Cookie 或认证信息，必须为 True
    allow_methods=["GET", "POST", "OPTIONS"], # 甚至可以只允许特定的 HTTP 方法
    allow_headers=["*"],       # 允许前端发送任何 Header（如 Content-Type）
)

@app.get("/health")
def health():
    return {"status": "ok", "security": "strict"}