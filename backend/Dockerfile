FROM ruby:3.0.2-alpine3.14
LABEL maintainer="ghqyydf829@gmail.com"

ENV ROOT="/myapp" \
    LANG=C.UTF-8  \
    TZ=Asia/Tokyo

RUN apk add --update-cache --no-cache

WORKDIR ${ROOT}
COPY Gemfile ${ROOT}
COPY Gemfile.lock ${ROOT}

RUN bundle install

COPY . ${ROOT}

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
