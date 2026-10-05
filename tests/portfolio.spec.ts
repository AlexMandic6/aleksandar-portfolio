import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("identity, project and return navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Aleksandar Mandić");
  await page.getByRole("link", { name: "View project", exact: true }).click();
  await expect(page).toHaveURL(/\/work\/salon-booking$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Salon Booking");
  await page.getByRole("navigation").getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/#work$/);
});

test("Salon Booking case study explains the working flow and current limits", async ({ page }) => {
  await page.goto("/work/salon-booking");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Salon Booking.");
  const caseStudy = page.getByRole("article");
  await expect(caseStudy.getByRole("heading", { name: "Why I built it" })).toBeVisible();
  await expect(caseStudy.getByRole("heading", { name: "Reliable booking" })).toBeVisible();
  await expect(caseStudy.getByRole("heading", { name: "Different salons, one codebase" })).toBeVisible();
  await expect(caseStudy.getByRole("list", { name: "How an appointment is reserved" }).getByRole("listitem")).toHaveCount(4);
  await expect(caseStudy).toContainText("weekly working hours editor");
  await expect(caseStudy).toContainText("has not been used for live business bookings");
  await expect(page.getByText("UI concept — synthetic data", { exact: false })).toBeVisible();
});

test("the old project URL permanently redirects to Salon Booking", async ({ page }) => {
  const response = await page.request.get("/work/saloon-booking", { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("/work/salon-booking");
  await page.goto("/work/saloon-booking");
  await expect(page).toHaveURL(/\/work\/salon-booking$/);
});

test("narrow layouts do not overflow on either route", async ({ page }) => {
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/work/salon-booking"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const overflows = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(overflows, `${route} at ${width}px`).toBe(false);
    }
  }
});

test("reduced motion and repeat navigation stay usable", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (let i = 0; i < 3; i++) {
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Aleksandar Mandić");
    await page.getByRole("link", { name: "View project", exact: true }).click();
    await page.getByRole("navigation").getByRole("link", { name: "Work", exact: true }).click();
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Aleksandar Mandić");
  expect(errors).toEqual([]);
});

test("supplied contact methods and CV resolve to real destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.locator(".hero").getByRole("link", { name: "Download CV" })).toHaveAttribute("href", "/Aleksandar_Mandic_CV.pdf");
  const contact = page.locator("#contact");
  await expect(contact.getByRole("link", { name: /Email/i })).toHaveAttribute("href", "mailto:aleksandar.mndc@gmail.com");
  await expect(contact.getByRole("link", { name: /Phone/i })).toHaveAttribute("href", "tel:+381653781461");
  await expect(contact.getByRole("link", { name: /LinkedIn/i })).toHaveAttribute("href", "https://www.linkedin.com/in/aleksandar-mandic-95a2b01bb/");
  await expect(contact.getByRole("link", { name: /GitHub/i })).toHaveAttribute("href", "https://github.com/AlexMandic6");
  await expect(contact.getByRole("link", { name: /CV/i })).toHaveAttribute("href", "/Aleksandar_Mandic_CV.pdf");
  const cv = await page.request.get("/Aleksandar_Mandic_CV.pdf");
  expect(cv.status()).toBe(200);
  expect(cv.headers()["content-type"]).toContain("application/pdf");
  expect((await cv.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("project navigation resolves every home section anchor", async ({ page }) => {
  for (const anchor of ["Work", "About", "Contact"]) {
    await page.goto("/work/salon-booking");
    await page.getByRole("navigation").getByRole("link", { name: anchor, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/#${anchor.toLowerCase()}$`));
    await expect(page.locator(`#${anchor.toLowerCase()}`)).toBeVisible();
  }
});

test("basic accessibility on both routes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/work/salon-booking"]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(result.violations).toEqual([]);
  }
});

test("core content and links survive without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Aleksandar Mandić");
  await expect(page.locator(".hero").getByRole("link", { name: "Download CV" })).toBeVisible();
  await expect(page.locator("#work .booking-scene")).toBeVisible();
  await page.getByRole("link", { name: "View project", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Salon Booking");
  await expect(page.locator(".case-visual .booking-scene")).toBeVisible();
  await context.close();
});

test("unknown routes offer a working recovery link", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("There’s nothing here.");
  await page.getByRole("link", { name: "Return home" }).click();
  await expect(page).toHaveURL("/");
});
