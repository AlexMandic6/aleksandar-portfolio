import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";

test("record hero and work reveal frames for visual review", async ({ page }) => {
  mkdirSync("test-results/animation", { recursive: true });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1, name: "Aleksandar Mandić" })).toBeVisible();
  await page.screenshot({ path: "test-results/animation/hero-entry.png", caret: "initial" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "test-results/animation/hero-settled.png" });
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: "View project", exact: true })).toBeVisible();
  await page.screenshot({ path: "test-results/animation/work-entry.png" });
  await page.waitForTimeout(700);
  await page.screenshot({ path: "test-results/animation/work-settled.png" });
});
