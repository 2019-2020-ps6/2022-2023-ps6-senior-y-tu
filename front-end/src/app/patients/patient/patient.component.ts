import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { Patient } from "src/models/personne.model";
import {Router} from "@angular/router";
import {ConfigurationService} from "../../../services/configuration.service";
import {Configuration} from "../../../models/configuration.model";

@Component({
  selector: 'app-patient',
  templateUrl: 'patient.component.html',
  styleUrls: ['./patient.component.scss']
})

export class PatientComponent implements OnInit{

  @Input()
  patient: Patient | undefined ;
  configuration : Configuration | undefined ;

  @Output()
  patientDeleted: EventEmitter<Patient> = new EventEmitter<Patient>();

  constructor(private route : Router, public configurationService : ConfigurationService) {
    this.configurationService.configurations$.subscribe((configurations) => {
      this.configuration = configurations.at(0);
    })
  }

  ngOnInit(): void {}

  stockerPatient(): void {
    if (this.patient != undefined && this.configuration != undefined) {
      if(localStorage.getItem("patient-prenom") != undefined) {
        localStorage.removeItem("patient-prenom");
        localStorage.removeItem("patient-handicap");
        localStorage.removeItem("patient-explication");
        localStorage.removeItem("patient-taille");
        localStorage.removeItem("patient-utilisation_souris")
      }
      localStorage.setItem("patient-prenom", this.patient.prenom);
      localStorage.setItem("patient-handicap", this.configuration.handicap);
      localStorage.setItem("patient-explication", this.configuration.explication);
      localStorage.setItem("patient-taille", String(this.configuration.police));
      localStorage.setItem("patient-utilisation_souris", this.configuration.souris);
      this.route.navigate(['/theme-list'])
    }
  }

  deletePatient(){
    this.patientDeleted.emit(this.patient);
  }
}
