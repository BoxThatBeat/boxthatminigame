FROM node:18.1-alpine3.14

# Install bash
RUN apk add --no-cache bash

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN apk add --no-cache --virtual .gyp python3 make g++ \
    && npm install \
    && apk del .gyp

EXPOSE 4200

COPY . .