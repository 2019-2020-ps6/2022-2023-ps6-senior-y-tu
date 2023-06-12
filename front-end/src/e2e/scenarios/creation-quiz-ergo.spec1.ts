import  { test, expect } from '@playwright/test';
import {QuizFormFixture} from "../../app/quizs/creer-quiz/creer-quiz.fixture";
import {quizsErgo} from "../e2e.config";
import {QuestionFormFixture} from "../../app/questions/creer-question/creer-question.fixture";


// This file is here to test the playwright integration
test.describe('Creation quiz', () => {

  test('Accède à la page des quizs', async ({page}) => {
    await page.goto(quizsErgo);

    await expect(page).toHaveURL(quizsErgo);
  });

  test('Création quiz', async  ({ page }) => {
    await page.goto(quizsErgo);

    const quizFormFixture = new QuizFormFixture(page);
    const questionFormFixture = new QuestionFormFixture(page);

    const boutonCreationQuiz = await page.locator('button.creation-quiz');
    await boutonCreationQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

    await expect(page).toHaveURL('http://localhost:4200/creer-quiz');

    await test.step(`Quiz form visible`, async () => {

      const quizForm = await quizFormFixture.getQuizForm();
      const isVisible = await quizForm.isVisible();
      expect(isVisible).toBeTruthy();

    });

    await test.step(`Creer Quiz`, async () => {

      const inputName = await quizFormFixture.getInput('nom');
      await inputName.type('Quiz E2E');
      const inputTheme = await quizFormFixture.getInput('theme');
      await inputTheme.type('E2E');

      const boutonCreationQuiz = await page.locator('button#valider');
      await boutonCreationQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

    });

    await test.step('creer question', async () => {
      const inputIntitule = await questionFormFixture.getIntituleInput();
      await inputIntitule.type('Quel est le nom de la capitale de la France ?');

      const inputReponse1 = (await questionFormFixture.getAllAnswersInputs('text'))[0];
      await inputReponse1.type('Paris');
      const inputReponse2 = (await questionFormFixture.getAllAnswersInputs('text'))[1];
      await inputReponse2.type('Lyon');
      const inputReponse3 = (await questionFormFixture.getAllAnswersInputs('text'))[2];
      await inputReponse3.type('Marseille');
      const inputReponse4 = (await questionFormFixture.getAllAnswersInputs('text'))[3];
      await inputReponse4.type('Toulouse');

      const inputVraiRep = (await questionFormFixture.getAllAnswersInputs('radio'));
      await inputVraiRep[0].check();

      await questionFormFixture.clickCreateButton();
    });


  });
});
