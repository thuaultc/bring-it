REGISTRY = registry.thuault.com

docker-image: build
	docker build -t $(REGISTRY)/bring-it/web:0.1.0 .

build:
	yarn build
