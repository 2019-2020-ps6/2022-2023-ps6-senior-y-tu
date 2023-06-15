import {Directive, ElementRef, HostListener} from "@angular/core";
import {Router} from "@angular/router";
import {PatientConfiguration} from "../autre/patientConfiguration";

@Directive({
  selector: '[clickableDirectiveFooter]'
})
export class ClickableDirectiveFooter {
  private estClickable;

  @HostListener('click') onClick() {
    if (this.estClickable)
      this.root.navigate(["/page-aide"]);
  }

  public constructor(private root : Router, private el : ElementRef, patientConfig: PatientConfiguration) {
    this.estClickable = (patientConfig.config != undefined && patientConfig.config.souris == "oui");
    el.nativeElement.style.cursor = (this.estClickable)? "help" : "default";
  }
}
