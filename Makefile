.PHONY: publish
all:
	@echo "type make publish"

view:
	cd docs
	python -m SimpleHTTPServer 8000

publish:
	git commit -a -m "Added links"
	git push origin master
