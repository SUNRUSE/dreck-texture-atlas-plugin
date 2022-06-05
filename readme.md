# Dreck Texture Atlas Plugin [![License](https://img.shields.io/github/license/sunruse/dreck-texture-atlas-plugin.svg)](https://github.com/sunruse/dreck-texture-atlas-plugin/blob/master/license) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

Packs PNG images into a PNG texture atlas, additionally generating TypeScript describing the resulting layout.

## Dependencies

- NodeJS 10.19.0 or later.
- NPM 6.14.4 or later.
- NPX 6.14.4 or later.

All must be available on the PATH (e.g. `node --version`, `npm --version` and `npx --version` all print version strings when executed in a Bash terminal).

### Installing on Debian-based Linux distributions

These are available from most Debian-based Linux distributions' package managers; for example, they can be installed when running Ubuntu 20.04 LTS using the following command:

```bash
sudo apt-get install nodejs npm --yes
```

### Installing within GitHub Actions

Add an appropriate [actions/setup-node](https://github.com/actions/setup-node) action step **before** the `make` action step:

```yml
name: Continuous Integration
on: [push, pull_request]
jobs:
  main:
    runs-on: ubuntu-20.04
    steps:
    - uses: actions/checkout@v3
      with:
        submodules: true

    # Insert this block:
    ###############################
    - uses: actions/setup-node@v3
      with:
        node-version: 12
    ###############################

    - run: make --file ./submodules/dreck/makefile
      shell: bash
    - if: github.event_name == 'release' && github.event.action == 'created'
      uses: softprops/action-gh-release@v1
      with:
        files: dist/**
```

## Installation

Run the following in a Bash shell at the root of your project:

```bash
git submodule add https://github.com/sunruse/dreck-texture-atlas-plugin plugins/texture-atlas
```

## Input

This plugin includes every PNG file in the `DRECK_TEXTURE_ATLAS_INPUT_PNG_PATHS` Make variable as an input PNG file.

## Output

This plugin writes two files.

### PNG

A single PNG file is written to `./plugins/texture-atlas/generated/index.png` by default; this path is also appended to the `DRECK_TEXTURE_ATLAS_OUTPUT_PNG_PATHS` Make variable.  The width and height of this file are always powers of two, but may be in-equal.

### TypeScript

A single TypeScript file is written to `./plugins/texture-atlas/generated/index.ts` by default; this path is also appended to the `DRECK_TEXTURE_ATLAS_OUTPUT_TYPE_SCRIPT_PATHS` Make variable.

This includes:

- The width of the PNG in pixel columns (`textureAtlasWidth`).
- The width of the PNG in pixel rows (`textureAtlasHeight`).
- A variable for each PNG packed into the atlas specifying its size and location, for example, if a 32x48 PNG from `./example/png-path.png` was packed 24 pixel columns from the atlas's left edge and 10 pixel rows from the atlas's top edge, a declaration similar to the following would be made:

```typescript
const textureAtlasExamplePngPath: readonly [32, 48, 24, 10] = [32, 48, 24, 10];
```
