FROM node:20-alpine AS dependencies

WORKDIR /app
COPY ./prisma package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

FROM node:20-alpine AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS deploy

WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
# COPY --from=build /app/prisma ./prisma

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]

# docker compose -f docker-compose.yml build