import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class QuizFormFixture extends E2EComponentFixture {
  getQuizForm() {
    return this.page.waitForSelector('app-creer-quiz');
  }

  getInput(id: string) {
    const selector = `app-creer-quiz input[id="${id}"]`;
    return this.page.waitForSelector(selector);
  }

  getCreateButton() {
    return this.page.getByRole('button', { name: 'Créer un nouveau quiz' });
  }

  clickCreateButton() {
    return this.getCreateButton().click();
  }
}
