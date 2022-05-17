FROM node:18-alpine

# Install bash
RUN apk add --no-cache bash

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200

COPY . .