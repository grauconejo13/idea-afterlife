import { expect, test } from "@playwright/test";

async function useHeaderNavigation(page, label) {
  const menu = page.getByRole("button", { name: "Menu" });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole("button", { name: label, exact: true }).click();
}

test("discovers and opens an idea", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Good ideas deserve more than one beginning." })).toBeVisible();
  await page.getByRole("button", { name: "Explore the archive" }).click();
  await expect(page.getByRole("heading", { name: "What could still become?" })).toBeVisible();
  await page.getByPlaceholder("Search titles, stories, or tags").fill("repair");
  await expect(page.getByRole("heading", { name: "The Repair Language" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Quiet Hours" })).toHaveCount(0);
  await page.getByRole("button", { name: /Read its story/ }).click();
  await expect(page.getByRole("heading", { name: "The Repair Language", exact: true })).toBeVisible();
  await expect(page.getByText("Available for adoption", { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/#\/idea\/repair-language$/);
  await page.reload();
  await expect(page.getByRole("heading", { name: "The Repair Language", exact: true })).toBeVisible();
});

test("shows an empty state and clears filters", async ({ page }) => {
  await page.goto("/");
  await useHeaderNavigation(page, "Archive");
  await page.getByPlaceholder("Search titles, stories, or tags").fill("no such idea exists");
  await expect(page.getByRole("heading", { name: "Nothing rests here yet." })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByText("06 records")).toBeVisible();
});

test("validates and completes the prototype submission flow", async ({ page }) => {
  await page.goto("/");
  await useHeaderNavigation(page, "Leave an idea");
  await page.getByRole("button", { name: "Preview this idea's afterlife" }).click();
  await expect(page.getByLabel("Idea title")).toBeFocused();
  await page.getByLabel("Add images or video").setInputFiles({ name: "weather-sketch.png", mimeType: "image/png", buffer: Buffer.from("prototype") });
  await expect(page.getByAltText("Preview of weather-sketch.png")).toBeVisible();
  await page.getByLabel("Idea title").fill("The Pocket Weather Choir");
  await page.getByLabel("Short summary").fill("A choir driven by tiny local weather instruments.");
  await page.getByLabel("Category").selectOption("Art");
  await page.getByLabel("Status").selectOption("Unrealized");
  await page.getByLabel("What did it want to become?").fill("A participatory sound installation.");
  await page.getByLabel("Why did it stop?").fill("The venue closed before fabrication.");
  await page.getByLabel("Your last wish").fill("Let another neighborhood perform it.");
  await page.getByLabel("How may others respond?").selectOption("Remix allowed");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Preview this idea's afterlife" }).click();
  await expect(page.getByRole("heading", { name: "Your idea has somewhere to rest." })).toBeVisible();
  await expect(page.getByText("The Pocket Weather Choir", { exact: true })).toBeVisible();
});

test("searches narrative fields and filters by status", async ({ page }) => {
  await page.goto("/#/archive");
  await page.getByPlaceholder("Search titles, stories, or tags").fill("residents");
  await expect(page.getByRole("heading", { name: "Quiet Hours" })).toBeVisible();
  await page.getByPlaceholder("Search titles, stories, or tags").clear();
  await page.getByLabel("Status").selectOption("Paused");
  await expect(page.getByText("01 records")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Borrowed Light" })).toBeVisible();
});
