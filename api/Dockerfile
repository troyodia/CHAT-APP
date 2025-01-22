# Dev stage
FROM node:alpine3.18 AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci 

COPY . .

CMD [ "npm", "run", "start" ]

# Production stage
FROM node:alpine3.18 AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=development /app /app


CMD [ "node","app.js" ]
