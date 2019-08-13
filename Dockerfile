FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
