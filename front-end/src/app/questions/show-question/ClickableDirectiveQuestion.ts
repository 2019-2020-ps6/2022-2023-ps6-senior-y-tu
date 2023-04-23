import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {Reponse} from "../../../models/question.model";
import {ActivatedRoute, Router} from "@angular/router";

@Directive({
  selector: '[appQuestionDirective]'
})
export class ClickableDirectiveQuestion {
  private possibleClickable;
  private id;

  @Input() appQuestionDirective: Reponse | undefined;

  @HostListener('click') onClick() {
    if (this.possibleClickable && this.appQuestionDirective != undefined)
      this.reponseNavigation(this.appQuestionDirective)
  }

  constructor(private root : Router, private route : ActivatedRoute, private el : ElementRef) {
    this.possibleClickable = localStorage.getItem("patient-utilisation_souris") == "oui";
    el.nativeElement.style.cursor = (this.possibleClickable)? "pointer" : "default";
    this.id = route.snapshot.paramMap.get("id");
  }

  private reponseNavigation(reponse: Reponse): void {
    console.log(reponse);
    if(reponse.estCorrect) {
      if (this.id == '1'){
        this.root.navigate(['question-explication',1])
      }if (this.id == '2'){
        this.root.navigate(['question-explication',2])
      }
    }
    else {
      if (this.id == '1'){
        this.root.navigate(['question-explication',1])
      }if (this.id == '2'){
        this.root.navigate(['question-explication',2])
      }    }
  }
}
