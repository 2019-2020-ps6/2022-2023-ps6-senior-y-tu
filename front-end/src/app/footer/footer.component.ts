import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {Handicap_Fort_Aide, Handicap_Leger_Aide} from "../../enums/enumPatient";
import {PatientConfiguration} from "../autre/patientConfiguration";
import {Subject} from "rxjs";
import {Configuration} from "../../models/configuration.model";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent{
  constructor(private rooter: Router, protected patientConfig: PatientConfiguration) {
  }

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    const handicap = (this.patientConfig.config != undefined)? this.patientConfig.config.handicap : "fort";
    const isLeger = handicap == "leger";
    if (isLeger && (e.key == Handicap_Leger_Aide.U || e.key == Handicap_Leger_Aide.ETOILE)) {
      this.rooter.navigate(['/page-aide'])
    }
    else if(!isLeger && (e.key == Handicap_Fort_Aide.TIRET_BAS || e.key == Handicap_Fort_Aide.C
      || e.key == Handicap_Fort_Aide.U || e.key == Handicap_Fort_Aide.I)) {
      this.rooter.navigate(['/page-aide']);
    }
  }
}
