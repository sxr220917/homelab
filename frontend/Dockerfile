# --- 第一阶段：构建 (Build Stage) ---
# 使用 Node.js 20 镜像进行打包
FROM node:20-alpine AS build-stage
WORKDIR /app

# 复制依赖定义文件
COPY package*.json ./
# 安装项目依赖
RUN npm install

# 复制所有源代码（.dockerignore 会帮我们过滤掉 node_modules）
COPY . .

# 执行打包命令，生成 dist 文件夹
RUN npm run build

# --- 第二阶段：运行 (Production Stage) ---
# 使用轻量的 Nginx 镜像托管静态资源
FROM nginx:stable-alpine

# 复制自定义的 Nginx 配置文件，覆盖默认配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制生成的静态文件到 Nginx 的网页目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]