REGISTRY = registry.thuault.com
VERSION = 1.0.2

build: api
	REGISTRY=$(REGISTRY) VERSION=$(VERSION) docker-compose build

push: build
	REGISTRY=$(REGISTRY) VERSION=$(VERSION) docker-compose push

run:
	REGISTRY=$(REGISTRY) VERSION=$(VERSION) docker-compose up -d

clean:
	REGISTRY=$(REGISTRY) VERSION=$(VERSION) docker-compose down

.PHONY: api
api:
	GOOS=linux GOARCH=amd64 go build -ldflags "-linkmode external -extldflags -static" -o $@ -a ./cmd/api

