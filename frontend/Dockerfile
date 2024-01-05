FROM node:current-alpine

WORKDIR /app

COPY package*.json /app

RUN npm i

COPY . .

EXPOSE 5173

RUN npm i

CMD ["npm", "run", "dev"]