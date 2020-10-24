DIST_CSS := css/dist/index.css

css: css/src/index.scss
	sass $< ${DIST_CSS} --no-source-map

css-watch: css/src/index.scss
	sass $< ${DIST_CSS} --no-source-map --watch


.PHONY: clean

clean:
	rm -r css/dist/*

