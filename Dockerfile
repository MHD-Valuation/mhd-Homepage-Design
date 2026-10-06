# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# 1. Install dependencies
FROM base AS deps
WORKDIR /app
COPY cms/package.json cms/package-lock.json ./
RUN npm ci

# 2. Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY cms ./

# Ensure dummy env vars during next build to satisfy static type checks
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_SECRET=temp_build_secret_min_32_characters_long_12345
ENV DATABASE_URI=postgresql://postgres:postgres@localhost:5432/temp_db

RUN npm run build

# 3. Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3005
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets and built next files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src ./src

# Create upload directories with permissions
RUN mkdir -p /app/private-uploads /app/media && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3005

CMD ["npm", "run", "start"]
