FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

EXPOSE 4001

CMD "npm" "run" "dev"