import  { test, expect } from '@playwright/test';
import {QuizFormFixture} from "../../app/quizs/creer-quiz/creer-quiz.fixture";
import {quizsErgo} from "../e2e.config";
import {QuestionFormFixture} from "../../app/questions/creer-question/creer-question.fixture";
import {QuizModificationFixture} from "../../app/quizs/quiz-modification/quiz-modification.fixture";
import {QuestionModificationFixture} from "../../app/questions/question-modification/question-modification.fixture";


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
      const inputImage = await quizFormFixture.getInput('image');
      await inputImage.type('a');

      const boutonCreationQuiz = await page.locator('button#valider');
      await boutonCreationQuiz.evaluateHandle((element: { click: () => any; }) => element.click());


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

      const inputImage = await questionFormFixture.getInput('img');
      await inputImage.type('a');

      const inputExplication = await questionFormFixture.getTextArea();
      await inputExplication.type('Paris est la capitale de la France');

      await questionFormFixture.clickCreateButton();
    });

    await test.step('modifier quiz', async () => {
      await page.goto(quizsErgo);

      const quizModificationFixture = new QuizModificationFixture(page);

      const boutonModifierQuiz = await page.locator('button.modifier-quiz').last();
      await boutonModifierQuiz.evaluateHandle((element: { click: () => any; }) => element.click());

      const inputName = await quizModificationFixture.getInput('nom');
      await inputName.fill('');
      await inputName.type('E2E2'  );

      const boutonVoirQuestions = await page.locator('button#voir-question');
      await boutonVoirQuestions.evaluateHandle((element: { click: () => any; }) => element.click());
    });

    await test.step('modifier question', async () => {
      const questionModificationFixture = new QuestionModificationFixture(page);

      const boutonModifierQuestion = await page.locator('button.question-list-modif-button').last();
      await boutonModifierQuestion.evaluateHandle((element: { click: () => any; }) => element.click());

      const inputIntitule = await questionModificationFixture.getIntituleInput();
      await inputIntitule.fill('');
      await inputIntitule.type('Quel est le nom de la capitale de l Espagne ?');

      const inputReponse3 = (await questionModificationFixture.getAllAnswersInputs('text'))[2];
      await inputReponse3.fill('');
      await inputReponse3.type('Madrid');
      const vraiRep = (await questionModificationFixture.getAllAnswersInputs('radio'))[2];
      await vraiRep.check();

      const boutonValider = await page.locator('button#Valider');
      await boutonValider.evaluateHandle((element: { click: () => any; }) => element.click());
    });

    await test.step('supprimer question', async () => {
      const boutonModifierQuestion = await page.locator('button.question-list-modif-button');
      await boutonModifierQuestion.evaluateHandle((element: { click: () => any; }) => element.click());

      const boutonSupprimerQuestion = await page.locator('button#supprimer');
      await boutonSupprimerQuestion.evaluateHandle((element: { click: () => any; }) => element.click());

    });

    await test.step('supprimer quiz', async () => {
      page.goto(quizsErgo);
      const boutonSupprimerQuiz = await page.locator('button.supprimer-quiz').last();
      await boutonSupprimerQuiz.evaluateHandle((element: { click: () => any; }) => element.click());
    });


  });
});
