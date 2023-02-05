.phony: *

dev:
	zola serve

release:
	zola build
	mc mirror --overwrite --remove ./public rknt/rknt.de
