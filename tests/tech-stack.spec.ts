import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";

test("the connected tech animation plays automatically", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const stack = page.getByRole("region", { name: "Tech stack" });
  const connections = stack.locator("svg").first();
  const before = await connections.screenshot({ caret: "initial" });
  await expect.poll(async () => (await connections.screenshot({ caret: "initial" })).equals(before)).toBe(false);
});

test("technology labels remain available with reduced motion and without JavaScript", async ({ browser }) => {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({ javaScriptEnabled, reducedMotion: "reduce" });
    try {
      const page = await context.newPage();
      await page.goto("/");
      const stack = page.getByRole("region", { name: "Tech stack" });
      for (const name of ["React", "TypeScript", "Next.js", "Supabase", "Salesforce", "LWC"]) {
        await expect(stack.getByRole("heading", { name, exact: true })).toBeVisible();
      }
      await expect(stack.getByText("Commerce Cloud", { exact: true })).toBeVisible();
      await expect(stack.getByText("React framework", { exact: true })).toBeVisible();
      await expect(stack.getByText("Data & authentication", { exact: true })).toBeVisible();
      const before = await stack.screenshot({ caret: "initial" });
      await page.waitForTimeout(350);
      expect(await stack.screenshot({ caret: "initial" })).toEqual(before);
    } finally { await context.close(); }
  }
});

test("the tech showcase stays separate from the hero copy across screen sizes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const stack = page.getByRole("region", { name: "Tech stack" });
  mkdirSync("test-results/tech-stack", { recursive: true });
  for (const width of [320, 360, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    // Let container sizing and the responsive layout finish before comparing separate bounds.
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    await expect(stack).toBeVisible();
    const name = await page.getByRole("heading", { level: 1 }).boundingBox();
    const cards = await stack.boundingBox();
    expect(name).not.toBeNull();
    expect(cards).not.toBeNull();
    if (width >= 1024) expect(cards!.x).toBeGreaterThanOrEqual(name!.x + name!.width);
    else expect(cards!.y).toBeGreaterThanOrEqual(name!.y + name!.height);
    const description = await stack.getByText("Lightning Web Components", { exact: true }).boundingBox();
    const footer = await stack.getByText("Frontend / Enterprise / Commerce", { exact: true }).locator("..").boundingBox();
    expect(description).not.toBeNull();
    expect(footer).not.toBeNull();
    expect(description!.y + description!.height + 8).toBeLessThanOrEqual(footer!.y);
    const items = await stack.getByRole("list", { name: "Technologies I work with" }).getByRole("listitem").all();
    const diagram = await stack.locator("svg").first().boundingBox();
    expect(diagram).not.toBeNull();
    expect(Math.abs(diagram!.width - diagram!.height)).toBeLessThan(1);
    const radii: number[] = [];
    const centers: { x: number; y: number }[] = [];
    for (let index = 0; index < items.length; index++) {
      const symbol = await items[index].locator("div").first().boundingBox();
      expect(symbol).not.toBeNull();
      centers.push({ x: symbol!.x + symbol!.width / 2, y: symbol!.y + symbol!.height / 2 });
      radii.push(Math.hypot(symbol!.x + symbol!.width / 2 - diagram!.x - diagram!.width / 2,
        symbol!.y + symbol!.height / 2 - diagram!.y - diagram!.height / 2));
      const bounds = await items[index].boundingBox();
      expect(bounds).not.toBeNull();
      for (const other of items.slice(index + 1)) {
        const otherBounds = await other.boundingBox();
        expect(otherBounds).not.toBeNull();
        const overlap = bounds!.x < otherBounds!.x + otherBounds!.width && bounds!.x + bounds!.width > otherBounds!.x
          && bounds!.y < otherBounds!.y + otherBounds!.height && bounds!.y + bounds!.height > otherBounds!.y;
        expect(overlap).toBe(false);
      }
    }
    expect(Math.max(...radii) - Math.min(...radii)).toBeLessThan(1);
    const horizontalSpan = Math.max(...centers.map(center => center.x)) - Math.min(...centers.map(center => center.x));
    const verticalSpan = Math.max(...centers.map(center => center.y)) - Math.min(...centers.map(center => center.y));
    expect(Math.abs(horizontalSpan - verticalSpan)).toBeLessThan(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBe(false);
    await page.screenshot({ path: `test-results/tech-stack/hero-${width}.png`, fullPage: width < 1024, caret: "initial" });
  }
});
