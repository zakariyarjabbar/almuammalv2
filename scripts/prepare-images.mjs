import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
if (!process.argv[2])
  throw new Error(
    'Pass the absolute directory containing the original image assets.',
  );
const source = new URL('file://' + process.argv[2].replace(/\/$/, '') + '/');
const output = new URL('../public/images/', import.meta.url);
await mkdir(output, { recursive: true });
const assets = {
  cafe: 'hero-cafe-rawwaq.png',
  workshop: 'printing-workshop.png',
  van: 'vehicle-wrap-zad.png',
  posters: 'almoammal-art-posters.png',
  glass: 'boutique-glass.png',
  neon: 'cafe-neon.png',
  led: 'showroom-led.png',
};
for (const [name, file] of Object.entries(assets)) {
  for (const width of [640, 960, 1536]) {
    await sharp(new URL(file, source).pathname)
      .resize({ width })
      .webp({ quality: width === 1536 ? 83 : 80, effort: 5 })
      .toFile(new URL(`${name}-${width}.webp`, output).pathname);
  }
}
await sharp(new URL('almoammal-social-card.png', source).pathname)
  .png({ compressionLevel: 9, palette: true, quality: 95 })
  .toFile(new URL('../public/og.png', import.meta.url).pathname);
for (const [size, file] of [
  [32, 'favicon-32.png'],
  [180, 'apple-touch-icon.png'],
  [192, 'icon-192.png'],
  [512, 'icon-512.png'],
]) {
  await sharp(new URL('../public/favicon.svg', import.meta.url).pathname)
    .resize(size, size)
    .png()
    .toFile(new URL(`../public/${file}`, import.meta.url).pathname);
}
await writeFile(
  new URL('../public/images/provenance.json', import.meta.url),
  JSON.stringify(
    {
      type: 'original-generated',
      notice:
        'Original AI-generated photographs commissioned for this fictional website. These depict illustrative concepts, not real client projects.',
      assets,
    },
    null,
    2,
  ),
);
console.log('Prepared 21 responsive WebP images, social card and site icons.');
