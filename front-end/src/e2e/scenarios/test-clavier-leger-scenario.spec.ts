import  { test, expect } from '@playwright/test';
import {QuizFormFixture} from "../../app/quizs/creer-quiz/creer-quiz.fixture";
import {
  accueilUrl,
  creationPatientUrl, creationQuizUrl, pageAideUrl,
  pageStatGeneraleUrl,
  patientUrl, quizsErgoUrl,
  themeListUrl
} from "../e2e.config";
import {QuestionFormFixture} from "../../app/questions/creer-question/creer-question.fixture";
import {PatientFormFixture} from "../../app/patients/mes-patients/mes-patients.fixture";

test.describe('Test touche pour le clavier leger ', () => {
  test('test touche pour le clavier leger', async ({page}) => {
    await test.step('Accès à la page d\'accueil', async () => {

      await page.goto(accueilUrl);
      await expect(page).toHaveURL(accueilUrl);
    });

    await test.step('Accès au profil ergo', async () => {

      const titreE = await page.locator('span.titre-list-ergotherapeute');
      const ergo = await page.locator('app-ergo');

      expect(await titreE.innerText()).toBe('Ergothérapeutes');
      await ergo.click();

      await expect(page).toHaveURL(pageStatGeneraleUrl);
    });


    await test.step('Accès à la page des patients', async () => {

      const boutonMesPatients = await page.locator('a#mes-patients');
      boutonMesPatients.evaluateHandle((element: { click: () => any; }) => element.click());
      await expect(page).toHaveURL(patientUrl);
    });


    await test.step('Accès à la page de création de patient', async () => {

      const boutonCreationPatient = await page.locator('button.creation-patient');
      boutonCreationPatient.evaluateHandle((element: { click: () => any; }) => element.click());
      await expect(page).toHaveURL(creationPatientUrl);
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

      await expect(page).toHaveURL(patientUrl);
    });

    await test.step('Accès à la page des quizs', async () => {

      const boutonMesQuiz = await page.locator('a#mes-quizs');
      boutonMesQuiz.evaluateHandle((element: { click: () => any; }) => element.click());
      await expect(page).toHaveURL(quizsErgoUrl);
    });

    await test.step('Accès à la page de création de quiz', async () => {

      const boutonCreationQuiz = await page.locator('button.creation-quiz');
      await boutonCreationQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

      await expect(page).toHaveURL(creationQuizUrl);
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

    await test.step('Accès à la page de création de quiz2', async () => {
      const boutonValiderQuiz = await page.locator('button.valider-button')
      await boutonValiderQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

      const boutonCreationQuiz = await page.locator('button.creation-quiz');
      await boutonCreationQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

      await expect(page).toHaveURL(creationQuizUrl);
    });

    await test.step('Création d\'un second quiz', async () => {
      const quizFormFixture = new QuizFormFixture(page);


      const inputName = await quizFormFixture.getInput('nom');
      await inputName.type('Quiz E2E2');
      const inputTheme = await quizFormFixture.getInput('theme');
      await inputTheme.type('E2E2');

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

    await test.step('Accès à la page de création de quiz3', async () => {
      const boutonValiderQuiz = await page.locator('button.valider-button')
      await boutonValiderQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

      const boutonCreationQuiz = await page.locator('button.creation-quiz');
      await boutonCreationQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

      await expect(page).toHaveURL(creationQuizUrl);
    });

    await test.step('Création d\'un troisieme quiz', async () => {
      const quizFormFixture = new QuizFormFixture(page);


      const inputName = await quizFormFixture.getInput('nom');
      await inputName.type('Quiz E2E3');
      const inputTheme = await quizFormFixture.getInput('theme');
      await inputTheme.type('E2E3');

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

    await test.step('Accès à la page de création de quiz4', async () => {
      const boutonValiderQuiz = await page.locator('button.valider-button')
      await boutonValiderQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

      const boutonCreationQuiz = await page.locator('button.creation-quiz');
      await boutonCreationQuiz.evaluateHandle((element: { click: () => any; }) => element.click())

      await expect(page).toHaveURL(creationQuizUrl);
    });

    await test.step('Création d\'un quatrieme quiz', async () => {
      const quizFormFixture = new QuizFormFixture(page);


      const inputName = await quizFormFixture.getInput('nom');
      await inputName.type('Quiz E2E4');
      const inputTheme = await quizFormFixture.getInput('theme');
      await inputTheme.type('E2E4');

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

    await test.step('Se déconnecter', async () => {
      const boutonDeconnexion = await page.locator('button.button-card');
      await boutonDeconnexion.evaluateHandle((element: { click: () => any; }) => element.click());
      await expect(page).toHaveURL(accueilUrl);
    });

    await test.step('Se connecter en tant que patient', async () => {
      const boutonPatient = await page.locator('app-patient').last();
      await boutonPatient.click();
      await expect(page).toHaveURL(themeListUrl);

    });

    await test.step('test bouton colorer', async () => {
      let curseurColore = await page.locator('button.button-card').nth(1);
      let color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');

    })

    await test.step('deplacement à droite clavier fort qui ne fonctione pas', async () => {
      await page.keyboard.press('KeyO');
      let curseurColore = await page.locator('button.button-card').nth(1);
      let color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
      curseurColore = await page.locator('button.button-card').nth(2);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');

      await page.keyboard.press('!');
      curseurColore = await page.locator('button.button-card').nth(1);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
      curseurColore = await page.locator('button.button-card').nth(2);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');
    })

    await test.step('deplacement à droite clavier faible', async () => {
      await page.keyboard.press('ArrowRight');
      let curseurColore = await page.locator('button.button-card').nth(1);
      let color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');
      curseurColore = await page.locator('button.button-card').nth(2);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
    })

    await test.step('deplacement en bas clavier fort qui ne fonctione pas', async () => {
      await page.keyboard.press('KeyH');
      let curseurColore = await page.locator('button.button-card').nth(2);
      let color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
      curseurColore = await page.locator('button.button-card').nth(5);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');

      await page.keyboard.press(',');
      curseurColore = await page.locator('button.button-card').nth(2);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
      curseurColore = await page.locator('button.button-card').nth(4);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');
    })

    await test.step('deplacement en bas clavier faible', async () => {
      await page.keyboard.press('ArrowDown');
      let curseurColore = await page.locator('button.button-card').nth(2);
      let color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');
      curseurColore = await page.locator('button.button-card').nth(4);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
    })

    await test.step('deplacement à gauche clavier fort qui ne fonctione pas', async () => {
      await page.keyboard.press('KeyX');
      let curseurColore = await page.locator('button.button-card').nth(4);
      let color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
      curseurColore = await page.locator('button.button-card').nth(3);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');

      await page.keyboard.press('KeyA');
      curseurColore = await page.locator('button.button-card').nth(4);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
      curseurColore = await page.locator('button.button-card').nth(3);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');
    })

    await test.step('deplacement à gauche clavier faible', async () => {
      await page.keyboard.press('ArrowLeft');
      let curseurColore = await page.locator('button.button-card').nth(4);
      let color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');
      curseurColore = await page.locator('button.button-card').nth(3);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
    })

    await test.step('deplacement en haut clavier fort qui ne fonctione pas', async () => {
      await page.keyboard.press("'");
      let curseurColore = await page.locator('button.button-card').nth(3);
      let color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
      curseurColore = await page.locator('button.button-card').nth(1);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');

      await page.keyboard.press('KeyT');
      curseurColore = await page.locator('button.button-card').nth(3);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
      curseurColore = await page.locator('button.button-card').nth(1);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');
    })

    await test.step('deplacement en haut clavier faible', async () => {
      await page.keyboard.press('ArrowUp');
      let curseurColore = await page.locator('button.button-card').nth(3);
      let color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(242, 215, 195)');
      curseurColore = await page.locator('button.button-card').nth(1);
      color = await curseurColore.evaluate((element) => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.backgroundColor;
      })
      expect(color).toBe('rgb(180, 167, 214)');
    })

    await test.step('deplacement page d\'aide clavier fort qui ne fonctionne pas', async () => {
      await page.keyboard.press('_');
      await page.keyboard.press('KeyC', { shift: true });
      await expect(page).toHaveURL(themeListUrl);
      await expect(page).not.toHaveURL(pageAideUrl);
    })

    await test.step('deplacement page d\'aide clavier fort qui ne fonctionne pas', async () => {
      await page.keyboard.press('*');
      await expect(page).not.toHaveURL(themeListUrl);
      await expect(page).toHaveURL(pageAideUrl);
    })

    await test.step('retour a la page precedent clavier', async () => {
      await page.keyboard.press('Backspace');
      await expect(page).toHaveURL(themeListUrl);
      await expect(page).not.toHaveURL(pageAideUrl);
    })

    await test.step('valider la selection theme clavier ', async () => {
      await page.keyboard.press('Space');
      await expect(page).not.toHaveURL(themeListUrl);
      const expectedURLListeQuiz = await page.url();
      const expectedURLPatternListQuiz = /http:\/\/localhost:4200\/quiz-list\/\d+;?/;
      await expect(expectedURLListeQuiz).toMatch(expectedURLPatternListQuiz);
    })

    await test.step('valider la selection quiz clavier', async () => {
      await page.keyboard.press('Enter');
      const expectedURLListeQuiz = await page.url();
      const expectedURLPatternListQuiz = /http:\/\/localhost:4200\/commencer-quiz\/\d+;?/;
      await expect(expectedURLListeQuiz).toMatch(expectedURLPatternListQuiz);
    })
  });
});
