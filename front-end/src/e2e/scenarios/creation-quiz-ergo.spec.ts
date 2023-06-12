import  { test, expect } from '@playwright/test';
import {QuizFormFixture} from "../../app/quizs/creer-quiz/creer-quiz.fixture";
import {quizsErgo} from "../e2e.config";

// This file is here to test the playwright integration
test.describe('Creation quiz', () => {

  test('Accède à la page des quizs', async ({page}) => {
    await page.goto(quizsErgo);

    await expect(page).toHaveURL(quizsErgo);
  });

  test('Création quiz', async  ({ page }) => {
    await page.goto(quizsErgo);

    const quizFormFixture = new QuizFormFixture(page);

    const boutonCreationQuiz = await page.locator('button.creation-quiz');
    await boutonCreationQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

    await expect(page).toHaveURL('http://localhost:4200/creer-quiz');

    await test.step(`Quiz form visible`, async () => {

      const quizForm = await quizFormFixture.getQuizForm();
      const isVisible = await quizForm.isVisible();
      expect(isVisible).toBeTruthy();

    });

    await test.step(`Create Quiz`, async () => {

      const inputName = await quizFormFixture.getInput('nom');
      await inputName.type('Quiz E2E');
      const inputTheme = await quizFormFixture.getInput('theme');
      await inputTheme.type('E2E');

      const boutonCreationQuiz = await page.locator('button#valider');
      await boutonCreationQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

    });


  });
});
