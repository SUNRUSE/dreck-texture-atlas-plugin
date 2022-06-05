#!/usr/bin/env bats

@test "first run" {
  repository=$(pwd)
  temporaryDirectory=$(mktemp -d)
  expected=$temporaryDirectory/expected
  cp -r ./tests/first-run/expected/. $expected
  mkdir -p $expected/plugins/dreck
  cp -r ./plugins/dreck $expected/plugins
  mkdir -p $expected/plugins/texture-atlas
  cp -r . $expected/plugins/texture-atlas
  actual=$temporaryDirectory/actual
  cp -r ./tests/first-run/input/. $actual
  mkdir -p $actual/plugins/dreck
  cp -r ./plugins/dreck $actual/plugins
  mkdir -p $actual/plugins/texture-atlas
  cp -r . $actual/plugins/texture-atlas
  cd $actual

  make --file ./plugins/dreck/makefile

  cd $actual/plugins/texture-atlas
  npm test
  rm -r $actual/plugins/texture-atlas/node_modules $actual/plugins/texture-atlas/npm-install-marker $actual/plugins/texture-atlas/generated $actual/plugins/texture-atlas/index.js
  cd $repository
  diff --brief --recursive $actual $expected
  rm -rf $temporaryDirectory
}

@test "no files" {
  repository=$(pwd)
  temporaryDirectory=$(mktemp -d)
  expected=$temporaryDirectory/expected
  cp -r ./tests/no-files/expected/. $expected
  mkdir -p $expected/plugins/dreck
  cp -r ./plugins/dreck $expected/plugins
  mkdir -p $expected/plugins/texture-atlas
  cp -r . $expected/plugins/texture-atlas
  actual=$temporaryDirectory/actual
  cp -r ./tests/no-files/input/. $actual
  mkdir -p $actual/plugins/dreck
  cp -r ./plugins/dreck $actual/plugins
  mkdir -p $actual/plugins/texture-atlas
  cp -r . $actual/plugins/texture-atlas
  cd $actual

  make --file ./plugins/dreck/makefile

  cd $actual/plugins/texture-atlas
  npm test
  rm -r $actual/plugins/texture-atlas/node_modules $actual/plugins/texture-atlas/npm-install-marker $actual/plugins/texture-atlas/generated $actual/plugins/texture-atlas/index.js
  cd $repository
  diff --brief --recursive $actual $expected
  rm -rf $temporaryDirectory
}
