# The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.

FROM node:alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm@7.27.0

# Set working directory
WORKDIR /app
RUN pnpm add -g turbo@1.7.0
COPY . .
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
RUN apk add --no-cache libc6-compat
RUN apk update
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm@7.27.0
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY .npmrc .npmrc
COPY .prettierrc .prettierrc
RUN pnpm install --frozen-lockfile --prefer-offline --config.ignore-scripts=true

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN
RUN pnpm turbo run build --scope=api
RUN pnpm prune --prod --config.ignore-scripts=true

FROM node:alpine AS runner

RUN apk add --no-cache libc6-compat
RUN apk update
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm@7.27.0
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

RUN pnpm add -g prisma@4.9.0 dotenv-cli ts-node typescript

COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer --chown=nestjs:nodejs  /app/apps ./apps
COPY --from=installer --chown=nestjs:nodejs /app/package.json ./package.json
COPY --from=installer --chown=nestjs:nodejs /app/packages ./packages
COPY --from=installer --chown=nestjs:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN sed -i '/generator dbml.*{/,/^}/d' ./packages/database/prisma/schema.prisma

EXPOSE 8080
CMD cd ./packages/database && pnpm exec prisma generate && pnpm migrate:prod && cd ../../apps/api && pnpm start:prod