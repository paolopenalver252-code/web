import { chromium } from "playwright";

const OUT = process.argv[2] || ".";
const url = process.argv[3] || "http://localhost:3210";
const width = parseInt(process.argv[4] || "1440", 10);
const height = parseInt(process.argv[5] || "900", 10);
const prefix = process.argv[6] || "scroll";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width, height } });
page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));
await page.goto(url);
await page.waitForLoadState("networkidle");
await page.waitForTimeout(600);

const totalHeight = await page.evaluate(() => document.body.scrollHeight);
let i = 0;
for (let y = 0; y < totalHeight; y += height) {
  await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${prefix}_${String(i).padStart(2, "0")}.png` });
  i++;
}

await browser.close();
console.log(`captured ${i} viewport screenshots, total height ${totalHeight}`);
