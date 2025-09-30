FROM node:20-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]