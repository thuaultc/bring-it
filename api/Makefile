REGISTRY = registry.thuault.com
VERSION = 1.0.1

docker-image: api
	docker build -t $(REGISTRY)/bring-it/api:$(VERSION) .
	docker push $(REGISTRY)/bring-it/api:$(VERSION)

.PHONY: api
api:
	GOOS=linux GOARCH=amd64 go build -ldflags "-linkmode external -extldflags -static" -o $@ -a ./cmd/api

