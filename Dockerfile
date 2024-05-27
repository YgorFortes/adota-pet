# define node version
FROM node:20.9.0

WORKDIR /app

COPY package*.json ./

COPY ./.env ./

RUN npm install

COPY . .

EXPOSE 3000

ENV DB_USERNAME=postgres
ENV DB_PASSWORD=aDfbcPxDyzckdGRj
ENV DB_NAME=adota_pet
ENV DB_HOST=localhost
ENV DB_PORT=5432



CMD ["npm", "run", "start:dev"]