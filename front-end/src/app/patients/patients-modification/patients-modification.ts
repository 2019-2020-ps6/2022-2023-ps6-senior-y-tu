import {Component, Input, OnInit} from '@angular/core';
import { Patient} from "../../../models/personne.model";
import { PatientService} from "../../../services/patient.service";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PATIENT_LISTE} from "../../../mocks/personne-list.mock";
import {Configuration} from "../../../models/configuration.model";
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-patiens-modification',
  templateUrl: './patients-modification.html',
  styleUrls: ['./patients-modification.scss']
})
export class PatientsModificationComponent {

  public patientForm : FormGroup = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    dateNaisance: new FormControl(''),
    idconfiguration: new FormControl(''),
    idstatitique : new FormControl('')
  });

  protected patientAMettreJour : Patient | undefined;

  @Input()
  configurationAMettreJour: Configuration | undefined;


  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, public patientService : PatientService, public configuration : ConfigurationService){
    const id = this.route.snapshot.paramMap.get('id');
    if(id != null) {
      this.patientService.getPatientsById(id);
      this.patientService.patientSelected$.subscribe((patient) => {
        this.patientAMettreJour = patient;
      })
    }
    this.configuration.configurations$.subscribe((configurations) => {
      this.configurationAMettreJour = configurations.find(config => config.id == this.patientAMettreJour?.idconfiguration);
    })

    /*this.patientForm = this.formBuilder.group( {
      id: [''],
      nom:[''],
      prenom:[''],
      dateNaissance:[''],
      idconfiguration : [''],
      image:[''],
      idstatitique: ['']
    });*/

    /*this.patientForm.patchValue( {
      id: this.patientAMettreJour?.id,
      nom: this.patientAMettreJour?.nom,
      prenom: this.patientAMettreJour?.prenom,
      dateNaisance: this.patientAMettreJour?.dateNaissance,
      idconfiguration: this.patientAMettreJour?.idconfiguration,
      idstatitique : this.patientAMettreJour?.idstatistiques
      }
    )*/
  }
  ngOnInit(): void {
  }
  modifierPatient() { // faire que prend aussi les valeur non modifier

    const  patient : Patient = this.patientForm.value as Patient;
    console.log('patient', patient)
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
      this.configurationAMettreJour!.explication = "oui";
      // @ts-ignore
      document.getElementById("explication-non").checked = false;
    }
    else {
      // @ts-ignore
      document.getElementById("explication-oui").checked = false;
      // @ts-ignore
      document.getElementById("explication-non").checked = true;
      this.configurationAMettreJour!.explication = "non";
    }
    this.modifierPatient();
  }

  onRadioChangeHandicap(name : String) {
    if (name == "handicap-leger") {
      // @ts-ignore
      document.getElementById("handicap-leger").checked = true;
      // @ts-ignore
      document.getElementById("handicap-fort").checked = false;
      this.configurationAMettreJour!.handicap = 'leger';
    }
    else {
      // @ts-ignore
      document.getElementById("handicap-leger").checked = false;
      // @ts-ignore
      document.getElementById("handicap-fort").checked = true;
      this.configurationAMettreJour!.handicap = 'fort';
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
      document.getElementById("police-52").checked = false;
      this.configurationAMettreJour!.police = 24;
    }
    else if(name == "police-40")
    {
      // @ts-ignore
      document.getElementById("police-24").checked = false;
      // @ts-ignore
      document.getElementById("police-40").checked = true;
      // @ts-ignore
      document.getElementById("police-52").checked = false;
      this.configurationAMettreJour!.police = 40;
    }
    else
    {
      // @ts-ignore
      document.getElementById("police-24").checked = false;
      // @ts-ignore
      document.getElementById("police-40").checked = false;
      // @ts-ignore
      document.getElementById("police-52").checked = false;
      this.configurationAMettreJour!.police = 52;
    }
    this.modifierPatient();
  }
  onRadioChangeSouris(name : String) {
    if (name == "souris-oui") {
      // @ts-ignore
      document.getElementById("souris-oui").checked = true;
      // @ts-ignore
      document.getElementById("souris-non").checked = false;
      this.configurationAMettreJour!.souris = 'oui';
    }
    else {
      // @ts-ignore
      document.getElementById("souris-oui").checked = false;
      // @ts-ignore
      document.getElementById("souris-non").checked = true;
      this.configurationAMettreJour!.souris = 'non';
    }
    this.modifierPatient();
  }
}
