import { E2EComponentFixture } from "../../../e2e/e2e-component.fixture";

export class QuizModificationFixture extends E2EComponentFixture {
  getQuizForm() {
    return this.page.waitForSelector('app-quiz-modification');
  }

  getInput(id: string) {
    const selector = `app-quiz-modification input[id="${id}"]`;
    return this.page.waitForSelector(selector);
  }




}
