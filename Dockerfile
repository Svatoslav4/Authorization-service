FROM node:22-alpine3.20 AS builder
WORKDIR /app
COPY package*.json ./

RUN apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:22-alpine3.20 AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./

RUN apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*
RUN npm ci --omit=dev

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 5000

CMD ["node", "dist/server.js"]