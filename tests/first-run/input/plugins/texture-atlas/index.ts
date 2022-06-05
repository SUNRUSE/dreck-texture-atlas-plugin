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

for (const file of [{
  expected: `../../plugins/other-plugin/a.png`,
  usingKey: `textureAtlasPluginsOtherPluginGeneratedA`,
  value: textureAtlasPluginsOtherPluginGeneratedA
}, {
  expected: `../../plugins/other-plugin/b.png`,
  usingKey: `textureAtlasPluginsOtherPluginGeneratedB`,
  value: textureAtlasPluginsOtherPluginGeneratedB
}, {
  expected: `../../plugins/other-plugin/c.png`,
  usingKey: `textureAtlasPluginsOtherPluginGeneratedC`,
  value: textureAtlasPluginsOtherPluginGeneratedC
}, {
  expected: `../../plugins/other-plugin/d.png`,
  usingKey: `textureAtlasPluginsOtherPluginGeneratedD`,
  value: textureAtlasPluginsOtherPluginGeneratedD
}, {
  expected: `../../plugins/other-plugin/e.png`,
  usingKey: `textureAtlasPluginsOtherPluginGeneratedE`,
  value: textureAtlasPluginsOtherPluginGeneratedE
}]) {
  describe(file.usingKey, () => {
    let unpacked: PNG;

    beforeAll((done) => {
      unpacked = new pngjs.PNG();

      unpacked.on(`parsed`, () => {
        done();
      });

      fs.createReadStream(file.expected).pipe(unpacked);
    });

    it(`has the expected width`, () => {
      expect(file.value[0] as number).toEqual(unpacked.width);
    });

    it(`has the expected height`, () => {
      expect(file.value[1] as number).toEqual(unpacked.height);
    });

    it(`has a safe integer x offset`, () => {
      expect(Number.isSafeInteger(file.value[2])).toBeTrue();
    });

    it(`has a safe integer y offset`, () => {
      expect(Number.isSafeInteger(file.value[3])).toBeTrue();
    });

    it(`does not touch the left border`, () => {
      expect(file.value[2]).toBeGreaterThanOrEqual(1);
    });

    it(`does not touch the top border`, () => {
      expect(file.value[3]).toBeGreaterThanOrEqual(1);
    });

    it(`does not touch the right border`, () => {
      expect(file.value[2] + file.value[0]).toBeLessThanOrEqual(textureAtlasWidth - 1);
    });

    it(`does not touch the bottom border`, () => {
      expect(file.value[3] + file.value[1]).toBeLessThanOrEqual(textureAtlasHeight - 1);
    });

    it(`has packed the expected pixels`, () => {
      for (let y = 0; y < file.value[1]; y++) {
        for (let x = 0; x < file.value[0]; x++) {
          for (let channel = 0; channel < 4; channel++) {
            expect(packed.data[(y + file.value[3]) * textureAtlasWidth * 4 + (x + file.value[2]) * 4 + channel]).toEqual(unpacked.data[y * file.value[0] * 4 + x * 4 + channel])
          }
        }
      }
    });

    it(`has packed a border left of the pixels`, () => {
      for (let y = 0; y < file.value[1]; y++) {
        for (let channel = 0; channel < 4; channel++) {
          expect(packed.data[(y + file.value[3]) * textureAtlasWidth * 4 + (file.value[2] - 1) * 4 + channel]).toEqual(unpacked.data[y * file.value[0] * 4 + channel])
        }
      }
    });

    it(`has packed a border above the pixels`, () => {
      for (let x = 0; x < file.value[0]; x++) {
        for (let channel = 0; channel < 4; channel++) {
          expect(packed.data[(file.value[3] - 1) * textureAtlasWidth * 4 + (x + file.value[2]) * 4 + channel]).toEqual(unpacked.data[x * 4 + channel])
        }
      }
    });

    it(`has packed a border right of the pixels`, () => {
      for (let y = 0; y < file.value[1]; y++) {
        for (let channel = 0; channel < 4; channel++) {
          expect(packed.data[(y + file.value[3]) * textureAtlasWidth * 4 + (file.value[2] + file.value[0]) * 4 + channel]).toEqual(unpacked.data[y * file.value[0] * 4 + (file.value[0] - 1) * 4 + channel])
        }
      }
    });

    it(`has packed a border below the pixels`, () => {
      for (let x = 0; x < file.value[0]; x++) {
        for (let channel = 0; channel < 4; channel++) {
          expect(packed.data[(file.value[1] + file.value[3]) * textureAtlasWidth * 4 + (x + file.value[2]) * 4 + channel]).toEqual(unpacked.data[(file.value[1] - 1) * file.value[0] * 4 + x * 4 + channel])
        }
      }
    });

    it(`has packed a corner up and left of the pixels`, () => {
      for (let channel = 0; channel < 4; channel++) {
        expect(packed.data[(file.value[3] - 1) * textureAtlasWidth * 4 + (file.value[2] - 1) * 4 + channel]).toEqual(unpacked.data[channel])
      }
    });

    it(`has packed a corner up and right of the pixels`, () => {
      for (let channel = 0; channel < 4; channel++) {
        expect(packed.data[(file.value[3] - 1) * textureAtlasWidth * 4 + (file.value[2] + file.value[0]) * 4 + channel]).toEqual(unpacked.data[(file.value[0] - 1) * 4 + channel])
      }
    });

    it(`has packed a corner down and left of the pixels`, () => {
      for (let channel = 0; channel < 4; channel++) {
        expect(packed.data[(file.value[3] + file.value[1]) * textureAtlasWidth * 4 + (file.value[2] - 1) * 4 + channel]).toEqual(unpacked.data[(file.value[1] - 1) * file.value[0] * 4 + channel])
      }
    });

    it(`has packed a corner down and right of the pixels`, () => {
      for (let channel = 0; channel < 4; channel++) {
        expect(packed.data[(file.value[3] + file.value[1]) * textureAtlasWidth * 4 + (file.value[2] + file.value[0]) * 4 + channel]).toEqual(unpacked.data[(file.value[1] - 1) * file.value[0] * 4 + (file.value[0] - 1) * 4 + channel])
      }
    });
  });
}

it(`width`, () => {
  expect(packed.width).toEqual(textureAtlasWidth)
});

it(`height`, () => {
  expect(packed.height).toEqual(textureAtlasHeight)
});
