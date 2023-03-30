import {Component, Input, OnInit} from '@angular/core';
import { Patient} from "../../../models/personne.model";
import { PatientService} from "../../../services/patient.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PATIENT_LISTE} from "../../../mocks/personne-list.mock";

@Component({
  selector: 'app-patiens-modification',
  templateUrl: './patients-modification.html',
  styleUrls: ['./patients-modification.scss']
})
export class PatientsModificationComponent {
  @Input()
  patient: Patient | undefined;
  patientForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public patientService: PatientService, private route: ActivatedRoute) {
    this.patientForm = this.formBuilder.group({
      nom: this.patient?.nom,
      prenom: this.patient?.prenom,
      dateNaissance: this.patient?.dateNaissance,
      image: this.patient?.dateNaissance,
      handicap: this.patient?.handicap,
      explication: this.patient?.explication,
      taille: this.patient?.taille
    });
  }
  DateNaissance: Date | undefined;
  DateDeNaissance: string | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.patient = PATIENT_LISTE.find(patient => patient.id == id);
    // @ts-ignore
    this.DateNaissance = new Date(this.patient?.dateNaissance);
    this.DateDeNaissance = this.DateNaissance?.toDateString();
    console.log(this.DateDeNaissance);

  }
  onCreer() {
    const patient: Patient = this.patientForm.getRawValue() as Patient;
    this.patientService.addPatient(patient);
    console.log(this.patientService);
    console.log('Patient Ajouté: ', patient);
  }
}
