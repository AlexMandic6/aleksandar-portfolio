import { test, expect } from "@playwright/test";

test("full bleed hero fits the available width with a reserved scrollbar gutter", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [390, 1250, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.addStyleTag({ content: "html { scrollbar-gutter: stable; }" });
    const layout = await page.evaluate(() => {
      const background = document.querySelector(".hero-background")!.getBoundingClientRect();
      return {
        left: background.left,
        right: background.right,
        width: background.width,
        available: document.body.clientWidth,
        viewport: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      };
    });
    expect(layout.left, `left edge at ${width}px`).toBeGreaterThanOrEqual(-1);
    expect(layout.right, `right edge at ${width}px`).toBeLessThanOrEqual(layout.available + 1);
    expect(layout.width, `full bleed at ${width}px`).toBeGreaterThanOrEqual(layout.available - 1);
    expect(layout.scrollWidth, `no overflow at ${width}px`).toBeLessThanOrEqual(
      layout.viewport + 1,
    );
  }
});

for (const { width, height, hasTouch } of [
  { width: 948, height: 1600, hasTouch: false },
  { width: 948, height: 1600, hasTouch: true },
  { width: 390, height: 844, hasTouch: true },
]) {
  test(`hero ghost fibers render and animate at ${width}px with touch capability ${hasTouch}`, async ({
    browser,
    baseURL,
  }) => {
    // Software WebGL in headless Chromium is slower than a hardware-backed browser.
    test.setTimeout(60_000);
    const context = await browser.newContext({
      baseURL,
      viewport: { width, height },
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
      await page.emulateMedia({ reducedMotion: "reduce" });
      await expect(canvas).toHaveCount(0);
      await expect(page.locator(".hero-background-fallback")).toBeVisible();
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await expect(canvas).toHaveAttribute("data-ready", "");
    } finally {
      await context.close();
    }
  });
}
