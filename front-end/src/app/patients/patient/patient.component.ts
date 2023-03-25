import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { Patient } from "src/models/personne.model";

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

  constructor() {
  }

  ngOnInit(): void {}

  deletePatient(){
    this.patientDeleted.emit(this.patient);
  }
}
