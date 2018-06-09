REGISTRY = registry.thuault.com
VERSION = 0.1.6

docker-image: build
	docker build -t $(REGISTRY)/bring-it/web:$(VERSION) .
	docker push $(REGISTRY)/bring-it/web:$(VERSION)

build:
	yarn build
