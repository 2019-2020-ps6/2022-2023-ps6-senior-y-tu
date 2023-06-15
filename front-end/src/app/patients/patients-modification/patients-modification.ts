import {Component, Input, OnInit} from '@angular/core';
import { Patient} from "../../../models/personne.model";
import { PatientService} from "../../../services/patient.service";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Configuration} from "../../../models/configuration.model";
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-patiens-modification',
  templateUrl: './patients-modification.html',
  styleUrls: ['./patients-modification.scss']
})
export class PatientsModificationComponent {

  public valeurForm : FormGroup = new FormGroup({
    id: new FormControl(' '),
    nom: new FormControl(' '),
    prenom: new FormControl(' '),
    dateNaisance: new FormControl(' '),
    image: new FormControl(' '),
    police : new FormControl(''),
    explication: new FormControl(''),
    souris : new FormControl(''),
    handicap: new FormControl('')
  });

  protected patientAMettreJour : Patient | undefined;

  @Input()
  configurationAMettreJour: Configuration | undefined;


  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, public patientService : PatientService, public configurationService : ConfigurationService){
    const id = this.route.snapshot.paramMap.get('id');
    if(id != null) {
      this.patientService.getPatientsById(id);
      this.patientService.patientSelected$.subscribe((patient) => {
        this.patientAMettreJour = patient;
      })
      this.configurationService.configurations$.subscribe((configurations) => {
        this.configurationAMettreJour = configurations.find(config => config.idPatient == id);
      })
    }
  }
  ngOnInit(): void {
  }
  modifierPatient() { // faire que prend aussi les valeur non modifier
    const valeur = this.valeurForm.getRawValue();
    const id = this.route.snapshot.paramMap.get('id');
    console.log(valeur);
    if (id != null) {
      const patient: Patient = {
        nom: valeur.nom,
        prenom: valeur.prenom,
        dateNaissance: valeur.dateNaissance,
        image: valeur.image,
        id: id
      };
      console.log('patient', patient)
      if (patient.image == ' ') {
        patient.image = <string>this.patientAMettreJour?.image;
      }

      const config: Configuration = {
        handicap: valeur.handicap,
        souris: valeur.souris,
        explication: valeur.explication,
        police: valeur.police,
        idPatient: id,
        id: valeur.id
      }
      this.patientService.updatePatient(this.patientAMettreJour, patient);
      this.configurationService.updateConfiguration(this.configurationAMettreJour, config)
      console.log('Configuration Modifier: ',config);
    }
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
  }
}
