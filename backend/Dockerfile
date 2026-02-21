# 1. 使用官方的精简版 Python 3.12 镜像作为底层地基
FROM python:3.12-slim

# 2. 设置容器内部的工作目录（相当于在容器里 mkdir /app 并且 cd /app）
WORKDIR /app

# 3. 先把 requirements.txt 复制进去
COPY requirements.txt .

# 4. 安装依赖
# --no-cache-dir: 不保存下载缓存，让镜像更小
RUN pip install --no-cache-dir -r requirements.txt

# 5. 把当前后端目录下的所有代码文件，复制到容器的 /app 目录里
COPY . .

# 6. 暴露 8000 端口（这只是一种声明，方便以后看文档）
EXPOSE 8000

# 7. 容器启动时执行的默认命令
# 注意：必须监听 0.0.0.0，否则外部（NPM网关）无法访问容器
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]