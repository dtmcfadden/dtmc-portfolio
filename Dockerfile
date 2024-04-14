FROM node:18-alpine AS dependencies

WORKDIR /app
COPY ./prisma package.json ./
COPY prisma ./prisma/
RUN yarn

FROM node:18-alpine AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# RUN npx prisma migrate deploy
RUN npx prisma generate
RUN yarn build

FROM node:18-alpine AS deploy

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
# CMD [  "yarn", "start:migrate:prod" ]


# docker compose -f docker-compose.yml build