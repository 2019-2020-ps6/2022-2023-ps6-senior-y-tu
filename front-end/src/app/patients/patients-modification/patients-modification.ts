import {Component, Input, OnInit} from '@angular/core';
import { Patient} from "../../../models/personne.model";
import { PatientService} from "../../../services/patient.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
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
      patient.image = <string>this.patientAMettreJour?.image;
    }
    this.patientService.updatePatient(this.patientAMettreJour, patient);
    console.log('Patient Modifier: ', patient);
  }

  onRadioChangeExplication(name : String) {
    if (name == "explication-oui") {
      // @ts-ignore
      document.getElementById("explication-oui").checked = true;
      this.patientAMettreJour!.explication = "oui";
      // @ts-ignore
      document.getElementById("explication-non").checked = false;
    }
    else {
      // @ts-ignore
      document.getElementById("explication-oui").checked = false;
      // @ts-ignore
      document.getElementById("explication-non").checked = true;
      this.patientAMettreJour!.explication = "non";
    }
    this.modifierPatient();
  }

  onRadioChangeHandicap(name : String) {
    if (name == "handicap-leger") {
      // @ts-ignore
      document.getElementById("handicap-leger").checked = true;
      // @ts-ignore
      document.getElementById("handicap-fort").checked = false;
      this.patientAMettreJour!.handicap = 'leger';
    }
    else {
      // @ts-ignore
      document.getElementById("handicap-leger").checked = false;
      // @ts-ignore
      document.getElementById("handicap-fort").checked = true;
      this.patientAMettreJour!.handicap = 'fort';
    }
    this.modifierPatient();
  }

  onRadioChangeTaille(name : String) {
    if (name == "police-24") {
      // @ts-ignore
      document.getElementById("police-24").checked = true;
      // @ts-ignore
      document.getElementById("police-40").checked = false;
      // @ts-ignore
      document.getElementById("police-60").checked = false;
      this.patientAMettreJour!.taille = 24;
    }
    else if(name == "police-40")
    {
      // @ts-ignore
      document.getElementById("police-24").checked = false;
      // @ts-ignore
      document.getElementById("police-40").checked = true;
      // @ts-ignore
      document.getElementById("police-60").checked = false;
      this.patientAMettreJour!.taille = 40;
    }
    else
    {
      // @ts-ignore
      document.getElementById("police-24").checked = false;
      // @ts-ignore
      document.getElementById("police-40").checked = false;
      // @ts-ignore
      document.getElementById("police-60").checked = false;
      this.patientAMettreJour!.taille = 60;
    }
    this.modifierPatient();
  }
  onRadioChangeSouris(name : String) {
    if (name == "souris-oui") {
      // @ts-ignore
      document.getElementById("souris-oui").checked = true;
      // @ts-ignore
      document.getElementById("souris-non").checked = false;
      this.patientAMettreJour!.souris = 'oui';
    }
    else {
      // @ts-ignore
      document.getElementById("souris-oui").checked = false;
      // @ts-ignore
      document.getElementById("souris-non").checked = true;
      this.patientAMettreJour!.souris = 'non';
    }
    this.modifierPatient();
  }
}
