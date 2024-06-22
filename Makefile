.PHONY: dev
dev:
	zola serve -p 8080

.PHONY: release
release:
	zola build
	mc mirror --overwrite --remove ./public rknt/rknt.de

