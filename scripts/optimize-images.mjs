// Otimizacao de imagens do portfolio.
// - Converte public/projects/*.jpg -> .webp (quality 80, effort 6)
// - Recomprime PNGs grandes mantendo formato e nome (favicons, icones, og-image)
// Uso: node scripts/optimize-images.mjs
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const projectsDir = path.join(publicDir, 'projects');

const rows = [];
let totalBefore = 0;
let totalAfter = 0;

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function sizeOf(file) {
  try {
    return (await stat(file)).size;
  } catch {
    return 0;
  }
}

// 1. Converter screenshots de projetos .jpg -> .webp
async function convertProjects() {
  const entries = await readdir(projectsDir);
  const jpgs = entries.filter((f) => f.toLowerCase().endsWith('.jpg')).sort();
  for (const jpg of jpgs) {
    const srcPath = path.join(projectsDir, jpg);
    const base = jpg.replace(/\.jpg$/i, '');
    const outPath = path.join(projectsDir, `${base}.webp`);
    const before = await sizeOf(srcPath);
    const input = await readFile(srcPath);
    await sharp(input).webp({ quality: 80, effort: 6 }).toFile(outPath);
    const after = await sizeOf(outPath);
    totalBefore += before;
    totalAfter += after;
    rows.push({ name: `projects/${jpg} -> ${base}.webp`, before, after });
  }
}

// 2. Recomprimir PNGs (mesmo nome/formato) e og-image.
// Icones/favicons sao imagens de cores planas: quantizacao por paleta encolhe muito.
// Sempre mantem o MENOR entre original e recomprimido (nunca cresce).
async function recompressPngs() {
  const pngTasks = [
    { file: 'icon-512.png', resize: 512, quality: 90 },
    { file: 'icon-192.png', resize: 192, quality: 90 },
    { file: 'apple-touch-icon.png', resize: 180, quality: 90 },
    { file: 'favicon-32.png', resize: 32, quality: 90 },
    { file: 'favicon-16.png', resize: 16, quality: 90 },
    { file: 'og-image.png', resize: [1200, 630], quality: 80 },
  ];

  for (const { file, resize, quality } of pngTasks) {
    const filePath = path.join(publicDir, file);
    const before = await sizeOf(filePath);
    if (before === 0) {
      rows.push({ name: file, before: 0, after: 0, note: 'ausente, ignorado' });
      continue;
    }
    // Ler para buffer ANTES de sobrescrever (sharp nao le/escreve o mesmo path).
    const input = await readFile(filePath);
    const [w, h] = Array.isArray(resize) ? resize : [resize, resize];
    const out = await sharp(input)
      .resize(w, h, { fit: 'cover' })
      .png({ compressionLevel: 9, palette: true, quality, effort: 10 })
      .toBuffer();
    // Nunca crescer: se a recompressao ficou maior que o arquivo atual, mantem o atual.
    const finalBuf = out.length < input.length ? out : input;
    if (finalBuf !== input) await writeFile(filePath, finalBuf);
    const after = finalBuf.length;
    totalBefore += before;
    totalAfter += after;
    rows.push({
      name: file,
      before,
      after,
      note: finalBuf === input ? 'mantido (recompressao nao reduziu)' : undefined,
    });
  }
}

async function main() {
  await convertProjects();
  await recompressPngs();

  const nameW = Math.max(...rows.map((r) => r.name.length), 'ARQUIVO'.length);
  const pad = (s, w) => s.padEnd(w);
  const padL = (s, w) => s.padStart(w);

  console.log('\n' + pad('ARQUIVO', nameW) + '  ' + padL('ANTES', 10) + '  ' + padL('DEPOIS', 10) + '  ' + padL('ECONOMIA', 12));
  console.log('-'.repeat(nameW + 2 + 10 + 2 + 10 + 2 + 12));
  for (const r of rows) {
    const saved = r.before - r.after;
    const pct = r.before > 0 ? `(-${((saved / r.before) * 100).toFixed(0)}%)` : '';
    const econ = r.note ? r.note : `${fmt(saved)} ${pct}`;
    console.log(pad(r.name, nameW) + '  ' + padL(fmt(r.before), 10) + '  ' + padL(fmt(r.after), 10) + '  ' + padL(econ, 12));
  }
  console.log('-'.repeat(nameW + 2 + 10 + 2 + 10 + 2 + 12));
  const savedTotal = totalBefore - totalAfter;
  const pctTotal = totalBefore > 0 ? ((savedTotal / totalBefore) * 100).toFixed(1) : '0';
  console.log(pad('TOTAL', nameW) + '  ' + padL(fmt(totalBefore), 10) + '  ' + padL(fmt(totalAfter), 10) + '  ' + padL(`${fmt(savedTotal)} (-${pctTotal}%)`, 18));
  console.log('');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
