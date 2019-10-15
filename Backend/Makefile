help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  start               to make a container for development and setup the database"
	@echo "  stop                to remove all of the containers and their volumes"
	@echo "  test-run            to make a container, setup the database, run the tests and tear it down"
	@echo "  jenkins-build       to make a container and database like the one Jenkins uses"
	@echo "  clean               to clean out Laravel's cache"
	@echo "  build-docker        to build a container"
	@echo "  migrate             to setup the database"
	@echo "  test                to run the tests"
	@echo "  test-code-coverage  to run the tests and generate a code coverage report"

start: build-docker migrate
stop: post clean

test-run: build-docker migrate test post
jenkins-build: build-docker-jenkins migrate

clean:
		rm bootstrap/cache/*.php

build-docker:
		docker-compose ${DOCKER_APP_PREFIX} up --build -d

build-docker-jenkins:
		docker-compose ${DOCKER_APP_PREFIX} -f docker-compose-jenkins.yml up --build -d --no-color

migrate:
		docker-compose ${DOCKER_APP_PREFIX} exec -T app ./wait-for-it.sh mariadb:3306 -t 300
		docker-compose ${DOCKER_APP_PREFIX} exec -T app php artisan migrate

test:
		docker-compose ${DOCKER_APP_PREFIX} exec -T app vendor/bin/phpunit
		docker-compose ${DOCKER_APP_PREFIX} exec -T app vendor/bin/behat

test-code-coverage:
		docker-compose ${DOCKER_APP_PREFIX} exec -T app vendor/bin/phpunit --whitelist=app --coverage-html=public/cc

post:
		docker-compose ${DOCKER_APP_PREFIX} down -v --rmi local
