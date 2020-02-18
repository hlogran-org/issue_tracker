FROM node:10

EXPOSE 3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm cache clean --force

WORKDIR /usr/src/app/client

COPY client/package*.json ./

RUN npm install && npm cache clean --force

WORKDIR /usr/src/app/server

COPY server/package*.json ./

RUN npm install && npm cache clean --force

WORKDIR /usr/src/app

COPY . .

CMD ["npm", "start"]
