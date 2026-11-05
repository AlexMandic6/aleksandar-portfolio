import { test, expect } from "@playwright/test";

for (const hasTouch of [false, true]) {
  test(`hero ghost fibers render and animate with touch capability ${hasTouch}`, async ({
    browser,
    baseURL,
  }) => {
    // Software WebGL in headless Chromium is slower than a hardware-backed browser.
    test.setTimeout(60_000);
    const context = await browser.newContext({
      baseURL,
      viewport: { width: 948, height: 1600 },
      hasTouch,
      reducedMotion: "no-preference",
    });
    try {
      const page = await context.newPage();
      await page.goto("/");
      if (hasTouch) {
        expect(
          await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches),
        ).toBe(false);
      }
      const canvas = page.locator(".ghost-fibers-canvas");
      await expect(canvas).toHaveAttribute("data-ready", "");
      // Isolate the fibers so name and tech-stack motion cannot satisfy this assertion.
      await page.addStyleTag({ content: ".hero-content { visibility: hidden !important; }" });
      const background = page.locator(".hero-background");
      const bounds = await background.boundingBox();
      expect(bounds).not.toBeNull();
      // Capture the region directly, avoiding locator scrolling between animated frames.
      const still = await page.screenshot({ clip: bounds! });
      await page.mouse.move(bounds!.x + bounds!.width * 0.6, bounds!.y + bounds!.height * 0.5);
      await page.waitForTimeout(500);
      expect((await page.screenshot({ clip: bounds! })).equals(still)).toBe(false);
    } finally {
      await context.close();
    }
  });
}
