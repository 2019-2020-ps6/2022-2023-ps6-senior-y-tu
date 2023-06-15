import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {Reponse} from "../../../models/question.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientConfiguration} from "../../autre/patientConfiguration";

@Directive({
  selector: '[appQuestionDirective]'
})
export class ClickableDirectiveQuestion {
  private possibleClickable;

  @Input()
  appQuestionDirective: Reponse | undefined;

  @HostListener('click') onClick() {
    if (this.possibleClickable && this.appQuestionDirective != undefined)
      this.reponseNavigation(this.appQuestionDirective)
  }

  constructor(private root : Router, private route : ActivatedRoute, private el : ElementRef, private patientConfig: PatientConfiguration) {
    this.possibleClickable = (patientConfig.config != undefined && patientConfig.config.souris == "oui");
    el.nativeElement.style.cursor = (this.possibleClickable)? "pointer" : "default";
  }

  private reponseNavigation(reponse: Reponse): void {
    const idQz = this.route.snapshot.paramMap.get('id');
    const idQt = this.route.snapshot.paramMap.get('questionId');
    this.root.navigate(['question-explication/',  idQz, idQt, reponse.id]);
  }
}
