import { Component } from '@angular/core';
import {PatientService} from "../../../services/patient.service";
import {Patient} from "../../../models/personne.model";
import {Configuration} from "../../../models/configuration.model";
import {ConfigurationService} from "../../../services/configuration.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-mes-patients',
  templateUrl: './mes-patients.component.html',
  styleUrls: ['./mes-patients.component.scss']
})
export class MesPatientsComponent {
  public patientListe: Patient[] = [];
  public configurationList : Configuration[] = [];
  public searchTerm: string = '';


  constructor(public patientService: PatientService, public configurationService : ConfigurationService, private sanitizer: DomSanitizer) {
    this.patientService.patients$.subscribe((patientListe) => {
      this.patientListe = patientListe;
    });

    this.configurationService.configurations$.subscribe((configurations) => {
      this.configurationList = configurations;
    })
  }

  ngOnInit(): void {}

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);

  }

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
