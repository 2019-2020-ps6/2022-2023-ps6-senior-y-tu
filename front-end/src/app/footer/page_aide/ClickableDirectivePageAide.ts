import {Directive, ElementRef, HostListener} from "@angular/core";
import {Location} from "@angular/common";
import {PatientConfiguration} from "../../autre/patientConfiguration";

@Directive({
  selector: '[appDirectivePageAide]'
})

export class ClickableDirectivePageAide {
  private estClickable;
  @HostListener('click') onClick() {
    if (this.estClickable)
      this.location.back();
  }

  public constructor(private el : ElementRef, private location: Location, private patientConfig : PatientConfiguration) {
    this.estClickable = (patientConfig.config != undefined && patientConfig.config.souris == "oui");
    el.nativeElement.style.cursor = (this.estClickable)? "pointer" : "default";
  }
}
