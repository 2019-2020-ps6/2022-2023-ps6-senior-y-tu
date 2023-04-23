import {Directive, ElementRef, HostListener} from "@angular/core";
import {Location} from "@angular/common";

@Directive({
  selector: '[appDirectivePageAide]'
})

export class ClickableDirectivePageAide {
  private estClickacle;
  @HostListener('click') onClick() {
    if (this.estClickacle)
      this.location.back();
  }

  public constructor(private el : ElementRef, private location: Location) {
    this.estClickacle = localStorage.getItem("patient-utilisation_souris") == "oui";
    el.nativeElement.style.cursor = (this.estClickacle)? "pointer" : "default";
  }
}
