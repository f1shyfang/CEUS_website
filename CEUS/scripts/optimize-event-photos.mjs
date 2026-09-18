/**
 * Resizes photos for the events hero collage before they are uploaded to the
 * `event-photos` folder of the Supabase `events` bucket.
 *
 * The collage draws each photo into a tile that is roughly 200px wide, so a
 * camera original is about twenty times larger than anything a viewer sees.
 * next/image cannot help here, as images.unoptimized is set in next.config.js,
 * which is why the stored files need to be sized for display.
 *
 * Usage:
 *   node scripts/optimize-event-photos.mjs <file-or-directory>... [options]
 *
 * Options:
 *   --out <dir>       Where to write the results (default: ./optimized-event-photos)
 *   --size <px>       Longest edge of the output (default: 900)
 *   --quality <1-100> WebP quality (default: 80)
 *
 * Example:
 *   node scripts/optimize-event-photos.mjs ~/Desktop/camp-photos --out ~/Downloads/ready
 *
 * Upload the results to event-photos/ and delete the originals they replace;
 * the collage lists the folder, so leaving both shows each photo twice.
 */
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

function parseArgs(argv) {
  const inputs = [];
  const options = { out: 'optimized-event-photos', size: 900, quality: 80 };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out' || arg === '--size' || arg === '--quality') {
      const value = argv[i + 1];
      if (value === undefined) throw new Error(`${arg} needs a value`);
      if (arg === '--out') {
        options.out = value;
      } else {
        const parsed = Number(value);
        if (!Number.isFinite(parsed) || parsed <= 0) throw new Error(`${arg} needs a positive number`);
        options[arg.slice(2)] = parsed;
      }
      i += 1;
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option ${arg}`);
    } else {
      inputs.push(arg);
    }
  }

  return { inputs, options };
}

// Directories are read one level deep, which is how the photos tend to arrive.
async function collectFiles(inputs) {
  const files = [];

  for (const input of inputs) {
    const info = await stat(input);

    if (info.isDirectory()) {
      const entries = await readdir(input, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
          files.push(path.join(input, entry.name));
        }
      }
    } else if (SOURCE_EXTENSIONS.has(path.extname(input).toLowerCase())) {
      files.push(input);
    } else {
      console.warn(`Skipping ${input}: not an image this script handles`);
    }
  }

  return files;
}

const formatMb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;
const formatKb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  const { inputs, options } = parseArgs(process.argv.slice(2));

  if (inputs.length === 0) {
    console.error('Usage: node scripts/optimize-event-photos.mjs <file-or-directory>... [--out dir] [--size px] [--quality 1-100]');
    process.exit(1);
  }

  const files = await collectFiles(inputs);

  if (files.length === 0) {
    console.error('No images found in the given paths.');
    process.exit(1);
  }

  await mkdir(options.out, { recursive: true });

  let sourceBytes = 0;
  let outputBytes = 0;

  for (const file of files) {
    const input = await readFile(file);
    const metadata = await sharp(input).metadata();

    // rotate() with no argument applies the EXIF orientation, so photos taken
    // on a phone are not written out sideways once that tag is dropped.
    const output = await sharp(input)
      .rotate()
      .resize({ width: options.size, height: options.size, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: options.quality })
      .toBuffer();

    const outputName = `${path.basename(file, path.extname(file))}.webp`;
    await writeFile(path.join(options.out, outputName), output);

    sourceBytes += input.length;
    outputBytes += output.length;

    console.log(
      `  ${path.basename(file)} (${metadata.width}x${metadata.height}, ${formatMb(input.length)})` +
        ` -> ${outputName} (${formatKb(output.length)})`,
    );
  }

  const saved = sourceBytes > 0 ? 100 - (outputBytes / sourceBytes) * 100 : 0;
  console.log(
    `\n${files.length} photo(s): ${formatMb(sourceBytes)} -> ${formatKb(outputBytes)} (${saved.toFixed(1)}% smaller)`,
  );
  console.log(`Written to ${path.resolve(options.out)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
