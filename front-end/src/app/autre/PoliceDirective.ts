import {Directive, ElementRef, Input} from "@angular/core";
import {Subject} from "rxjs";
import {Configuration} from "../../models/configuration.model";
import {PatientConfiguration} from "./patientConfiguration";
import {ActivatedRoute} from "@angular/router";


@Directive({
  selector: '[appPolice]'
})

export class PoliceDirective {

  @Input()
  appPolice: Subject<Configuration> | undefined

  constructor(private el: ElementRef, private p : PatientConfiguration) {
      this.el.nativeElement.style.fontSize = `${p.config?.police}px`
  }
}
