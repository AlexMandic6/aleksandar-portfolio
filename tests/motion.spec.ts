import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";

test("project copy and action remain usable while the illustration enters view", async ({ page }) => {
  await page.goto("/");
  const work = page.locator("#work");
  const project = work.getByRole("heading", { name: "Salon Booking" });
  const action = work.getByRole("link", { name: "View project" });
  await work.getByText(/UI concept.*synthetic data/).scrollIntoViewIfNeeded();
  await expect(project).toBeVisible();
  await expect(action).toBeVisible();
  const before = await project.boundingBox();
  await page.waitForTimeout(250);
  const after = await project.boundingBox();
  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(Math.abs(after!.x - before!.x)).toBeLessThan(1);
  expect(Math.abs(after!.y - before!.y)).toBeLessThan(1);
  await action.click();
  await expect(page).toHaveURL(/\/work\/salon-booking$/);
});

for (const width of [390, 1440]) {
  test(`content remains usable across motion preference, navigation and resize at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    mkdirSync("test-results/animation", { recursive: true });
    await page.goto("/");
    const name = page.getByRole("heading", { level: 1, name: "Aleksandar Mandić" });
    const action = page.getByRole("link", { name: "View project", exact: true });
    await expect(name).toBeVisible();
    await page.screenshot({ path: `test-results/animation/hero-${width}-early.png` });
    await page.waitForTimeout(160);
    await page.screenshot({ path: `test-results/animation/hero-${width}-middle.png` });
    await page.locator("#work").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/animation/work-${width}-early.png` });
    await page.waitForTimeout(180);
    await page.screenshot({ path: `test-results/animation/work-${width}-middle.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(name).toBeVisible();
    await expect(action).toBeVisible();
    await page.emulateMedia({ reducedMotion: "no-preference" });
    for (let cycle = 0; cycle < 3; cycle++) {
      await action.click();
      await expect(page).toHaveURL(/\/work\/salon-booking$/);
      await page.getByRole("link", { name: /, home$/ }).click();
      await expect(page).toHaveURL("/");
      await expect(page.getByRole("heading", { level: 1, name: "Aleksandar Mandić" })).toBeVisible();
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const resizedWidth of [1440, 390, 1440]) {
      await page.setViewportSize({ width: resizedWidth, height: 900 });
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect.poll(
        () => page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1),
        { message: `no horizontal overflow at ${resizedWidth}px after resize` },
      ).toBe(false);
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

test("hero artwork responds to a fine pointer and settles when motion is reduced", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const scene = page.locator(".hero-art .booking-scene");
  const card = scene.locator(".booking-service .booking-surface");
  await page.waitForTimeout(950);
  const area = await scene.boundingBox();
  const rest = await card.boundingBox();
  expect(area).not.toBeNull();
  expect(rest).not.toBeNull();

  await page.mouse.move(area!.x + area!.width * 0.85, area!.y + area!.height * 0.8);
  await expect.poll(async () => {
    const moved = await card.boundingBox();
    return Math.abs(moved!.x - rest!.x) + Math.abs(moved!.y - rest!.y);
  }).toBeGreaterThan(2);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(async () => {
    const settled = await card.boundingBox();
    return Math.abs(settled!.x - rest!.x) + Math.abs(settled!.y - rest!.y);
  }).toBeLessThan(1);
  await page.mouse.move(area!.x + area!.width * 0.15, area!.y + area!.height * 0.2);
  await page.waitForTimeout(450);
  const still = await card.boundingBox();
  expect(Math.abs(still!.x - rest!.x) + Math.abs(still!.y - rest!.y)).toBeLessThan(1);
});
