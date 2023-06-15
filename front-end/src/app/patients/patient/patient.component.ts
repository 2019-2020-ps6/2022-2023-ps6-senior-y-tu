import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { Patient } from "src/models/personne.model";
import {Router} from "@angular/router";
import {ConfigurationService} from "../../../services/configuration.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {PatientConfiguration} from "../../autre/patientConfiguration";

@Component({
  selector: 'app-patient',
  templateUrl: 'patient.component.html',
  styleUrls: ['./patient.component.scss']
})

export class PatientComponent implements OnInit{

  @Input()
  patient: Patient | undefined ;

  @Output()
  patientDeleted: EventEmitter<Patient> = new EventEmitter<Patient>();

  constructor(private route : Router, public configurationService : ConfigurationService, private sanitizer: DomSanitizer, private p : PatientConfiguration) { }

  ngOnInit(): void { }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  stockerPatient(): void {
    if (this.patient != undefined) {
      this.configurationService.getSelectedConfiguration(this.patient.id)
      this.configurationService.configurationSelected$.subscribe((config) =>{
        if (localStorage.getItem("autresTouchesAppuyer") != null) {
          localStorage.removeItem("autresTouchesAppuyer")
          localStorage.removeItem("nombreDeplacement")
        }
        localStorage.setItem("autresTouchesAppuyer", "")
        localStorage.setItem("nombreDeplacement", "0")
        document.cookie = "name=" + this.patient?.id + ";";
        this.p.patient = this.patient;
        this.p.config = config;
        this.route.navigate(['/theme-list'])
      })
    }
  }

  deletePatient(){
    this.patientDeleted.emit(this.patient);
  }
}
