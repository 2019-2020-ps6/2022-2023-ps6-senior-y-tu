import {E2EComponentFixture} from "../../../e2e/e2e-component.fixture";

export class PatientFormFixture extends E2EComponentFixture {
  get PatientForm() {
    return this.page.waitForSelector('patient-form');
  }
  getInput(id:string) {
    return this.page.getByTestId(id);
  }
  getButton() {
    return this.page.getByRole('button', {name:'Créer un nouveau patient'});
  }
  clickButton() {
    return this.getButton().click();
  }
}
