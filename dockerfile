# ---------- Stage 1: Builder ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Поддержка приватных пакетов (до npm install!)
ARG NPM_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > .npmrc \
    && echo "@100bucksdev:registry=https://npm.pkg.github.com" >> .npmrc

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем проект
COPY . .

# Поддержка env во время билда
ARG NEXT_PUBLIC_APP_WEBSOCKET_URL
ARG NEXT_PUBLIC_APP_API_URL
ARG NEXT_PUBLIC_APP_CLIENT_URL
ARG NEXT_PUBLIC_CAPTCHA_KEY
ARG NEXT_PUBLIC_COPART_DOMEN
ARG NEXT_PUBLIC_IAAI_DOMEN

ENV NEXT_PUBLIC_APP_WEBSOCKET_URL=$NEXT_PUBLIC_APP_WEBSOCKET_URL
ENV NEXT_PUBLIC_APP_API_URL=$NEXT_PUBLIC_APP_API_URL
ENV NEXT_PUBLIC_APP_CLIENT_URL=$NEXT_PUBLIC_APP_CLIENT_URL
ENV NEXT_PUBLIC_CAPTCHA_KEY=$NEXT_PUBLIC_CAPTCHA_KEY
ENV NEXT_PUBLIC_COPART_DOMEN=$NEXT_PUBLIC_COPART_DOMEN
ENV NEXT_PUBLIC_IAAI_DOMEN=$NEXT_PUBLIC_IAAI_DOMEN

# Сборка Next.js
RUN npm run build

# ---------- Stage 2: Runner ----------
FROM node:18-alpine AS runner

WORKDIR /app

# Поддержка приватных пакетов
ARG NPM_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > .npmrc \
    && echo "@100bucksdev:registry=https://npm.pkg.github.com" >> .npmrc

# Устанавливаем только production зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем артефакты из builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
