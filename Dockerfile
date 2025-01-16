ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine3.19 as base

COPY yarn.lock package.json ./

# хост апихи
ARG NEXT_PUBLIC_SITE_URL
ARG TELEGRAM_CHANNEL

ENV NEXT_PUBLIC_SITE_URL ${NEXT_PUBLIC_SITE_URL}
ENV TELEGRAM_CHANNEL ${TELEGRAM_CHANNEL}

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn
RUN yarn build

ENV NODE_ENV production

EXPOSE 3000

CMD ["yarn", "start"]