import { test, expect } from "@playwright/test";

test.describe("Negative Functional Tests (10) - Robustness", () => {
  test("Neg_Fun_0001 - Joined words", async ({ page }) => {
    await page.goto("https://www.swifttranslator.com/");
    await page.locator("#singlish").fill("mamage dharayanavaa");
    const text = await page.locator("#sinhala").innerText();
    expect(text.length).toBeGreaterThan(0);
  });

  test("Neg_Fun_0002 - Missing spaces", async ({ page }) => {
    await page.goto("https://www.swifttranslator.com/");
    await page.locator("#singlish").fill("matabathonee");
    await expect(page.locator("#sinhala")).toBeVisible();
  });

  test("Neg_Fun_0003 - Slang heavy input", async ({ page }) => {
    await page.goto("https://www.swifttranslator.com/");
    await page.locator("#singlish").fill("ela machan supiri");
    await expect(page.locator("#sinhala")).not.toBeEmpty();
  });

  test("Neg_Fun_0004 - Colloquial sentence", async ({ page }) => {
    await page.goto("https://www.swifttranslator.com/");
    await page.locator("#singlish").fill("ado vaedak karapanko");
    await expect(page.locator("#sinhala")).toBeVisible();
  });

  test("Neg_Fun_0005 - Mixed English paragraph", async ({ page }) => {
    await page.goto("https://www.swifttranslator.com/");
    await page
      .locator("#singlish")
      .fill("Please send the Zoom link ASAP. mama office inne");
    await expect(page.locator("#sinhala")).toContainText("Zoom");
  });

  test("Neg_Fun_0006 - Line breaks", async ({ page }) => {
    await page.goto("https://www.swifttranslator.com/");
    await page
      .locator("#singlish")
      .fill("mama gedhara yanavaa\noyaa enavadha?");
    await expect(page.locator("#sinhala")).toBeVisible();
  });

  test("Neg_Fun_0007 - Long input (stress)", async ({ page }) => {
    await page.goto("https://www.swifttranslator.com/");
    await page
      .locator("#singlish")
      .fill(
        "dhitvaa suli kunaatuva samaga aethi vu gQQvathura saha naayayaeem heethuven maarga sQQvardhana adhikaariya",
      );
    await expect(page.locator("#sinhala")).toBeVisible();
  });

  test("Neg_Fun_0008 - Numbers + punctuation", async ({ page }) => {
    await page.goto("https://www.swifttranslator.com/");
    await page.locator("#singlish").fill("25/12/2025 ! ?");
    await expect(page.locator("#sinhala")).toBeVisible();
  });

  test("Neg_Fun_0009 - Repeated words", async ({ page }) => {
    await page.goto("https://www.swifttranslator.com/");
    await page.locator("#singlish").fill("hari hari hari");
    await expect(page.locator("#sinhala")).toBeVisible();
  });

  test("Neg_Fun_0010 - Formatting noise", async ({ page }) => {
    await page.goto("https://www.swifttranslator.com/");
    await page.locator("#singlish").fill("   mama    gedhara yanavaa   ");
    await expect(page.locator("#sinhala")).toBeVisible();
  });
});
