import {Directive, Input, HostListener, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {Tuple} from "./Tuple";
import {PatientConfiguration} from "./patientConfiguration";

@Directive({
  selector: "[appClickable]"
})

export class ClickableDirective {
  private verifyUtilisationSouris : boolean;

  @Input()
  appClickable: Tuple | undefined;

  @HostListener('click') onClick() {
    if (this.verifyUtilisationSouris) {
      if (this.appClickable?.getParam() == null)
        this.root.navigate([this.appClickable?.getLien()]);
      else
        this.root.navigate([this.appClickable.getLien(), this.appClickable.getParam()])
    }
  }

  public constructor(private root: Router, private el: ElementRef, private patientConfig : PatientConfiguration) {
    this.verifyUtilisationSouris = (patientConfig.config != undefined && patientConfig.config.souris == "oui");
    if (this.verifyUtilisationSouris) {
      el.nativeElement.style.cursor = "pointer";
    }
    else
      el.nativeElement.style.cursor = "default";
  }

  public static deplacementPageCursor(changementDeplacement: number[]): void {
    setInterval(() => {
      if (changementDeplacement[0] == changementDeplacement[2] && changementDeplacement[4])
        changementDeplacement[4] = 0;
      else if (changementDeplacement[0] != changementDeplacement[2] && !changementDeplacement[4]){
        changementDeplacement[4] = 1;
        changementDeplacement[2] = changementDeplacement[0];
        changementDeplacement[3] = changementDeplacement[1];
        let nombreDeplacement = localStorage.getItem("nombreDeplacement");
        if (nombreDeplacement == null)
          nombreDeplacement = "0";
        localStorage.setItem("nombreDeplacement", "" + (parseInt(nombreDeplacement) + 1));
      }
      else {
        changementDeplacement[2] = changementDeplacement[0];
        changementDeplacement[3] = changementDeplacement[1];
      }
    }, 500);
  }
}
