import {Component, OnInit} from '@angular/core';
import { Patient} from "../../../models/personne.model";
import { PatientService} from "../../../services/patient.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConfigurationService} from "../../../services/configuration.service";
import {Configuration} from "../../../models/configuration.model";

@Component({
  selector: 'app-creer-patients',
  templateUrl: './creer-patients.component.html',
  styleUrls: ['./creer-patients.component.scss']
})
export class CreerPatientsComponent implements  OnInit{
  public patientForm : FormGroup;

  constructor(public formBuilder: FormBuilder, public patientService: PatientService, public  configurationService : ConfigurationService) {
    this.patientForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      dateNaissance: [' '],
      image:[' '],
      idconfiguration: [' '],
      idstatistiques: [' '],
      handicap:[' '],
      explication: [' '],
      police: [' '],
      souris:[' ']
    });
  }
  ngOnInit(): void {  }


  onCreer() {
    const valeur = this.patientForm.getRawValue();

    const patient: Patient = {
      nom: valeur.nom,
      prenom: valeur.prenom,
      dateNaissance: valeur.dateNaissance,
      image: valeur.image,
      id: valeur.id
    };


    this.patientService.addPatient(patient);
    let idP : string| undefined = undefined;
    this.patientService.patientSelected$.subscribe((patient) => {
      idP = patient.id.toString();
      const config: Configuration = {
        handicap: valeur.handicap,
        souris: valeur.souris,
        explication: valeur.explication,
        police: valeur.police,
        idPatient: idP,
        id: valeur.id
      }
      this.configurationService.addConfiguration(config);
    });
  }
}
