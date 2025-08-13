import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

// Simple, flat conversion script: put all original PNG/JPG in public/raw-images
// Output WebP files go to public/images with same basename.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const rawDir = path.join(root, 'public', 'raw-images');
const outDir = path.join(root, 'public', 'images');

if (!fs.existsSync(rawDir)) {
  // No raw images folder -> nothing to do.
  process.exit(0);
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const exts = new Set(['.png', '.jpg', '.jpeg']);
const sources = fs
  .readdirSync(rawDir)
  .filter(f => exts.has(path.extname(f).toLowerCase()));

if (!sources.length) process.exit(0);

// Determine which originals need (re)conversion based on mtime vs target .webp
const toConvert = sources.filter(file => {
  const srcPath = path.join(rawDir, file);
  const targetPath = path.join(outDir, path.parse(file).name + '.webp');
  if (!fs.existsSync(targetPath)) return true;
  const srcTime = fs.statSync(srcPath).mtimeMs;
  const tgtTime = fs.statSync(targetPath).mtimeMs;
  return srcTime > tgtTime;
});

async function run() {
  if (!toConvert.length) {
    console.log('No images need conversion.');
    return;
  }
  const quality = 50; // smaller files
  console.log(`Converting ${toConvert.length} image(s) to WebP...`);
  for (const file of toConvert) {
    const srcPath = path.join(rawDir, file);
    await imagemin([srcPath.replace(/\\/g, '/')], {
      destination: outDir,
      plugins: [
        imageminWebp({
          quality,
          method: 6, // slower, better compression
          preset: 'photo',
          alphaQuality: Math.min(quality + 10, 100),
          resize: { width: 480, height: 0 }, // cap width and preserve aspect ratio
        }),
      ],
    });
    process.stdout.write('.');
  }
  console.log('\nWebP conversion complete.');
}

run().catch(err => {
  console.error('Image conversion failed:', err);
  process.exit(1);
});
