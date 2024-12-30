FROM node:20.9.0-slim

RUN apt-get update -y && \ 
  apt-get install -y openssl procps

USER root

WORKDIR /home/root/app

RUN npm install -g pnpm

CMD [ "tail", "-f", "/dev/null" ]