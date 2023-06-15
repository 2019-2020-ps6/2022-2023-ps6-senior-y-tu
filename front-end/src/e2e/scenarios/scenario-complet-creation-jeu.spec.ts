import  { test, expect } from '@playwright/test';
import {QuizFormFixture} from "../../app/quizs/creer-quiz/creer-quiz.fixture";
import {accueil, themeList} from "../e2e.config";
import {QuestionFormFixture} from "../../app/questions/creer-question/creer-question.fixture";
import {PatientFormFixture} from "../../app/patients/mes-patients/mes-patients.fixture";

test.describe('Scenario Complet', () => {
  test('scenario complet', async ({page}) => {
    await test.step('Accès à la page d\'accueil', async () => {

      await page.goto(accueil);
      await expect(page).toHaveURL("http://localhost:4200/accueil");
    });

    await test.step('Accès au profil ergo', async () => {

      const titreE = await page.locator('span.titre-list-ergotherapeute');
      const ergo = await page.locator('app-ergo');

      expect(await titreE.innerText()).toBe('Ergothérapeutes');
      await ergo.click();

      await expect(page).toHaveURL('http://localhost:4200/page-stat-acceuil');
    });


    await test.step('Accès à la page des patients', async () => {

      const boutonMesPatients = await page.locator('a#mes-patients');
      boutonMesPatients.evaluateHandle((element: { click: () => any; }) => element.click());
      await expect(page).toHaveURL('http://localhost:4200/mes-patients');
    });


    await test.step('Accès à la page de création de patient', async () => {

      const boutonCreationPatient = await page.locator('button.creation-patient');
      boutonCreationPatient.evaluateHandle((element: { click: () => any; }) => element.click());
      await expect(page).toHaveURL('http://localhost:4200/creer-patient');
    });

    await test.step('Création d\'un patient', async () => {

      const patientFromFixture = new PatientFormFixture(page)

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
      boutonValiderPatient.evaluateHandle((element: { click: () => any; }) => element.click());

      await expect(page).toHaveURL('http://localhost:4200/mes-patients');
    });

    await test.step('Accès à la page des quizs', async () => {

      const boutonMesQuiz = await page.locator('a#mes-quizs');
      boutonMesQuiz.evaluateHandle((element: { click: () => any; }) => element.click());
      await expect(page).toHaveURL('http://localhost:4200/mes-quizs');
    });

    await test.step('Accès à la page de création de quiz', async () => {

      const boutonCreationQuiz = await page.locator('button.creation-quiz');
      await boutonCreationQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

      await expect(page).toHaveURL('http://localhost:4200/creer-quiz');
    });

    await test.step('Création d\'un quiz', async () => {
      const quizFormFixture = new QuizFormFixture(page);


      const inputName = await quizFormFixture.getInput('nom');
      await inputName.type('Quiz E2E');
      const inputTheme = await quizFormFixture.getInput('theme');
      await inputTheme.type('E2E');

      const inputImageQuiz = await quizFormFixture.getInput('image');
      await inputImageQuiz.type('a');

      const boutonValiderQuiz = await page.locator('button#valider');
      await boutonValiderQuiz.evaluateHandle((element: { click: () => any; }) => element.click());

    });


    await test.step('Création d\'une question', async () => {
      const questionFormFixture = new QuestionFormFixture(page);
      const inputIntitule = await questionFormFixture.getIntituleInput();
      await inputIntitule.type('Quel est le nom de la capitale de la France ?');

      const reponse = await questionFormFixture.getAllAnswersInputs('text');
      const inputReponse1 = reponse[0];
      await inputReponse1.type('Paris');
      const inputReponse2 = reponse[1];
      await inputReponse2.type('Lyon');
      const inputReponse3 = reponse[2];
      await inputReponse3.type('Marseille');
      const inputReponse4 = reponse[3];
      await inputReponse4.type('Toulouse');

      const inputVraiRep = (await questionFormFixture.getAllAnswersInputs('radio'));
      await inputVraiRep[0].check();

      const inputImageQ1 = await questionFormFixture.getInput('img');
      await inputImageQ1.type('a');

      const inputExplication = await questionFormFixture.getTextArea();
      await inputExplication.type('Paris est la capitale de la France');


      await questionFormFixture.clickCreateButton();

      const expectedURLListeQuestion = await page.url();
      const expectedURLPattern2 = /http:\/\/localhost:4200\/quiz\/\d+\/question-liste/;
      await expect(expectedURLListeQuestion).toMatch(expectedURLPattern2);

    });

    await test.step('Accès à la page de création de quiz', async () => {
      const boutonAjoutQuestion = await page.locator('button.ajouter-question');
      await boutonAjoutQuestion.evaluateHandle((element: { click: () => any; }) => element.click());

    });

    await test.step('Création de la deuxième question', async () => {
      const questionFormFixture = new QuestionFormFixture(page);
      const inputIntitule2 = await questionFormFixture.getIntituleInput();
      await inputIntitule2.type('Quel est le nom de la capitale de l\'Espagne ?');

      const reponse= await questionFormFixture.getAllAnswersInputs('text');

      const inputReponse5 = reponse[0];
      await inputReponse5.type('Barcelone');
      const inputReponse6 = reponse[1];
      await inputReponse6.type('Madrid');
      const inputReponse7 = reponse[2];
      await inputReponse7.type('Valence');
      const inputReponse8 = reponse[3];
      await inputReponse8.type('Séville');

      const inputVraiRep2 = (await questionFormFixture.getAllAnswersInputs('radio'));
      await inputVraiRep2[1].check();

      const inputImageQ2 = await questionFormFixture.getInput('img');
      await inputImageQ2.type('a');

      const inputExplication2 = await questionFormFixture.getTextArea();
      await inputExplication2.type('Madrid est la capitale de l\'Espagne');

      await questionFormFixture.clickCreateButton();

      const expectedURLListeQuestion = await page.url();
      const expectedURLPattern2 = /http:\/\/localhost:4200\/quiz\/\d+\/question-liste/;

      await expect(expectedURLListeQuestion).toMatch(expectedURLPattern2);

    });

    await test.step('Se déconnecter', async () => {
      const boutonDeconnexion = await page.locator('button.button-card');
      await boutonDeconnexion.evaluateHandle((element: { click: () => any; }) => element.click());
      await expect(page).toHaveURL('http://localhost:4200/accueil');
    });

    await test.step('Se connecter en tant que patient', async () => {
      const boutonPatient = await page.locator('app-patient').last();
      await boutonPatient.click();
      await expect(page).toHaveURL(themeList);

    });





  });
});
