FROM node:latest

RUN npm install -g pnpm

WORKDIR /user/app

COPY ./package.json .
COPY ./pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm build

CMD [ "pnpm", "start" ]