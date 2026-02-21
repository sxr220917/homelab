from fastapi import FastAPI
from typing import Dict

# 1. 初始化应用
app = FastAPI(
    title="HomeLab App-Core API",
    description="这是运行在 LXC 101 上的后端服务",
    version="0.1.0"
)

# 2. 根路径接口 (用于基础验证)
@app.get("/")
def read_root() -> Dict:
    return {
        "status": "active",
        "message": "Welcome to App-Core API",
        "node": "LXC-101"
    }

# 3. 健康检查接口 (将来 NPM 网关会频繁访问这里确认服务是否挂掉)
@app.get("/health")
def health_check() -> Dict:
    return {"status": "ok", "uptime": "stable"}

# 4. 业务示例接口
@app.get("/api/v1/info")
def get_info() -> Dict:
    return {
        "project": "My-HomeLab",
        "author": "Sxr",
        "location": "Japan",
        "stack": ["FastAPI", "Docker", "PVE"]
    }