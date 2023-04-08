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

  public patientForm : FormGroup;

  @Input()
  patientAMettreJour : Patient | undefined;

  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, public patientService : PatientService){
    const id = this.route.snapshot.paramMap.get('id');
    this.patientAMettreJour = PATIENT_LISTE.find(patient => patient.id == id);

    this.patientForm = this.formBuilder.group( {
      id: [''],
      nom:[''],
      prenom:[''],
      dateNaissance:[''],
      handicap:[''],
      explication:[''],
      taille:[''],
      souris:[''],
      image:['']
    });

    this.patientForm.patchValue( {
      id: this.patientAMettreJour?.id,
      nom: this.patientAMettreJour?.nom,
      prenom: this.patientAMettreJour?.prenom,
      dateNaisance: this.patientAMettreJour?.dateNaissance,
      explication: this.patientAMettreJour?.explication,
      handicap: this.patientAMettreJour?.handicap,
      taille: this.patientAMettreJour?.taille,
      souris: this.patientAMettreJour?.souris,
      image : ''
      }
    )
  }
  ngOnInit(): void {
  }
  modifierPatient() {
    const  patient : Patient = this.patientForm.getRawValue() as Patient;
    if (patient.image == '') {
      // @ts-ignore
      patient.image = this.patientAMettreJour?.image;
    }
    this.patientService.updatePatient(this.patientAMettreJour, patient);
    console.log('Patient Modifier: ', patient);
  }
}
