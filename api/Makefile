REGISTRY = registry.thuault.com

docker-image: api
	docker build -t $(REGISTRY)/bring-it/api:0.1.2 .

.PHONY: api
api:
	GOOS=linux GOARCH=amd64 go build -o $@ ./cmd/api
