import { chromium } from "playwright";

const OUT = process.argv[2] || ".";
const browser = await chromium.launch({ headless: true });
const errors = [];

// 1) full sequence, fresh session
{
  const page = await browser.newPage({ viewport: { width: 1600, height: 950 } });
  page.on("pageerror", (e) => errors.push(`seq: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`seq: ${m.text()}`); });
  await page.goto("http://localhost:3210");
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/intro_00_black.png` });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${OUT}/intro_01_forming.png` });
  await page.waitForTimeout(3600); // ~5.8s total: network established
  await page.screenshot({ path: `${OUT}/intro_02_network.png` });
  await page.waitForTimeout(1800); // ~7.6s: headline generating/done
  await page.screenshot({ path: `${OUT}/intro_03_headline.png` });
  await page.waitForTimeout(1800); // ~9.4s: subtitle + cta
  await page.screenshot({ path: `${OUT}/intro_04_cta.png` });
  await page.waitForTimeout(2600); // ~12s: dissolved into real Hero
  await page.screenshot({ path: `${OUT}/intro_05_hero.png` });
  await page.close();
}

// 2) skip button works and unmounts cleanly
{
  const page = await browser.newPage({ viewport: { width: 1600, height: 950 } });
  page.on("pageerror", (e) => errors.push(`skip: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`skip: ${m.text()}`); });
  await page.goto("http://localhost:3210");
  await page.waitForTimeout(1700);
  await page.getByText("Saltar intro").click();
  await page.waitForTimeout(1400);
  const overlayGone = (await page.locator('[role="dialog"]').count()) === 0;
  const scrollLocked = await page.evaluate(() => document.body.style.overflow);
  console.log("skip: overlay removed =", overlayGone, "| body overflow after skip =", JSON.stringify(scrollLocked));
  await page.screenshot({ path: `${OUT}/intro_06_after_skip.png` });
  await page.close();
}

// 3) reduced motion: intro must never play
{
  const page = await browser.newPage({ viewport: { width: 1600, height: 950 }, reducedMotion: "reduce" });
  page.on("pageerror", (e) => errors.push(`reduced: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`reduced: ${m.text()}`); });
  await page.goto("http://localhost:3210");
  await page.waitForTimeout(600);
  const dialogCount = await page.locator('[role="dialog"]').count();
  console.log("reduced-motion: dialog present =", dialogCount > 0, "(should be false)");
  await page.screenshot({ path: `${OUT}/intro_07_reduced_motion.png` });
  await page.close();
}

// 4) second homepage load in the SAME context: session already seen
{
  const context = await browser.newContext({ viewport: { width: 1600, height: 950 } });
  const page = await context.newPage();
  await page.goto("http://localhost:3210");
  await page.waitForTimeout(1500);
  await page.reload();
  await page.waitForTimeout(600);
  const dialogCount = await page.locator('[role="dialog"]').count();
  console.log("second load (same session): dialog present =", dialogCount > 0, "(should be false)");
  await page.screenshot({ path: `${OUT}/intro_08_second_load.png` });
  await context.close();
}

// 5) mobile
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on("pageerror", (e) => errors.push(`mobile: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`mobile: ${m.text()}`); });
  await page.goto("http://localhost:3210");
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${OUT}/intro_09_mobile.png` });
  await page.close();
}

console.log(errors.length ? "ERRORS:\n" + errors.join("\n") : "no console/page errors");
await browser.close();
