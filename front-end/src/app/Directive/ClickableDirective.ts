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
    if (this.verifyUtilisationSouris)
      el.nativeElement.style.cursor = "pointer";
    else
      el.nativeElement.style.cursor = "default";
  }
}
