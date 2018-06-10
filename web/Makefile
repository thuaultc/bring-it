REGISTRY = registry.thuault.com
VERSION = 0.2.0

docker-image: build
	docker build -t $(REGISTRY)/bring-it/web:$(VERSION) .
	docker push $(REGISTRY)/bring-it/web:$(VERSION)

build:
	yarn build
