FROM ruby:3.0.2-alpine3.14
LABEL maintainer="ghqyydf829@gmail.com"

ENV ROOT="/myapp" \
    LANG=C.UTF-8  \
    TZ=Asia/Tokyo

RUN apk update && \
    apk add --no-cache \
        gcc \
        g++ \
        libc-dev \
        libxml2-dev \
        linux-headers \
        make \
        mysql-client \
        mysql-dev \
        tzdata && \
    apk add --virtual build-packs --no-cache \
        build-base \
        curl-dev

WORKDIR ${ROOT}
COPY Gemfile ${ROOT}
COPY Gemfile.lock ${ROOT}

RUN bundle install

COPY . ${ROOT}

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["sh", "/usr/bin/entrypoint.sh"]
EXPOSE 3000

RUN mkdir -p tmp/sockets

CMD ["rails", "server", "-b", "0.0.0.0"]
