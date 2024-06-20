ARG NODE_VERSION=20.10.0
FROM mirror.gcr.io/node:${NODE_VERSION}-alpine as base

# Хост апихи
ARG BASE_URL 
ENV BASE_URL ${BASE_URL}

WORKDIR /usr/src/app

COPY . .

# Установка зависимостей с очисткой кэша и временных файлов
RUN npm i && \
    npm cache clean --force && \
    rm -rf /tmp/* /root/.npm /root/.cache

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD npm start
