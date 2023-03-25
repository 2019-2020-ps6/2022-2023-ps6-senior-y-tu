import {Component, OnInit} from '@angular/core';
import { Patient} from "../../../models/personne.model";
import { PatientService} from "../../../services/patient.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-creer-patients',
  templateUrl: './creer-patients.component.html',
  styleUrls: ['./creer-patients.component.scss']
})
export class CreerPatientsComponent implements  OnInit{
  public patientForm : FormGroup;

  constructor(public formBuilder: FormBuilder, public patientService: PatientService) {
    this.patientForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      dateNaissance: [''],
      image:[''],
      handicap:[''],
      explication:[''],
      taille: 24
    });
  }
  ngOnInit(): void {  }


  onCreer() {
    const patient: Patient = this.patientForm.getRawValue() as Patient;
    this.patientService.addPatient(patient);
    console.log(this.patientService);
    console.log('Patient Ajouté: ', patient);
  }
}
