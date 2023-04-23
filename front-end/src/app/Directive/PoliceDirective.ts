import {Directive, ElementRef} from "@angular/core";


@Directive({
  selector: '[appPolice]'
})

export class PoliceDirective {

  constructor(private el: ElementRef) {
    let taille = localStorage.getItem("patient-taille");
    this.el.nativeElement.style.fontSize = `${taille}px`;
    console.log(Number(taille));
  }
}
