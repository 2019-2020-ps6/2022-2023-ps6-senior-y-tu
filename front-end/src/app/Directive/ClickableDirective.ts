import {Directive, Input, HostListener, ElementRef} from "@angular/core";
import {Router} from "@angular/router";

@Directive({
  selector: "[appClickable]"
})

export class ClickableDirective {
  private verifyUtilisationSouris : boolean;

  @Input()
  appClickable = ' ';

  @HostListener('click') onClick() {
    if (this.verifyUtilisationSouris) {
      this.root.navigate([this.appClickable]);
    }
  }

  public constructor(private root: Router, private el: ElementRef) {
    this.verifyUtilisationSouris = "oui" == localStorage.getItem("patient-utilisation_souris");
    if (this.verifyUtilisationSouris) {
      el.nativeElement.style.cursor = "pointer";
    }
    else
      el.nativeElement.style.cursor = "default";
  }

  public static deplacementPageCursor(changementDeplacement: number[]): void {
    setInterval(() => {
      if (changementDeplacement[0] == changementDeplacement[2] && changementDeplacement[5])
        changementDeplacement[4] = 0;
      else if (changementDeplacement[0] != changementDeplacement[2] && !changementDeplacement[5]){
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
