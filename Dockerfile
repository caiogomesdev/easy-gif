FROM node:18.13.0-alpine  as build-stage

WORKDIR /app
COPY . .
RUN npm install -g node-gyp
RUN npm install
RUN npm run build

FROM nginx:alpine-slim

COPY --from=build-stage /app/build/ /usr/share/nginx/html
EXPOSE 80
