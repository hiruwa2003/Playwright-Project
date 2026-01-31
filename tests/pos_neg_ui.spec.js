import { test, expect } from "@playwright/test";

const URL = "https://www.swifttranslator.com/";

const getSinglishInput = (page) =>
  page.getByPlaceholder("Input Your Singlish Text Here.");

const getSinhalaOutput = (page) =>
  page
    .locator("div.panel-title", { hasText: "Sinhala" })
    .locator("..")
    .locator("div")
    .filter({ hasNotText: "Sinhala" })
    .first();

test.describe("UI Tests - Positive & Negative", () => {
  // POSITIVE UI TEST

  test("Pos_UI_0001 - Real-time Sinhala output updates while typing", async ({
    page,
  }) => {
    await page.goto(URL, { waitUntil: "networkidle" });

    const input = getSinglishInput(page);
    const output = getSinhalaOutput(page);

    await input.type("mama gedhara", { delay: 30 });

    await expect
      .poll(async () => (await output.innerText()).trim(), {
        timeout: 60000,
      })
      .toContain("මම");

    await input.type(" yanavaa", { delay: 30 });

    await expect
      .poll(async () => (await output.innerText()).trim(), {
        timeout: 60000,
      })
      .toContain("යනවා");
  });

  // NEGATIVE UI TEST 01

  test("Neg_UI_0001 - Clearing input clears Sinhala output", async ({
    page,
  }) => {
    await page.goto(URL, { waitUntil: "networkidle" });

    const input = getSinglishInput(page);
    const output = getSinhalaOutput(page);

    await input.fill("mama gedhara yanavaa");

    await expect
      .poll(async () => (await output.innerText()).trim(), {
        timeout: 60000,
      })
      .not.toBe("");

    await input.fill("");

    await expect
      .poll(async () => (await output.innerText()).trim(), {
        timeout: 60000,
      })
      .toBe("");
  });

  // NEGATIVE UI TEST 02

  test("Neg_UI_0002 - Numbers-only input does not break UI", async ({
    page,
  }) => {
    await page.goto(URL, { waitUntil: "networkidle" });

    const input = getSinglishInput(page);
    const output = getSinhalaOutput(page);

    await input.fill("1234567890");

    await expect(input).toBeVisible();
    await expect(output).toBeVisible();
  });
});
