# Multi-stage Dockerfile for TraderLearning-Path
FROM oven/bun:1.2-alpine AS base
WORKDIR /app

# Install dependencies into temp folder
FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lock* /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

RUN mkdir -p /temp/dev
COPY package.json bun.lock* /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Build frontend client
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

# Final production runner
FROM base AS release
WORKDIR /app
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build /app/dist dist
COPY --from=build /app/server server
COPY --from=build /app/src src
COPY --from=build /app/data data
COPY --from=build /app/package.json .

# Expose ports: 3001 (API Server) & 3000 (Static / Client)
EXPOSE 3001

CMD ["bun", "server/index.ts"]
