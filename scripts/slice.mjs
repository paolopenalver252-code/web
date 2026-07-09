import sharp from "sharp";

const [, , input, outDir, heightStr] = process.argv;
const sliceH = parseInt(heightStr || "1100", 10);

const img = sharp(input);
const meta = await img.metadata();
const total = meta.height;
let i = 0;
for (let y = 0; y < total; y += sliceH) {
  const h = Math.min(sliceH, total - y);
  await sharp(input).extract({ left: 0, top: y, width: meta.width, height: h }).toFile(`${outDir}/slice_${String(i).padStart(2, "0")}.png`);
  i++;
}
console.log(`sliced into ${i} parts, total height ${total}`);
