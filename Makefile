# 运行后端
dev-back:
	cd backend && uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload

# 运行前端
dev-front:
	cd frontend && npm run dev

# 一键启动全家桶 (使用 & 符号让它们在后台并行运行)
dev-all:
	(make dev-backend & make dev-frontend)