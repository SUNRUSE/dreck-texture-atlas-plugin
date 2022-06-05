./plugins/texture-atlas/npm-install-marker: ./plugins/texture-atlas/package.json ./plugins/texture-atlas/package-lock.json
	npm ci --prefix ./plugins/texture-atlas
	touch $@

$(DRECK_TEXTURE_ATLAS_OUTPUT_TYPE_SCRIPT_PATHS) $(DRECK_TEXTURE_ATLAS_OUTPUT_PNG_PATHS): ./plugins/texture-atlas/npm-install-marker $(DRECK_TEXTURE_ATLAS_INPUT_PNG_PATHS)
	mkdir -p $(dir $@)
	node ./plugins/texture-atlas/pack.js $^
