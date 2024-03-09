.phony: *

dev:
	zola serve -p 8080

release:
	zola build
	mc mirror --overwrite --remove ./public rknt/rknt.de
