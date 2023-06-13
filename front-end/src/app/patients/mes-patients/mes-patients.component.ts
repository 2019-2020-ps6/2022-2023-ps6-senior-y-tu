import { Component } from '@angular/core';
import {PatientService} from "../../../services/patient.service";
import {Patient} from "../../../models/personne.model";
import {Configuration} from "../../../models/configuration.model";
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-mes-patients',
  templateUrl: './mes-patients.component.html',
  styleUrls: ['./mes-patients.component.scss']
})
export class MesPatientsComponent {
  public patientListe: Patient[] = [];
  public configurationList : Configuration[] = [];
  public searchTerm: string = '';


  constructor(public patientService: PatientService, public configurationService : ConfigurationService) {
    this.patientService.patients$.subscribe((patientListe) => {
      this.patientListe = patientListe;
    });

    this.configurationService.configurations$.subscribe((configurations) => {
      this.configurationList = configurations;
    })
  }

  ngOnInit(): void {}

  deletePatient(patient: Patient) {
    console.log('event received from child:', patient);
    this.patientService.deletePatient(patient);
  }

  getConfiguration(patient: Patient) {
    return this.configurationList.find(config => config.idPatient == patient.id);
  }


  public filterPatients(searchTerm: string): any[] {
    if (!searchTerm) {
      return this.patientListe;
    }
    return this.patientListe.filter((patient: any) => {
      return patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) || patient.prenom.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
