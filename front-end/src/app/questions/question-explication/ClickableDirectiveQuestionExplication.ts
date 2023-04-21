import {Directive, ElementRef, HostListener} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Directive({
  selector: '[appDirectiveQuestionExplication]'
})
export class ClickableDirectiveQuestionExplication {
  private id = 1;
  private estClickable = false;

  @HostListener('click') onClick() {
    if (this.estClickable)
      if (this.id == 1)
        this.root.navigate(["show-question", 2]);
      else
        this.root.navigate(["quiz-resultat"]);
  }

  public constructor(private root : Router, private el : ElementRef, private activeRouteur : ActivatedRoute) {
    this.estClickable = localStorage.getItem("patient-utilisation_souris") == "oui";
    let idTemp = activeRouteur.snapshot.paramMap.get("id");
    if (idTemp != null)
      this.id = parseInt(idTemp);
    el.nativeElement.style.cursor = (this.estClickable)? "pointer" : "default";
  }
}
