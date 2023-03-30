import { Component } from '@angular/core';
import {PatientService} from "../../../services/patient.service";
import {Patient} from "../../../models/personne.model";

@Component({
  selector: 'app-mes-patients',
  templateUrl: './mes-patients.component.html',
  styleUrls: ['./mes-patients.component.scss']
})
export class MesPatientsComponent {
  public patientListe: Patient[] = [];


  constructor(public patientService: PatientService) {
    this.patientService.patients$.subscribe((patientListe) => {
      this.patientListe = patientListe;
    });
  }

  ngOnInit(): void {}

  deletePatient(patient: Patient) {
    console.log('event received from child:', patient);
    this.patientService.deletePatient(patient);
  }
}
