declare function require(module: string): unknown

declare class PNG {
  on(event: `parsed`, then: () => void): void
  readonly width: number
  readonly height: number
  readonly data: ReadonlyArray<number>
}

const fs = require(`fs`) as {
  createReadStream(from: string): {
    pipe(png: PNG): void
  }
}

const pngjs = require(`pngjs`) as {
  PNG: {
    new(): PNG
  }
}

let packed: PNG;

beforeAll((done) => {
  packed = new pngjs.PNG();

  packed.on(`parsed`, () => {
    done();
  });

  fs.createReadStream(`../../plugins/texture-atlas/generated/index.png`).pipe(packed);
});

it(`width constant`, () => {
  expect(packed.width).toEqual(textureAtlasWidth);
});

it(`height constant`, () => {
  expect(packed.height).toEqual(textureAtlasHeight);
});

it(`width`, () => {
  expect(packed.width).toEqual(1);
});

it(`height`, () => {
  expect(packed.width).toEqual(1);
});

it(`produces a transparent PNG`, () => {
  expect(Array.from(packed.data)).toEqual([0, 0, 0, 0]);
});
