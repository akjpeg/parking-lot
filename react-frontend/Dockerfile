FROM node:alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install --verbose

COPY . .

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build-stage /app/build .

EXPOSE 80
