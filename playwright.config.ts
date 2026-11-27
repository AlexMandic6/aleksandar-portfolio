import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:3001";

export default defineConfig({
  testDir: "./tests",
  use: { baseURL, ...devices["Desktop Chrome"] },
  webServer: {
    command: "pnpm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
