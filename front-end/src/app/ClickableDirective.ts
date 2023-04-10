import {Directive, Input, ElementRef} from "@angular/core";
import {Router} from "@angular/router";

@Directive({
  selector: "[appClickable]"
})

export class ClickableDirective {
  @Input()
  lien : string | undefined

  public constructor(private root : Router, private el : ElementRef) {
    let utilisationSouris = localStorage.getItem("patient-utilisation_souris");
    if (this.lien != undefined && utilisationSouris != null && utilisationSouris == "oui") {
      console.log(utilisationSouris);
    }
  }

  private onClick(): void {
      this.root.navigate([this.lien]);
  }
}
