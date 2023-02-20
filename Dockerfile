FROM node:18.13.0-alpine  as build-stage

RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev
RUN add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing libmount ttf-dejavu ttf-droid ttf-freefont ttf-liberation ttf-ubuntu-font-family fontconfig

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine-slim

COPY --from=build-stage /app/build/ /usr/share/nginx/html
EXPOSE 80
