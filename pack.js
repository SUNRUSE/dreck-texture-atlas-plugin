const fs = require(`fs`);
const freeTexPackerCore = require(`free-tex-packer-core`);
const pngjs = require(`pngjs`);

const files = process.argv.slice(3).map(path => ({ path, contents: fs.readFileSync(path) }));

if (files.length === 0) {
  const png = new pngjs.PNG({ width: 1, height: 1 });

  png.pack().pipe(fs.createWriteStream(`./plugins/texture-atlas/generated/index.png`));

  fs.writeFileSync(`./plugins/texture-atlas/generated/index.ts`, `const textureAtlasWidth: 1 = 1;
const textureAtlasHeight: 1 = 1;
`);
} else {
  const textDecoder = new TextDecoder();

  freeTexPackerCore(
    files,
    {
      powerOfTwo: true,
      extrude: 1,
      allowRotation: false,
      allowTrim: false,
      packer: `OptimalPacker`,
      exporter: `JsonArray`,
    },
    (files, error) => {
      if (error) {
        throw error;
      } else {
        const jsonFile = files.find(file => file.name === `pack-result.json`)
        const jsonText = textDecoder.decode(jsonFile.buffer);
        const json = JSON.parse(jsonText);

        const typeScript = `const textureAtlasWidth: ${json.meta.size.w} = ${json.meta.size.w};
const textureAtlasHeight: ${json.meta.size.h} = ${json.meta.size.h};

${json.frames.map(frame => `const textureAtlas${frame.filename.slice(0, frame.filename.length - 4).split(/[^\da-zA-Z]+/g).filter(segment => segment).map(segment => `${segment.slice(0, 1).toUpperCase()}${segment.slice(1)}`).join(``)}: readonly [${frame.frame.w}, ${frame.frame.h}, ${frame.frame.x}, ${frame.frame.y}] = [${frame.frame.w}, ${frame.frame.h}, ${frame.frame.x}, ${frame.frame.y}];`).join(`\n`)}
`;

        const imageFile = files.find(file => file.name === `pack-result.png`);

        fs.writeFileSync(`./plugins/texture-atlas/generated/index.ts`, typeScript);
        fs.writeFileSync(`./plugins/texture-atlas/generated/index.png`, imageFile.buffer);
      }
    }
  );
}
