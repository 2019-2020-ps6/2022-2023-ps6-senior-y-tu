import { test, expect } from '../../../../front-end/node_modules/@playwright/test';
import {accueil} from '../e2e.config';

test.describe('Page d\'accueil display', () => {

  test('Clique sur patient', async ({ page }) => {
    await page.goto(accueil);
    const titreP = await page.locator('span.titre-list-patient');
    const patient = await page.locator('app-patient').first();

    expect(await titreP.innerText()).toBe('Patients');
    await patient.click();
  });

  test('Clique sur ergo', async ({ page }) => {
    await page.goto(accueil);
    const titreE = await page.locator('span.titre-list-ergotherapeute');
    const ergo = await page.locator('app-ergo');

    expect(await titreE.innerText()).toBe('Ergothérapeutes');
    await ergo.click();
  });

});




