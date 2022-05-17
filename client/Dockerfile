FROM node:12.7-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .