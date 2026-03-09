import { test, expect } from "@playwright/test";

test("login and open tasks page", async ({ page }) => {
  await page.goto("/login");
  await page.getByPlaceholder("you@company.com").fill("john@example.com");
  await page.getByPlaceholder("Enter your password").fill("123456");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/dashboard/);
  await page.goto("/tasks");
  await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
});
