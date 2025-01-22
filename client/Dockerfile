# Dev stage
FROM node:alpine3.18 AS development

WORKDIR /app

COPY package*.json ./

RUN  npm ci

COPY . .

RUN  npm run build

# Production stage
FROM caddy:2-alpine AS production

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=development /app/build /srv