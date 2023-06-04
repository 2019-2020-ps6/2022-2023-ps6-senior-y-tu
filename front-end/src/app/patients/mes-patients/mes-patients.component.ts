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
  public configurationList : Configuration | undefined;


  constructor(public patientService: PatientService, public configurationService : ConfigurationService) {
    this.patientService.patients$.subscribe((patientListe) => {
      this.patientListe = patientListe;
    });
    var i = 0;
    this.configurationService.configurations$.subscribe((configurations) => {
      this.configurationList = configurations.find(config => config.id == this.patientListe.at(i)?.idconfiguration);
      i = i+1;
    })
  }

  ngOnInit(): void {}

  deletePatient(patient: Patient) {
    console.log('event received from child:', patient);
    this.patientService.deletePatient(patient);
  }
}
