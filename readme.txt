# this command run for cmd
docker-compose run web rails new . --force --no-deps --database=mysql --skip-test --webpacker

# add command -> Gemfile
------------------------------------
# Use Frontend framework
gem 'react-rails'
------------------------------------
# install react-rails(volume update)
docker-compose run --rm web bundle install

# container build
docker-compose build

# container start
docker-compose up

# container stop
docker-compose down

-----
#[memo]
■file setting
　・文字コード：utf8
　・改行コード：LF

■move container list
docker ps

■stop container list
docker ps -a

■container stop & container remove
docker-compose down --rmi all

■container del
docker rm [containerID]