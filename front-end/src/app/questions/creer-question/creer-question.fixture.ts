import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class QuestionFormFixture extends E2EComponentFixture {

  getIntituleInput() {
    return this.page.waitForSelector('app-creer-question input[id="intitule"]');
  }

  getAllAnswersInputs(type: string) {
    const selector = `app-creer-question .reponse-form input[type="${type}"]`;
    return this.page.$$(selector);
  }


  getCreateButton() {
    return this.page.getByRole('button', { name: 'Ajouter question' });
  }

  clickCreateButton(numberOfClick = 1) {
    return this.getCreateButton().click({ clickCount: numberOfClick });
  }

}
