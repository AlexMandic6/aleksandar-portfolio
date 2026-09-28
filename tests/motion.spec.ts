import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";

test("project copy stays still while the illustration assembles", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-hero-letter]").first()).toHaveAttribute("style", /opacity/);
  const panel = page.locator(".work-panel");
  await expect(panel.locator("..")).toHaveCSS("transform", "none");
  await expect(panel.locator("..")).toHaveCSS("opacity", "1");
});

for (const width of [390, 1440]) {
  test(`motion lifecycle and captured progression at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    mkdirSync("test-results/animation", { recursive: true });
    await page.goto("/");
    await page.waitForFunction(() => document.querySelector<HTMLElement>("[data-hero-letter]")?.style.opacity);
    await page.screenshot({ path: `test-results/animation/hero-${width}-early.png` });
    await page.waitForTimeout(160);
    await page.screenshot({ path: `test-results/animation/hero-${width}-middle.png` });
    await page.waitForTimeout(850);
    const targets = page.locator("[data-hero-letter], [data-hero-dot], [data-hero-plane], [data-booking-detail]");
    // Jump directly to the artwork so the actual trigger, not the section heading, enters view.
    await page.locator(".work-art").evaluate(element => element.scrollIntoView({ behavior: "instant", block: "center" }));
    await page.waitForTimeout(90);
    await page.screenshot({ path: `test-results/animation/work-${width}-early.png` });
    await page.waitForTimeout(180);
    await page.screenshot({ path: `test-results/animation/work-${width}-middle.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const target of await targets.all()) {
      await expect(target).toHaveCSS("opacity", "1");
      await expect(target).not.toHaveAttribute("style", /transform|opacity/);
    }
    await page.emulateMedia({ reducedMotion: "no-preference" });
    for (let cycle = 0; cycle < 3; cycle++) {
      await page.getByRole("link", { name: "View project", exact: true }).click();
      await expect(page).toHaveURL(/\/work\/saloon-booking$/);
      await page.getByRole("link", { name: /, home$/ }).click();
      await expect(page).toHaveURL("/");
      await page.waitForTimeout(900);
    }
    // Interrupt a fresh entrance, then cross the mobile breakpoint in both directions.
    await page.reload();
    await page.waitForFunction(() => document.querySelector<HTMLElement>("[data-hero-letter]")?.style.opacity);
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const target of await targets.all()) await expect(target).not.toHaveAttribute("style", /transform|opacity/);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    for (const resizedWidth of [1440, 390, 1440]) {
      await page.setViewportSize({ width: resizedWidth, height: 900 });
      for (const target of await targets.all()) await expect(target).not.toHaveAttribute("style", /transform|opacity/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
    }
    expect(errors).toEqual([]);
  });
}

test("keyboard link feedback matches hover and reduced motion removes movement", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("link", { name: "View project", exact: true });
  await link.focus();
  await expect(link).toHaveCSS("color", "rgb(255, 107, 53)");
  await expect(link.locator(".arrow")).not.toHaveCSS("transform", "none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(link.locator(".arrow")).toHaveCSS("transform", "none");
});
