FROM node:slim

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 3000

CMD "yarn" "run" "start"