FROM node:8

RUN mkdir /usr/src/app 
 
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .