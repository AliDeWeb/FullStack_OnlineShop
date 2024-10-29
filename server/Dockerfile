FROM node:latest

RUN npm install -g pnpm

WORKDIR /user/app

COPY ./package.json .
COPY ./pnpm-lock.yaml .

RUN pnpm install

COPY . .

ENV JWT_SECRET=secret
ENV JWT_EXPIRES_IN=3d
ENV SWAGGER_USER=admin
ENV SWAGGER_PASSWORD=1234
ENV PORT=3000

RUN pnpm build

CMD [ "pnpm", "start" ]