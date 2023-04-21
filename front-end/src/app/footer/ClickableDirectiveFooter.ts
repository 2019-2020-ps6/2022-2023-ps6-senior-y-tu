import {Directive, ElementRef, HostListener} from "@angular/core";
import {Router} from "@angular/router";

@Directive({
  selector: '[clickableDirectiveFooter]'
})
export class ClickableDirectiveFooter {
  private estClickable;

  @HostListener('click') onClick() {
    if (this.estClickable)
      this.root.navigate(["/page-aide"]);
  }

  public constructor(private root : Router, private el : ElementRef) {
    this.estClickable = (localStorage.getItem("patient-utilisation_souris") == "oui");
    el.nativeElement.style.cursor = (this.estClickable)? "help" : "default";
  }
}
