import { test, expect } from "@playwright/test"
import {accueilUrl, pageStatGeneraleUrl} from "../e2e.config";


test.describe("stat display", () => {
  test("Stat Display", async ({ page }) => {
    await page.goto(accueilUrl)
    await page.locator('app-ergo').click()
    await expect(page).toHaveURL(pageStatGeneraleUrl)
    const  test = await page.locator("div.boite:first-child button")
    await expect(test).toBeVisible()
    await test.click()
    const expectedURLListeQuiz = await page.url();
    const expectedURLPatternListQuiz = /http:\/\/localhost:4200\/list-stat-quiz\/\d+;?/;
    await expect(expectedURLListeQuiz).toMatch(expectedURLPatternListQuiz);
  })
})
