FROM node:12-alpine

RUN apk add --no-cache yarn
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata

WORKDIR /app
