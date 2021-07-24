FROM node:16-alpine3.11
LABEL maintainer="ghqyydf829@gmail.com"

ENV ROOT="/usr/src/app" \
    LANG=C.UTF-8  \
    TZ=Asia/Tokyo

WORKDIR ${ROOT}

COPY package.json yarn.lock ${ROOT}/
RUN set -x && \
    apt-get update && \
    apt-get install -y nodejs yarn && \
    yarn install && \
    yarn cache clean && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY . ${ROOT}
