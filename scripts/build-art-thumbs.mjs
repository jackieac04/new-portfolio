#!/usr/bin/env node
/**
 * Build web derivatives of the gallery artwork.
 *
 * src/assets/art/ holds masters -- 734 MB of camera JPEGs and full-resolution
 * PNG exports, one of them 58 MB on its own. Those are the right thing to keep
 * and the wrong thing to serve: the art page alone would pull a few hundred
 * megabytes, and the store now puts twenty-odd of the same images on a second
 * page.
 *
 * So each master gets two WebPs in src/assets/art-web/, mirroring the source
 * folder layout:
 *
 *   <name>.thumb.webp   1000px -- what the masonry grids load
 *   <name>.full.webp    2200px -- what a modal loads once you open a piece
 *
 * Nothing under src/assets/art/ is bundled any more; art.js globs art-web/.
 *
 *     npm run art          # or: node scripts/build-art-thumbs.mjs
 *     npm run art -- --force
 *
 * Project screenshots in src/assets/projects/ go through the same pipeline
 * into src/assets/projects-web/: a small .sticky.webp for the sticky note on
 * each /projects card, and a .full.webp for the project page gallery.
 *
 * Incremental: an output newer than its master is left alone, so the predev /
 * prebuild hooks cost nothing on a warm tree. Outputs are gitignored and
 * regenerated from the masters, which are what's committed.
 */
import { createHash } from 'node:crypto';
import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ASSETS = join(ROOT, 'src', 'assets');
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

const TREES = [
  {
    name: 'art-web',
    src: join(ASSETS, 'art'),
    out: join(ASSETS, 'art-web'),
    // Homepage/ holds the hero's animated masters. scripts/encode-hero-art.py
    // owns those; they are not gallery pieces.
    skipDirs: new Set(['Homepage']),
    variants: [
      // Grids are masonry columns, so a tile is ~400 CSS px at the widest.
      // 1000px covers that at 2x with room for the wider single-column phone
      // layout.
      { suffix: 'thumb', width: 1000, quality: 76 },
      // The modal is capped at 70vh and can go near-full-width on a large
      // display.
      { suffix: 'full', width: 2200, quality: 82 },
    ],
  },
  {
    name: 'projects-web',
    src: join(ASSETS, 'projects'),
    out: join(ASSETS, 'projects-web'),
    skipDirs: new Set(),
    variants: [
      // The sticky note is 100 CSS px square; 300px covers it at 3x.
      { suffix: 'sticky', width: 300, quality: 78 },
      // The project page gallery tops out around the main column width.
      { suffix: 'full', width: 2000, quality: 82 },
    ],
  },
];

const force = process.argv.includes('--force');

async function* walk(dir, skipDirs) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) yield* walk(path, skipDirs);
    } else if (SOURCE_EXT.has(extname(entry.name).toLowerCase())) {
      yield path;
    }
  }
}

/** True when `out` exists and is at least as new as `src`. */
async function isFresh(src, out) {
  if (force) return false;
  try {
    const [a, b] = await Promise.all([stat(src), stat(out)]);
    return b.mtimeMs >= a.mtimeMs;
  } catch {
    return false;
  }
}

async function buildTree({ name: treeName, src: SRC, out: OUT, skipDirs, variants: VARIANTS }) {
  const masters = [];
  for await (const path of walk(SRC, skipDirs)) masters.push(path);
  masters.sort();

  if (masters.length === 0) {
    throw new Error(`no source images found under ${SRC}`);
  }

  let built = 0;
  let skipped = 0;
  let srcBytes = 0;
  let outBytes = 0;
  const wanted = new Set();

  for (const src of masters) {
    const rel = relative(SRC, src);
    // Encode the whole relative path into the filename rather than recreating
    // the directory tree. Folder names carry apostrophes and spaces ("Heart's
    // Content"), and a flat, slugged name keeps the glob keys in art.js simple
    // and stable across platforms.
    const stem = rel
      .slice(0, rel.length - extname(rel).length)
      .split(sep)
      .join('__');

    srcBytes += (await stat(src)).size;

    for (const { suffix, width, quality } of VARIANTS) {
      const out = join(OUT, `${stem}.${suffix}.webp`);
      wanted.add(out);

      if (await isFresh(src, out)) {
        skipped++;
        outBytes += (await stat(out)).size;
        continue;
      }

      await mkdir(dirname(out), { recursive: true });
      await sharp(src, { failOn: 'none' })
        .rotate() // honour EXIF orientation; the phone shots need it
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 5 })
        .toFile(out);

      outBytes += (await stat(out)).size;
      built++;
    }
  }

  // Drop derivatives whose master has been renamed or deleted, so a stale file
  // can't keep showing up in the glob.
  let removed = 0;
  try {
    for (const name of await readdir(OUT)) {
      const path = join(OUT, name);
      if (name.endsWith('.webp') && !wanted.has(path)) {
        await rm(path);
        removed++;
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  // A marker so the tree is obviously generated if someone opens it directly.
  await writeFile(
    join(OUT, '.generated'),
    `${masters.length} masters -> ${VARIANTS.length} WebP variants each\n` +
      `regenerate with: npm run art\n` +
      `${createHash('sha1').update([...wanted].sort().join('\n')).digest('hex')}\n`,
  );

  const mb = (n) => `${(n / 1e6).toFixed(1)} MB`;
  console.log(
    `${treeName}: ${masters.length} masters ${mb(srcBytes)} -> ` +
      `${wanted.size} files ${mb(outBytes)} ` +
      `(${built} built, ${skipped} up to date${removed ? `, ${removed} stale removed` : ''})`,
  );
}

async function main() {
  for (const tree of TREES) await buildTree(tree);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
