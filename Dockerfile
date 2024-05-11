ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npm run build

ENV NODE_ENV production

USER node

EXPOSE 3000

CMD npm start
