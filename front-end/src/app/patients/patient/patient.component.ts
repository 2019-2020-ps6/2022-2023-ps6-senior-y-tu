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

  @Output()
  patientDeleted: EventEmitter<Patient> = new EventEmitter<Patient>();

  constructor(private route : Router, public configurationService : ConfigurationService) { }

  ngOnInit(): void { }

  stockerPatient(): void {
    if (this.patient != undefined) {
      this.configurationService.getSelectedConfiguration(this.patient.id)
      this.configurationService.configurationSelected$.subscribe((config) =>{
        if (localStorage.getItem("patient-prenom") != undefined) {
          localStorage.removeItem("patient-prenom");
          localStorage.removeItem("patient-handicap");
          localStorage.removeItem("patient-explication");
          localStorage.removeItem("patient-taille");
          localStorage.removeItem("patient-utilisation_souris")
          localStorage.removeItem("autresTouchesAppuyer")
          localStorage.removeItem("nombreDeplacement")
          localStorage.removeItem("patient-utilisation_souris")
        }
        if (this.patient != undefined)
          localStorage.setItem("patient-prenom", this.patient.prenom);
        localStorage.setItem("patient-handicap", config.handicap);
        localStorage.setItem("patient-explication", config.explication);
        localStorage.setItem("patient-taille", String(config.police));
        localStorage.setItem("autresTouchesAppuyer", "")
        localStorage.setItem("nombreDeplacement", "0")
        localStorage.setItem("patient-utilisation_souris", config.souris);
        this.route.navigate(['/theme-list'])
      })
    }
  }

  deletePatient(){
    this.patientDeleted.emit(this.patient);
  }
}
