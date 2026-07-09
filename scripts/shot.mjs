import { chromium } from "playwright";

const OUT = process.argv[2] || ".";

const browser = await chromium.launch({ headless: true });

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
desktop.on("console", (msg) => {
  if (msg.type() === "error") console.log("BROWSER ERROR:", msg.text());
});
desktop.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));
await desktop.goto("http://localhost:3210");
await desktop.waitForLoadState("networkidle");
await desktop.waitForTimeout(1200);
await desktop.screenshot({ path: `${OUT}/full_desktop.png`, fullPage: true });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://localhost:3210");
await mobile.waitForLoadState("networkidle");
await mobile.waitForTimeout(1200);
await mobile.screenshot({ path: `${OUT}/full_mobile.png`, fullPage: true });

await browser.close();
console.log("done");
