import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {Handicap_Fort_Aide, Handicap_Leger_Aide} from "../../enums/enumPatient";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent{
  constructor(private rooter: Router) { }

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";
    if (handicap == "leger" && (e.key == Handicap_Leger_Aide.U || e.key == Handicap_Leger_Aide.ETOILE)) {
      this.rooter.navigate(['/page-aide'])
    }
    else if(handicap != "leger" && (e.key == Handicap_Fort_Aide.TIRET_BAS || e.key == Handicap_Fort_Aide.C
      || e.key == Handicap_Fort_Aide.U || e.key == Handicap_Fort_Aide.I)) {
      this.rooter.navigate(['/page-aide']);
    }
  }
}
