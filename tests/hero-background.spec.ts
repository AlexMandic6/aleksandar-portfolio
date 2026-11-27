import { test, expect } from "@playwright/test";

test("hero shows the static fallback when WebGL2 is unavailable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = new Proxy(HTMLCanvasElement.prototype.getContext, {
      apply(target, canvas, args) {
        return args[0] === "webgl2" ? null : Reflect.apply(target, canvas, args);
      },
    });
  });
  await page.goto("/");
  await expect(page.locator(".ghost-fibers-canvas")).toBeAttached();
  await expect(page.locator(".ghost-fibers-canvas")).toBeHidden();
  await expect(page.locator(".hero-background-fallback")).toBeVisible();
});

declare global {
  interface Window {
    heroWebGlTest: {
      fail: boolean;
      attempts: number;
      shaders: number;
      programs: number;
      framebuffers: number;
      textures: number;
      vertexArrays: number;
    };
  }
}

for (const [failure, resource] of [
  ["programs", "program"],
  ["textures", "texture"],
] as const) {
  test(`hero releases WebGL resources after a ${resource} allocation fails and can restart`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.addInitScript((failingResource) => {
      const stats = (window.heroWebGlTest = {
        fail: true,
        attempts: 0,
        shaders: 0,
        programs: 0,
        framebuffers: 0,
        textures: 0,
        vertexArrays: 0,
      });
      const gl = WebGL2RenderingContext.prototype;
      for (const [create, remove, key] of [
        ["createShader", "deleteShader", "shaders"],
        ["createProgram", "deleteProgram", "programs"],
        ["createFramebuffer", "deleteFramebuffer", "framebuffers"],
        ["createTexture", "deleteTexture", "textures"],
        ["createVertexArray", "deleteVertexArray", "vertexArrays"],
      ] as const) {
        Reflect.set(
          gl,
          create,
          new Proxy(gl[create], {
            apply(target, context, args) {
              if (key === failingResource && ++stats.attempts >= 3 && stats.fail) return null;
              const resource = Reflect.apply(target, context, args);
              if (resource) stats[key]++;
              return resource;
            },
          }),
        );
        Reflect.set(
          gl,
          remove,
          new Proxy(gl[remove], {
            apply(target, context, args) {
              if (args[0]) stats[key]--;
              return Reflect.apply(target, context, args);
            },
          }),
        );
      }
    }, failure);
    await page.goto("/");
    await expect
      .poll(() => page.evaluate(() => window.heroWebGlTest.attempts))
      .toBeGreaterThanOrEqual(3);
    const released = { shaders: 0, programs: 0, framebuffers: 0, textures: 0, vertexArrays: 0 };
    expect(await page.evaluate(() => window.heroWebGlTest)).toMatchObject(released);
    await expect(page.locator(".ghost-fibers-canvas")).toBeHidden();
    await expect(page.locator(".hero-background-fallback")).toBeVisible();

    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator(".ghost-fibers-canvas")).toHaveCount(0);
    await page.evaluate(() => {
      window.heroWebGlTest.fail = false;
    });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(page.locator(".ghost-fibers-canvas[data-ready]")).toBeAttached();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator(".ghost-fibers-canvas")).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => window.heroWebGlTest)).toMatchObject(released);
  });
}

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
