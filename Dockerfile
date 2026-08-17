FROM node:22-alpine3.20 AS deps

WORKDIR /app

RUN apk update && apk upgrade --no-cache

COPY package*.json ./

RUN npm ci


FROM node:22-alpine3.20 AS builder

WORKDIR /app

RUN apk update && apk upgrade --no-cache

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

RUN npx prisma generate
RUN npm run build


FROM node:22-alpine3.20 AS production

WORKDIR /app

RUN apk update && apk upgrade --no-cache

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]