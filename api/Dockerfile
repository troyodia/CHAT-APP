FROM node:alpine3.18

WORKDIR /app
COPY package*.json ./
# COPY ./package.json /package.json
RUN npm ci
COPY . .
# EXPOSE 5000
CMD [ "npm", "run", "start" ]