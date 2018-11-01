REGISTRY = registry.thuault.com
VERSION = 0.5.0

docker-image: build
	docker build -t $(REGISTRY)/bring-it/web:$(VERSION) .
	docker push $(REGISTRY)/bring-it/web:$(VERSION)

build:
	yarn build

run:
	rm -rf node_modules
	yarn
	yarn start
