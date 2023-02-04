# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM node:alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# https://github.com/pnpm/pnpm/issues/4495
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN npm install -g pnpm
# Set working directory
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
ENV VERCEL_FORCE_NO_BUILD_CACHE="true"
RUN npm install -g pnpm
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY .npmrc .npmrc
COPY .prettierrc .prettierrc
RUN pnpm install --frozen-lockfile --prefer-offline --config.ignore-scripts=true

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo run build --scope=web
RUN pnpm prune --prod --config.ignore-scripts=true

RUN rm -rf ./apps/web/.next/cache

FROM node:alpine AS runner

RUN apk add --no-cache libc6-compat
RUN apk update
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer --chown=nextjs:nodejs  /app/apps ./apps
COPY --from=installer --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=installer --chown=nextjs:nodejs /app/packages ./packages
COPY --from=installer --chown=nextjs:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=nextjs:nodejs /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

EXPOSE 3000
CMD cd ./apps/web && pnpm start
