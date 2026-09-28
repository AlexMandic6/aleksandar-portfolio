import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";

test("record hero and work reveal frames for visual review", async ({ page }) => {
  mkdirSync("test-results/animation", { recursive: true });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => {
    const line = document.querySelector<HTMLElement>("[data-hero-letter]");
    return line && line.style.opacity !== "" && Number(line.style.opacity) < 1;
  }, undefined, { timeout: 3000 });
  const entryOpacity = await page.locator("[data-hero-letter]").first().evaluate(element => Number((element as HTMLElement).style.opacity));
  expect(entryOpacity).toBeGreaterThanOrEqual(0);
  await page.screenshot({ path: "test-results/animation/hero-entry.png" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "test-results/animation/hero-settled.png" });
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/animation/work-entry.png" });
  await page.waitForTimeout(700);
  await page.screenshot({ path: "test-results/animation/work-settled.png" });
});
