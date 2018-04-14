.PHONY: publish
all:
	@echo "type make publish"

publish:
	git commit -a -m "Added links"
	git push origin master
