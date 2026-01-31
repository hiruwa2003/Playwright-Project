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

const fillAndExpect = async (page, input, expectedText) => {
  await page.goto(URL);
  await getSinglishInput(page).fill(input);
  const output = getSinhalaOutput(page);
  if (expectedText) {
    await expect(output).toContainText(expectedText);
  } else {
    await expect(output).toBeVisible();
  }
};

test.describe("Positive Functional Tests (24) - Singlish to Sinhala", () => {
  test("Pos_Fun_0001 - Simple sentence", async ({ page }) => {
    await fillAndExpect(page, "mama gedhara yanavaa", "මම");
  });
});

test("Pos_Fun_0002 - Simple request", async ({ page }) => {
  await fillAndExpect(page, "mata bath oonee", "මට");
});

test("Pos_Fun_0003 - Simple plural", async ({ page }) => {
  await fillAndExpect(page, "api paasal yanavaa", "අපි");
});

test("Pos_Fun_0004 - Compound sentence", async ({ page }) => {
  await fillAndExpect(
    page,
    "api kaema kanna yanavaa saha passe chithrapatayak balanavaa",
    "සහ",
  );
});

test("Pos_Fun_0005 - Compound agreement", async ({ page }) => {
  await fillAndExpect(page, "oyaa hari ehenam api yamu", "ඔයා");
});

test("Pos_Fun_006 - Complex conditional", async ({ page }) => {
  await fillAndExpect(page, "oya enavaanam mama balan innavaa", "නම්");
});

test("Pos_Fun_0007 - Cause effect", async ({ page }) => {
  await fillAndExpect(page, "vaessa unath api yanna epaeyi", "එපැයි");
});

test("Pos_Fun_0008 - Interrogative question", async ({ page }) => {
  await fillAndExpect(page, "heta oyagee uthsavayadha", "ද");
});

test("Pos_Fun_0009 - Interrogative future", async ({ page }) => {
  await fillAndExpect(page, "oyaa kavadhdha enna hithan inne?", "කවද්ද");
});

test("Pos_Fun_0010 - Imperative command", async ({ page }) => {
  await fillAndExpect(page, "issarahata yanna", "යන්න");
});

test("Pos_Fun_0011 - Imperative request", async ({ page }) => {
  await fillAndExpect(page, "mata kiyanna", "කියන්න");
});

test("Pos_Fun_0012 - Positive form", async ({ page }) => {
  await fillAndExpect(page, "mama ehema karanavaa", "කරනවා");
});

test("Pos_Fun_0013 - Negative form", async ({ page }) => {
  await fillAndExpect(page, "mama ehema karanne naehae", "නැහැ");
});

test("Pos_Fun_0014 - Greeting", async ({ page }) => {
  await fillAndExpect(page, "aayuboovan", "ආයුබෝවන්");
});

test("Pos_Fun_0015 - Polite request", async ({ page }) => {
  await fillAndExpect(
    page,
    "karunakaralaa mata podi udhavvak karanna puluvandha",
    "කරුනකර",
  );
});
