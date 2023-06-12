import {test, expect} from "@playwright/test";
import {patientUrl} from "../e2e.config";
import {PatientFormFixture} from "../../app/patients/mes-patients/mes-patients.fixture";

test.describe('Patient Feature',() => {
  test('Patient Creation', async ({page}) => {
    await page.goto(patientUrl);

    const patientFromFixture = new PatientFormFixture(page)
    await expect(page).toHaveURL('http://localhost:4200/mes-patients');

    await test.step('Cree un Patient', async () => {
      const boutonCreationPatient = await page.locator('button.creation-patient');
      boutonCreationPatient.evaluateHandle((element: {click:() => any; })=> element.click());

      await expect(page).toHaveURL('http://localhost:4200/creer-patient');
      const nomEntree = await patientFromFixture.getInput('input-nom-patient');
      await nomEntree.type('Dumaillet');
      const prenomEntree = await patientFromFixture.getInput('input-prenom-patient');
      await prenomEntree.type('marie-janne');
      const dateEntree = await patientFromFixture.getInput('input-date-patient')
      await dateEntree.type('12-12-1956');
      const imageEntree = await patientFromFixture.getInput('input-image-patient')
      await imageEntree.type('12-12-1956');

      const handicapeEntree = await patientFromFixture.getInput('input-handicap-patient');
      await handicapeEntree.check();

      const policeEntree = await patientFromFixture.getInput('input-police-patient');
      await policeEntree.check();

      const explicationEntree = await patientFromFixture.getInput('input-explication-patient');
      await explicationEntree.check();

      const sourisEntree = await patientFromFixture.getInput('input-souris-patient');
      await sourisEntree.check();

      const boutonValiderPatient = await page.locator('button#valider');
      boutonValiderPatient.evaluateHandle((element: {click:() => any; })=> element.click());
      await expect(page).toHaveURL('http://localhost:4200/mes-patients');
    });
  });
})
