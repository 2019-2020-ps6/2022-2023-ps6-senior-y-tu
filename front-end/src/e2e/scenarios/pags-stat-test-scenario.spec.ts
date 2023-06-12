import { test, expect } from "@playwright/test"
import { testUrl } from "../e2e.config";

test.describe("stat display", () => {
  test("Stat Display", async ({ page }) => {
    await page.goto(testUrl)
    await page.locator('app-ergo').click()
    await expect(page).toHaveURL(testUrl + "/page-stat-acceuil")
    const  test = await page.locator("div.boite:first-child button")
    await expect(test).toBeVisible()
    await test.click()
    await expect(page).toHaveURL(testUrl + "/list-stat-quiz/1")
  })
})
