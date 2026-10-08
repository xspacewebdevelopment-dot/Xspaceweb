const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_ICON = path.join(__dirname, '../public/logos/logo-icon.png');
const SOURCE_WORDMARK_LIGHT = path.join(__dirname, '../public/FinalLogo-light.png');

async function createBmpFrame(sharpImg, size) {
  // For 16px, use full bleed for maximum legibility; for 32/48 use 90%
  const paddingRatio = size === 16 ? 1.0 : 0.92;
  const innerSize = Math.round(size * paddingRatio);

  const resized = await sharpImg
    .clone()
    .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const padLeft = Math.floor((size - innerSize) / 2);
  const padTop = Math.floor((size - innerSize) / 2);

  const { data, info } = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resized, left: padLeft, top: padTop }])
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;

  // BITMAPINFOHEADER (40 bytes)
  const bih = Buffer.alloc(40);
  bih.writeUInt32LE(40, 0); // biSize
  bih.writeInt32LE(w, 4); // biWidth
  bih.writeInt32LE(h * 2, 8); // biHeight (doubled for ICO)
  bih.writeUInt16LE(1, 12); // biPlanes
  bih.writeUInt16LE(32, 14); // biBitCount
  bih.writeUInt32LE(0, 16); // biCompression (BI_RGB)
  bih.writeUInt32LE(w * h * 4, 20); // biSizeImage
  bih.writeInt32LE(0, 24);
  bih.writeInt32LE(0, 28);
  bih.writeUInt32LE(0, 32);
  bih.writeUInt32LE(0, 36);

  // XOR mask (BGRA, bottom-up)
  const xorMask = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    const srcRow = (h - 1 - y);
    for (let x = 0; x < w; x++) {
      const srcIdx = (srcRow * w + x) * 4;
      const dstIdx = (y * w + x) * 4;
      xorMask[dstIdx] = data[srcIdx + 2];     // B
      xorMask[dstIdx + 1] = data[srcIdx + 1]; // G
      xorMask[dstIdx + 2] = data[srcIdx];     // R
      xorMask[dstIdx + 3] = data[srcIdx + 3]; // A
    }
  }

  // AND mask (1 bit per pixel, padded to 32 bits per row, bottom-up)
  const andRowBytes = Math.ceil(w / 32) * 4;
  const andMask = Buffer.alloc(andRowBytes * h);
  for (let y = 0; y < h; y++) {
    const srcRow = (h - 1 - y);
    for (let x = 0; x < w; x++) {
      const srcIdx = (srcRow * w + x) * 4;
      const a = data[srcIdx + 3];
      if (a === 0) {
        const byteIdx = y * andRowBytes + Math.floor(x / 8);
        const bitIdx = 7 - (x % 8);
        andMask[byteIdx] |= (1 << bitIdx);
      }
    }
  }

  return Buffer.concat([bih, xorMask, andMask]);
}

async function createPngFrame(sharpImg, size) {
  const paddingRatio = 0.90;
  const innerSize = Math.round(size * paddingRatio);

  const resized = await sharpImg
    .clone()
    .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const padLeft = Math.floor((size - innerSize) / 2);
  const padTop = Math.floor((size - innerSize) / 2);

  return await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resized, left: padLeft, top: padTop }])
    .png()
    .toBuffer();
}

async function generateIco(srcPath, outPaths) {
  const sharpImg = sharp(srcPath);
  
  const frames = [
    { size: 16, buf: await createBmpFrame(sharpImg, 16) },
    { size: 32, buf: await createBmpFrame(sharpImg, 32) },
    { size: 48, buf: await createBmpFrame(sharpImg, 48) },
    { size: 64, buf: await createPngFrame(sharpImg, 64) },
    { size: 128, buf: await createPngFrame(sharpImg, 128) },
    { size: 256, buf: await createPngFrame(sharpImg, 256) },
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO
  header.writeUInt16LE(frames.length, 4);

  let offset = 6 + 16 * frames.length;
  const dirBuffers = [];
  const imgBuffers = [];

  for (const f of frames) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(f.size >= 256 ? 0 : f.size, 0);
    dir.writeUInt8(f.size >= 256 ? 0 : f.size, 1);
    dir.writeUInt8(0, 2);
    dir.writeUInt8(0, 3);
    dir.writeUInt16LE(1, 4);
    dir.writeUInt16LE(32, 6);
    dir.writeUInt32LE(f.buf.length, 8);
    dir.writeUInt32LE(offset, 12);
    dirBuffers.push(dir);
    imgBuffers.push(f.buf);
    offset += f.buf.length;
  }

  const finalIco = Buffer.concat([header, ...dirBuffers, ...imgBuffers]);
  for (const outPath of outPaths) {
    fs.writeFileSync(outPath, finalIco);
    console.log(`Saved ICO to: ${outPath} (${finalIco.length} bytes)`);
  }
}

async function generatePngIcon(srcPath, size, outPaths, paddingRatio = 0.88) {
  const innerSize = Math.round(size * paddingRatio);
  const resized = await sharp(srcPath)
    .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const padLeft = Math.floor((size - innerSize) / 2);
  const padTop = Math.floor((size - innerSize) / 2);

  const pngBuf = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resized, left: padLeft, top: padTop }])
    .png()
    .toBuffer();

  for (const outPath of outPaths) {
    fs.writeFileSync(outPath, pngBuf);
    console.log(`Saved PNG (${size}x${size}) to: ${outPath}`);
  }
}

async function generateOpenGraphImage() {
  const width = 1200;
  const height = 630;

  // Background with subtle tech grid and blue glow
  const bgSvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow1" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stop-color="#1668E8" stop-opacity="0.4"/>
          <stop offset="50%" stop-color="#00C2FF" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#060B18" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="cornerGlow" cx="10%" cy="10%" r="40%">
          <stop offset="0%" stop-color="#1668E8" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#060B18" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#050914"/>
          <stop offset="50%" stop-color="#0A1224"/>
          <stop offset="100%" stop-color="#030611"/>
        </linearGradient>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1"/>
        </pattern>
      </defs>

      <!-- Base dark background -->
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>

      <!-- Ambient glow -->
      <rect width="100%" height="100%" fill="url(#glow1)"/>
      <rect width="100%" height="100%" fill="url(#cornerGlow)"/>

      <!-- Border frame -->
      <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1.5"/>

      <!-- Badge -->
      <g transform="translate(600, 105)">
        <rect x="-165" y="-18" width="330" height="36" rx="18" fill="rgba(22, 104, 232, 0.16)" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1.2"/>
        <text x="0" y="5" text-anchor="middle" fill="#60A5FA" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="600" letter-spacing="2">
          INDIAN TECHNOLOGY COMPANY
        </text>
      </g>

      <!-- Tagline & Subtitle -->
      <text x="600" y="470" text-anchor="middle" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="32" font-weight="700" letter-spacing="-0.5">
        Building Digital Experiences Beyond Boundaries
      </text>

      <text x="600" y="515" text-anchor="middle" fill="#94A3B8" font-family="'Segoe UI', Arial, sans-serif" font-size="20" font-weight="400">
        Innovative SaaS Products &amp; End-to-End Digital Solutions
      </text>

      <!-- URL footer badge -->
      <g transform="translate(600, 565)">
        <rect x="-85" y="-14" width="170" height="28" rx="14" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
        <text x="0" y="5" text-anchor="middle" fill="#38BDF8" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="0.5">
          xspaceweb.com
        </text>
      </g>
    </svg>
  `;

  const bgBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  // Resize blue X logo with transparent padding
  const iconBuffer = await sharp(SOURCE_ICON)
    .resize(170, 170, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  const ogFinal = await sharp(bgBuffer)
    .composite([
      {
        input: iconBuffer,
        left: Math.round((width - 170) / 2),
        top: 165
      }
    ])
    .png()
    .toBuffer();

  const ogTargets = [
    path.join(__dirname, '../src/app/opengraph-image.png'),
    path.join(__dirname, '../src/app/twitter-image.png'),
    path.join(__dirname, '../public/og-image.png')
  ];

  for (const target of ogTargets) {
    fs.writeFileSync(target, ogFinal);
    console.log(`Saved OG image to: ${target}`);
  }
}

async function main() {
  console.log('--- Generating High Quality Favicons and Icons ---');

  // 1. Multi-resolution favicon.ico for src/app and public
  await generateIco(SOURCE_ICON, [
    path.join(__dirname, '../src/app/favicon.ico'),
    path.join(__dirname, '../public/favicon.ico')
  ]);

  // 2. High-res app icons
  await generatePngIcon(SOURCE_ICON, 512, [
    path.join(__dirname, '../src/app/icon.png'),
    path.join(__dirname, '../public/icon.png'),
    path.join(__dirname, '../public/icon-512.png')
  ]);

  await generatePngIcon(SOURCE_ICON, 192, [
    path.join(__dirname, '../public/icon-192.png')
  ]);

  await generatePngIcon(SOURCE_ICON, 180, [
    path.join(__dirname, '../src/app/apple-icon.png'),
    path.join(__dirname, '../public/apple-touch-icon.png')
  ]);

  // 3. Open Graph social preview
  await generateOpenGraphImage();

  console.log('--- All icons generated successfully! ---');
}

main().catch(err => {
  console.error('Generation error:', err);
  process.exit(1);
});
