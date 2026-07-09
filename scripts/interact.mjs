import { chromium } from "playwright";

const OUT = process.argv[2] || ".";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (err) => errors.push(err.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

// contact form submit
await page.goto("http://localhost:3210/contacto");
await page.waitForLoadState("networkidle");
await page.fill("#name", "Ana García");
await page.fill("#email", "ana@clinicavitalis.es");
await page.fill("#clinic", "Clínica Vitalis");
await page.click('button[type="submit"]');
await page.waitForTimeout(1400);
await page.screenshot({ path: `${OUT}/contact_success.png` });

// mobile menu
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on("pageerror", (err) => errors.push(err.message));
await mobile.goto("http://localhost:3210");
await mobile.waitForLoadState("networkidle");
await mobile.click('button[aria-label="Abrir menú"]');
await mobile.waitForTimeout(700);
await mobile.screenshot({ path: `${OUT}/mobile_menu.png` });

// scrolled navbar state
const nav = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await nav.goto("http://localhost:3210");
await nav.waitForLoadState("networkidle");
await nav.evaluate(() => window.scrollTo(0, 400));
await nav.waitForTimeout(800);
await nav.screenshot({ path: `${OUT}/navbar_scrolled.png`, clip: { x: 0, y: 0, width: 1440, height: 140 } });

await browser.close();

if (errors.length) {
  console.log("ERRORS FOUND:");
  console.log(errors.join("\n"));
} else {
  console.log("no console/page errors");
}
