# 运行后端
dev-back:
	cd backend && uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload

# 运行前端
dev-front:
	cd frontend && npm run dev

# 一键启动全家桶 (使用 & 符号让它们在后台并行运行)
dev-all:
	(make dev-backend & make dev-frontend)

# 统一变量定义
DOCKER_USER = sxr220917
REGISTRY    = ghcr.io/$(DOCKER_USER)

BACKEND_IMAGE  = $(REGISTRY)/homelab-backend:latest
FRONTEND_IMAGE = $(REGISTRY)/homelab-frontend:latest

# --- 1. 后端构建与推送 ---
release-backend:
	cd backend && docker build -t $(BACKEND_IMAGE) .
	docker push $(BACKEND_IMAGE)

# --- 2. 前端构建与推送 ---
release-frontend:
	cd frontend && docker build -t $(FRONTEND_IMAGE) .
	docker push $(FRONTEND_IMAGE)