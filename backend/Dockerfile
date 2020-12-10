FROM node:alpine

WORKDIR /app

COPY ./package.json ./

RUN npm update- g
RUN npm install
RUN npm install mongoose

COPY . .

CMD ["npm", "run", "dev"]