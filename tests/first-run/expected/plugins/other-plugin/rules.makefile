./plugins/other-plugin/generated/a.png: ./plugins/other-plugin/a.png
	mkdir -p $(dir $@)
	cp $< $@

./plugins/other-plugin/generated/b.png: ./plugins/other-plugin/b.png
	mkdir -p $(dir $@)
	cp $< $@

./plugins/other-plugin/generated/c.png: ./plugins/other-plugin/c.png
	mkdir -p $(dir $@)
	cp $< $@

./plugins/other-plugin/generated/d.png: ./plugins/other-plugin/d.png
	mkdir -p $(dir $@)
	cp $< $@

./plugins/other-plugin/generated/e.png: ./plugins/other-plugin/e.png
	mkdir -p $(dir $@)
	cp $< $@

./plugins/other-plugin/generated/dreck_texture_atlas_output_type_script_paths.txt:
	mkdir -p $(dir $@)
	echo $(DRECK_TEXTURE_ATLAS_OUTPUT_TYPE_SCRIPT_PATHS) > $@

./plugins/other-plugin/generated/dreck_texture_atlas_output_png_paths.txt:
	mkdir -p $(dir $@)
	echo $(DRECK_TEXTURE_ATLAS_OUTPUT_PNG_PATHS) > $@
