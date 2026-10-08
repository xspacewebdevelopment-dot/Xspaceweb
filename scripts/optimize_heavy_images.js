const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDirs = [
  'public/images/hero',
  'public/images/home',
  'public/images/studio',
  'public/images/selected-work',
  'public/images/recent-work',
  'public/images/about',
  'public/images/technologies',
  'public/images/company',
  'public/images/contact'
];

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  if (stat.size < 200 * 1024) return; // Skip files already < 200KB

  const originalSize = stat.size;
  const tempPath = filePath + '.tmp';

  try {
    const inputBuf = fs.readFileSync(filePath);
    if (ext === '.jpg' || ext === '.jpeg') {
      const buf = await sharp(inputBuf)
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
      if (buf.length < originalSize) {
        fs.writeFileSync(filePath, buf);
        const savedKB = ((originalSize - buf.length) / 1024).toFixed(0);
        const percent = (((originalSize - buf.length) / originalSize) * 100).toFixed(1);
        console.log(`Optimized ${path.basename(filePath)}: ${(originalSize/1024).toFixed(0)}KB -> ${(buf.length/1024).toFixed(0)}KB (-${percent}%, saved ${savedKB}KB)`);
      }
    } else if (ext === '.png') {
      const buf = await sharp(inputBuf)
        .png({ compressionLevel: 9, quality: 80, effort: 7 })
        .toBuffer();
      if (buf.length < originalSize) {
        fs.writeFileSync(filePath, buf);
        const savedKB = ((originalSize - buf.length) / 1024).toFixed(0);
        const percent = (((originalSize - buf.length) / originalSize) * 100).toFixed(1);
        console.log(`Optimized ${path.basename(filePath)}: ${(originalSize/1024).toFixed(0)}KB -> ${(buf.length/1024).toFixed(0)}KB (-${percent}%, saved ${savedKB}KB)`);
      }
    }
  } catch (err) {
    console.error(`Failed to optimize ${filePath}:`, err.message);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

async function processDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  for (const f of files) {
    const full = path.join(dirPath, f);
    const s = fs.statSync(full);
    if (s.isDirectory()) {
      await processDir(full);
    } else if (/\.(jpe?g|png)$/i.test(f)) {
      await optimizeFile(full);
    }
  }
}

async function main() {
  console.log('--- Starting Heavy Image Compression ---');
  for (const dir of targetDirs) {
    console.log(`Processing ${dir}...`);
    await processDir(path.resolve(dir));
  }
  console.log('--- Image Compression Completed ---');
}

main();
