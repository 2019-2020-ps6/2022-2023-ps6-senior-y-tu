import  { test, expect } from '@playwright/test';
import {QuizFormFixture} from "../../app/quizs/creer-quiz/creer-quiz.fixture";


// This file is here to test the playwright integration
test.describe('Creation quiz', () => {
  test('Création quiz', async  ({ page }) => {
    await page.goto("http://localhost:4200/mes-quizs");

    const quizFormFixture = new QuizFormFixture(page);

    const boutonCreationQuiz = await page.locator('button.creation-quiz');
    await boutonCreationQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

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
