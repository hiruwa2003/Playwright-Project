import { test, expect } from '@playwright/test';

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

const waitForNonEmptyText = async (locator, timeout = 60000) => {
  await expect(locator).not.toHaveText('', { timeout });
};

const fillAndExpect = async (page, input, expectedText) => {
  await page.goto(URL, { waitUntil: 'networkidle' });

  const inputLocator = getSinglishInput(page);
  const output = getSinhalaOutput(page);

  const typeInput = async () => {
    await inputLocator.fill('');
    await inputLocator.type(input, { delay: 20 });
  };

  await typeInput();

  try {
    await waitForNonEmptyText(output);
  } catch {
    await typeInput();
    await waitForNonEmptyText(output);
  }

  if (expectedText) {
    await expect(output).toContainText(expectedText, { timeout: 60000 });
  } else {
    await expect(output).toBeVisible();
  }
};

// 24 positive functional tests
test.describe("Positive Functional Tests (24) - Singlish to Sinhala", () => {
  test("Pos_Fun_0001 - Simple sentence", async ({ page }) => {
    await fillAndExpect(page, "mama gedhara yanavaa", "මම");
  });

  test("Pos_Fun_0002 - Simple request", async ({ page }) => {
    await fillAndExpect(page, "mata bath oonee", "මට");
  });

  test("Pos_Fun_0003 - Simple plural", async ({ page }) => {
    await fillAndExpect(page, "api paasal yanavaa", "අපි");
  });

  test("Pos_Fun_0004 - Compound sentence", async ({ page }) => {
    await fillAndExpect(page, "api kaema kanna yanavaa saha passe chithrapatayak balanavaa", "සහ");
  });

  test("Pos_Fun_0005 - Compound agreement", async ({ page }) => {
    await fillAndExpect(page, "oyaa hari ehenam api yamu", "ඔයා");
  });

  test("Pos_Fun_0006 - Complex conditional", async ({ page }) => {
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
    await fillAndExpect(page, "karunakaralaa mata podi udhavvak karanna puluvandha", "කරුනකර");
  });

  test("Pos_Fun_0016 - Informal phrasing", async ({ page }) => {
    await fillAndExpect(page, "ehema karapan", "කරපන්");
  });

  test("Pos_Fun_0017 - Present tense", async ({ page }) => {
    await fillAndExpect(page, "mama daen vaeda karanavaa", "ඩැන්");
  });

  test("Pos_Fun_0018 - Past tense", async ({ page }) => {
    await fillAndExpect(page, "mama iye gedhara giyaa", "ගියා");
  });

  test("Pos_Fun_0019 - Future tense", async ({ page }) => {
    await fillAndExpect(page, "mama heta enavaa", "හෙට");
  });

  test("Pos_Fun_0020 - English brand name", async ({ page }) => {
    await fillAndExpect(page, "Zoom meeting ekak thiyennee", "Zoom");
  });

  test("Pos_Fun_0021 - Place name", async ({ page }) => {
    await fillAndExpect(page, "api Kandy yamu", "Kandy");
  });

  test("Pos_Fun_0022 - Currency format", async ({ page }) => {
    await fillAndExpect(page, "Rs. 5343", "Rs");
  });

  test("Pos_Fun_0023 - Multiple spaces", async ({ page }) => {
    await fillAndExpect(page, "mama   gedhara   yanavaa", null);
  });

  test("Pos_Fun_0024 - Medium paragraph", async ({ page }) => {
    await fillAndExpect(page, "api passee kathaa karamu mokadha daen vaessa vahinavaa", "අපි");
  });
});
