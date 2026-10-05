import { test, expect } from "@playwright/test";

for (const hasTouch of [false, true]) {
  test(`hero water responds to mouse movement with touch capability ${hasTouch}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, viewport: { width: 948, height: 1600 }, hasTouch, reducedMotion: "no-preference" });
    try {
      const page = await context.newPage();
      await page.goto("/");
      if (hasTouch) {
        expect(await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches)).toBe(false);
      }
      const canvas = page.locator(".hero-background-liquid");
      await expect(canvas).toHaveAttribute("data-ready", "");
      // Isolate the water so name and tech-stack motion cannot satisfy this assertion.
      await page.addStyleTag({ content: ".hero-content { visibility: hidden !important; }" });
      const background = page.locator(".hero-background");
      const bounds = await background.boundingBox();
      expect(bounds).not.toBeNull();
      const still = await background.screenshot();
      for (let step = 0; step < 8; step++) {
        await page.mouse.move(bounds!.x + bounds!.width * .45 + step * 18, bounds!.y + bounds!.height * .45 + step * 6);
        // Feed multiple distinct waves past the renderer's 45ms input throttle.
        await page.waitForTimeout(60);
      }
      expect((await background.screenshot()).equals(still)).toBe(false);
    } finally {
      await context.close();
    }
  });
}
