import {test, expect} from "@playwright/test";
import {accueilUrl, creationPatientUrl, patientUrl, themeListUrl} from "../e2e.config";
import {PatientFormFixture} from "../../app/patients/mes-patients/mes-patients.fixture";

test.describe('Patient Feature',() => {
  test('Patient Creation', async ({page}) => {
    await page.goto(patientUrl);

    const patientFromFixture = new PatientFormFixture(page)
    await expect(page).toHaveURL(patientUrl);

    await test.step('Cree un Patient', async () => {
      const boutonCreationPatient = await page.locator('button.creation-patient');
      boutonCreationPatient.evaluateHandle((element: {click:() => any; })=> element.click());
      await expect(page).toHaveURL(creationPatientUrl);
      const nomEntree = await patientFromFixture.getInput('input-nom-patient');
      await nomEntree.type('Dumaillet');
      const prenomEntree = await patientFromFixture.getInput('input-prenom-patient');
      await prenomEntree.type('marie-janne');
      const dateEntree = await patientFromFixture.getInput('input-date-patient')
      await dateEntree.type('12-12-1956');
      const imageEntree = await patientFromFixture.getInput('input-image-patient')
      await imageEntree.type('https://img.freepik.com/vecteurs-premium/personnes-agees-grand-pere-grand-pere-senior-personne-agee-personnage-dessin-anime_24640-61818.jpg?w=2000');
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
      await expect(page).toHaveURL(patientUrl);
    });

    await test.step('Patient Modification', async () => {
      await page.goto(patientUrl);
      const patientFromFixture = new PatientFormFixture(page);
      const boutonModificationPatient = await page.locator('button#modifier-patient').last();
      boutonModificationPatient.evaluateHandle((element: {click:() => any; })=> element.click());
      const nomEntree = await patientFromFixture.getInput('input-nom-patient-modif');
      await nomEntree.fill('');
      await nomEntree.type('Dumailler');
      const prenomEntree = await patientFromFixture.getInput('input-prenom-patient-modif');
      await prenomEntree.fill('');
      await prenomEntree.type('Marie-janne');
      const dateEntree = await patientFromFixture.getInput('input-date-patient-modif');
      await dateEntree.type('13-12-1956');
      const imageEntree = await patientFromFixture.getInput('input-image-patient-modif');
      await imageEntree.type('https://img.freepik.com/vecteurs-premium/personnes-agees-grand-pere-grand-pere-senior-personne-agee-personnage-dessin-anime_24640-61818.jpg?w=2000');
      const handicapeEntree = await patientFromFixture.getInput('input-handicap-patient-modif');
      await handicapeEntree.check();
      const policeEntree = await patientFromFixture.getInput('input-police-patient-modif');
      await policeEntree.check();
      const explicationEntree = await patientFromFixture.getInput('input-explication-patient-modif');
      await explicationEntree.check();
      const sourisEntree = await patientFromFixture.getInput('input-souris-patient-modif');
      await sourisEntree.check();
      const boutonValiderPatient = await page.locator('button#valider');
      boutonValiderPatient.evaluateHandle((element: {click:() => any; })=> element.click());
      await expect(page).toHaveURL(patientUrl);
    });
    await test.step('Patient Deletion', async () => {
      await page.goto(patientUrl);
      const patient = await page.getByText('Dumailler');
      expect(patient).toBeVisible();
      const boutonSuppPatient = await page.locator('button#suprimer-patient').last();
      boutonSuppPatient.evaluateHandle((element: {click:() => any; })=> element.click());
      await expect(page).toHaveURL(patientUrl);
      expect(patient).not.toBeVisible();
    })
  });
})
