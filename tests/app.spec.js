import { expect, test } from "@playwright/test";

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
});

test("shows an empty state and clears filters", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Archive" }).click();
  await page.getByPlaceholder("Search titles, stories, or tags").fill("no such idea exists");
  await expect(page.getByRole("heading", { name: "Nothing rests here yet." })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByText("06 records")).toBeVisible();
});

test("validates and completes the prototype submission flow", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Leave an idea", exact: true }).first().click();
  await page.getByRole("button", { name: "Preview this idea's afterlife" }).click();
  await expect(page.getByLabel("Idea title")).toBeFocused();
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
