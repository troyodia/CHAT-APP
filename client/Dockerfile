FROM node:alpine3.18 AS build

#build app
WORKDIR /app
COPY package*.json ./
# COPY ./package.json /package.json
RUN npm install
COPY . .
CMD ["npm", "start"]
# RUN npm run build

#serve with Nginx
# FROM nginx:1.27-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]