export class Tuple {
  private param : string | undefined;
  private lien : string;

  constructor(lien: string, param: string | undefined) {
    this.lien = lien;
    this.param = param;
  }

  public getLien(): string {
    return this.lien;
  }

  public getParam(): string | undefined {
    return this.param;
  }
}
