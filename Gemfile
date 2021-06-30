source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.3', '>= 6.0.3.3'
# Use mysql as the database for Active Record
gem 'mysql2', '>= 0.4.4'
# Use Puma as the app server
gem 'puma', '~> 4.1'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# add Gem-----------------------------------start
# Use Frontend framework
gem 'react-rails', '~> 2.6'
# Device
gem 'devise', '>= 4.8.0'
gem 'devise-i18n'
gem 'devise-i18n-views'
# 権限管理
gem 'activeadmin', '>= 2.9.0'
gem 'cancancan', '>= 3.3.0'
# ファイルアップロード＆ファイル削除
gem 'paperclip', '>= 6.1.0'
# ページネーション
gem 'kaminari', '>= 1.2.1'
# DDos攻撃
gem 'rack-attack', '>= 6.5.0'
# add Gem-----------------------------------end

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'rubocop', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec'
  gem 'rubocop-inflector'

  # add Gem-----------------------------------start
  # Test
  gem 'rspec-rails'
  # Can Model Build
  gem 'factory_bot_rails'
  # Debug
  gem 'better_errors'
  gem 'binding_of_caller'
  # N + 1
  gem 'bullet'
  # SecurityCheck
  gem 'brakeman', :require => false
  gem 'bundler-audit'
  # add Gem-----------------------------------End
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
