# ---------- Stage 1: Builder ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Устанавливаем зависимости
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

# Сборка
RUN npm run build

# ---------- Stage 2: Runner ----------
FROM node:18-alpine AS runner

WORKDIR /app

# Устанавливаем только production зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем артефакты из builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Если нужен кастомный сервер — можно скопировать server.js
# COPY --from=builder /app/server.js ./server.js

EXPOSE 3000

CMD ["npm", "run", "start"]
