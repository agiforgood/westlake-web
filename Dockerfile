FROM --platform=linux/amd64 node:lts-bookworm-slim AS base

# 1. Install dependencies only when needed
FROM base AS deps

RUN apt-get update && apt-get install -y ca-certificates
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# 设置环境变量加速 sharp 下载
ENV SHARP_BINARY_HOST=https://npmmirror.com/mirrors/sharp
ENV SHARP_LIBVIPS_BINARY_HOST=https://npmmirror.com/mirrors/sharp-libvips
ENV npm_config_sharp_binary_host=https://npmmirror.com/mirrors/sharp
ENV npm_config_sharp_libvips_binary_host=https://npmmirror.com/mirrors/sharp-libvips

# 使用淘宝镜像源加速下载
RUN npm config set registry https://registry.npmmirror.com && \
    if [ -f yarn.lock ]; then \
        yarn config set registry https://registry.npmmirror.com && \
        yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
        npm ci --verbose; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable pnpm && \
        pnpm config set registry https://registry.npmmirror.com && \
        pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi


# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 禁用 Next.js 遥测并增加 Node.js 内存限制
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"

# 添加构建超时和调试信息
RUN echo "Starting Next.js build..." && \
    npm run build || \
    (echo "Build failed, checking for common issues..." && \
     echo "Node version:" && node --version && \
     echo "NPM version:" && npm --version && \
     echo "Memory info:" && cat /proc/meminfo | grep MemTotal && \
     exit 1)

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN groupadd -g 1001 nodejs
RUN useradd -M -u 1001 -g nodejs nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["node", "server.js"]