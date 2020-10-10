# README

This README would normally document whatever steps are necessary to get the
application up and running.

## INSTALL
```
bundle install
yarn install
bundle exec rake db:create
bundle exec rake ridge:apply ALLOW_DROP_TABLE=1 ALLOW_REMOVE_COLUMN=1
```

## RUN
```
forman start
```

## Add CORS
- Gemfile: 
```
gem 'rack-cors'
```

- config/initializers/cors.rb:
```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: %i[get post patch put delete]
  end
end
```
## Using OpenSSL generate secret_key_base
```
openssl rand -hex 64
```

To make a new entry in config/secrets.yml you can use the following Rake command to get a new key base:
```
rake secret
```
