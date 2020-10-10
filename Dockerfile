FROM ruby:2.6.5-alpine as builder

WORKDIR /usr/src/app

ENV GEM_HOME="/usr/src/app/vendor/bundle"
ENV PATH $GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH
ENV RAILS_ENV production
ENV RACK_ENV production
ENV NODE_ENV production

RUN apk add --update --no-cache build-base curl-dev git nodejs yarn mariadb-dev yaml-dev zlib-dev tzdata

COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v "$(grep -A 1 "BUNDLED WITH" Gemfile.lock | tail -n 1)" \
    && bundle config set without development test \
    && bundle install --jobs=6 --retry=3 \
    && rails webpacker:install \
    && rails webpacker:install:react \
    && rails generate react:install \
    && rm -rf $GEM_HOME/cache/*.gem \
    && find $GEM_HOME/gems/ -name "*.c" -delete \                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    && find $GEM_HOME/gems/ -name "*.o" -delete

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

COPY . ./

RUN bundle exec rails assets:precompile

FROM ruby:2.6.5-alpine
EXPOSE 3000
WORKDIR /usr/src/app
RUN apk add --update --no-cache mariadb-dev tzdata nodejs

ENV GEM_HOME="/usr/src/app/vendor/bundle"
ENV PATH $GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH
ENV RAILS_ENV production
ENV RACK_ENV production
ENV NODE_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true

COPY . ./
COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY --from=builder /usr/src/app/vendor /usr/src/app/vendor
COPY --from=builder /usr/src/app/public/assets /usr/src/app/public/assets
COPY --from=builder /usr/src/app/public/packs /usr/src/app/public/packs

CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0"]
