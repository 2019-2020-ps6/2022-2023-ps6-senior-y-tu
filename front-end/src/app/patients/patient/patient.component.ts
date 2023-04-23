import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { Patient } from "src/models/personne.model";
import {Router} from "@angular/router";

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

  constructor(private route : Router) {
  }

  ngOnInit(): void {}

  stockerPatient(): void {
    if (this.patient != undefined) {
      if(localStorage.getItem("patient-prenom") != undefined) {
        localStorage.removeItem("patient-prenom");
        localStorage.removeItem("patient-handicap");
        localStorage.removeItem("patient-explication");
        localStorage.removeItem("patient-taille");
        localStorage.removeItem("patient-utilisation_souris")
      }
      localStorage.setItem("patient-prenom", this.patient.prenom);
      localStorage.setItem("patient-handicap", this.patient.handicap);
      localStorage.setItem("patient-explication", this.patient.explication);
      localStorage.setItem("patient-taille", String(this.patient.taille));
      localStorage.setItem("patient-utilisation_souris", this.patient.souris);
      this.route.navigate(['/theme-list'])
    }
  }

  deletePatient(){
    this.patientDeleted.emit(this.patient);
  }
}
