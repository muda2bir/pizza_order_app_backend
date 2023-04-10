FROM node:16

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 5174

CMD ["npm", "run", "node dist/server.js"]