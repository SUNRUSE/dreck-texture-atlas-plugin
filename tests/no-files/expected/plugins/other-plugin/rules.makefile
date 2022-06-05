./plugins/other-plugin/generated/dreck_texture_atlas_output_type_script_paths.txt:
	mkdir -p $(dir $@)
	echo $(DRECK_TEXTURE_ATLAS_OUTPUT_TYPE_SCRIPT_PATHS) > $@

./plugins/other-plugin/generated/dreck_texture_atlas_output_png_paths.txt:
	mkdir -p $(dir $@)
	echo $(DRECK_TEXTURE_ATLAS_OUTPUT_PNG_PATHS) > $@
