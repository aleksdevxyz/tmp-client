ARG NODE_VERSION=20.10.0

FROM mirror.gcr.io/node:${NODE_VERSION}-alpine as base

# хост апихи
ARG NEXT_PUBLIC_SITE_URL
ARG TELEGRAM_CHANNEL

ENV NEXT_PUBLIC_SITE_URL ${NEXT_PUBLIC_SITE_URL}
ENV TELEGRAM_CHANNEL ${TELEGRAM_CHANNEL}

WORKDIR /usr/src/app

RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn run build && \
    yarn cache clean

COPY . .

RUN yarn

RUN yarn build

ENV NODE_ENV production

EXPOSE 3000

CMD yarn run