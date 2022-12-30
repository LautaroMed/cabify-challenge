FROM node:18-alpine

USER node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 9091

CMD [ "node", "dist/main.js" ]
