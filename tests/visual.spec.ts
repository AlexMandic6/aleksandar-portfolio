import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";

test("capture desktop and mobile renders with asset diagnostics", async ({ page }) => {
  const failures: string[] = [];
  page.on("pageerror", error => failures.push(error.message));
  page.on("requestfailed", request => failures.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`));
  page.on("response", response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  mkdirSync("test-results/visual", { recursive: true });
  for (const { label, width, height } of [
    { label: "desktop", width: 1440, height: 1000 },
    { label: "mobile", width: 390, height: 844 },
    { label: "small-mobile", width: 360, height: 780 },
  ]) {
    await page.setViewportSize({ width, height });
    for (const { route, name } of [
      { route: "/", name: "home" },
      { route: "/work/saloon-booking", name: "project" },
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("main")).toBeVisible();
      await page.screenshot({ path: `test-results/visual/${name}-${label}.png`, fullPage: true });
      if (name === "home") {
        await page.locator("#contact").screenshot({ path: `test-results/visual/contact-${label}.png` });
      }
    }
  }
  expect(failures).toEqual([]);
});

test("switching to reduced motion leaves the hero visibly still", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const heading = page.getByRole("heading", { level: 1, name: "Aleksandar Mandić" });
  await expect(heading).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => document.fonts.ready);
  await expect(heading).toBeVisible();
  const hero = page.locator(".hero");
  const settled = await hero.screenshot();
  await page.waitForTimeout(350);
  expect(await hero.screenshot()).toEqual(settled);
});

test("keyboard skip link and narrow viewport remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 720, height: 500 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBe(false);
});

test("720px viewport reflow preserves identity and action", async ({ page }) => {
  mkdirSync("test-results/visual", { recursive: true });
  await page.setViewportSize({ width: 720, height: 450 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: "View selected work" })).toBeVisible();
  await page.screenshot({ path: "test-results/visual/home-viewport-720.png" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBe(false);
});

test("capture a local performance trace for the entrance and project reveal", async ({ page }) => {
  mkdirSync("test-results/visual", { recursive: true });
  await page.addInitScript(() => {
    (window as Window & { __portfolioPerf?: { longTasks: number; layoutShift: number } }).__portfolioPerf = { longTasks: 0, layoutShift: 0 };
    const metrics = (window as Window & { __portfolioPerf?: { longTasks: number; layoutShift: number } }).__portfolioPerf!;
    new PerformanceObserver(list => { metrics.longTasks += list.getEntries().length; }).observe({ type: "longtask", buffered: true });
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
        if (!shift.hadRecentInput) metrics.layoutShift += shift.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.context().tracing.start({ screenshots: true, snapshots: true });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const metrics = await page.evaluate(() => (window as Window & { __portfolioPerf?: { longTasks: number; layoutShift: number } }).__portfolioPerf);
  await page.context().tracing.stop({ path: "test-results/visual/performance-trace.zip" });
  console.log("Local performance diagnostic:", metrics);
  expect(metrics?.layoutShift).toBeLessThan(0.1);
});
