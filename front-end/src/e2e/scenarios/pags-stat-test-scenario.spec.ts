import { test, expect } from "@playwright/test"
import { accueil } from "../e2e.config";


test.describe("stat display", () => {
  test("Stat Display", async ({ page }) => {
    await page.goto(accueil)
    await page.locator('app-ergo').click()
    await expect(page).toHaveURL(accueil + "/page-stat-acceuil")
    const  test = await page.locator("div.boite:first-child button")
    await expect(test).toBeVisible()
    await test.click()
    await expect(page).toHaveURL(accueil + "/list-stat-quiz/1")
  })
})
