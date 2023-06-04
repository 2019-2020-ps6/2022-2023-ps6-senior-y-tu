import {Component, OnInit} from '@angular/core';
import { Patient} from "../../../models/personne.model";
import { PatientService} from "../../../services/patient.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PATIENT_LISTE} from "../../../mocks/personne-list.mock";
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

    const configuration: Configuration = {
      handicap:valeur.handicap,
      souris:valeur.souris,
      explication:valeur.explication,
      police:valeur.police,
      id:valeur.id
    };
    const patient: Patient = {
      nom:valeur.nom,
      prenom:valeur.prenom,
      dateNaissance: valeur.dateNaissance,
      image:valeur.image,
      idconfiguration:configuration.id,
      idstatistiques:valeur.idstatistiques,
      id: valeur.id
    };


    this.patientService.addPatient(patient);
    this.configurationService.addConfiguration(configuration);
    console.log(configuration);
    console.log(patient);
    console.log(this.configurationService);
    console.log(this.patientService);
    console.log('Patient Ajouté: ', patient);
    console.log('Configuration ajoter', configuration);
  }

}
