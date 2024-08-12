FROM node:20-alpine as base

# ---
FROM base AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

# ---
FROM base AS builder

USER node
WORKDIR /app

COPY --from=deps --chown=node:node /app/node_modules ./node_modules

COPY --chown=node:node ./package.json ./package-lock.json ./.eslintrc.json ./.prettierrc.json ./next.config.mjs ./postcss.config.mjs ./tailwind.config.ts ./tsconfig.json ./
COPY --chown=node:node ./public ./public
COPY --chown=node:node ./src ./src

RUN npm run build

# ---
FROM base AS dist

USER node
WORKDIR /app

ENV PORT=3000
ENV NODE_ENV production

COPY --from=builder --chown=node:node /app/public ./public

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

EXPOSE 3000

CMD HOSTNAME="0.0.0.0" node server.js
