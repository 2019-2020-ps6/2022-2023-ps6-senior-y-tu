import { Component, OnInit } from "@angular/core";
import { Patient } from 'src/models/patient.model'
import {PatientService} from "src/services/patient.service";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})

export class PatientListComponent implements OnInit {

  public patientList: Patient[] = [];
  public ergoList: Patient[] = []

  constructor(public patientService: PatientService) {
      this.patientService.patients$.subscribe((patientList:Patient[]) => {
        this.patientList = patientList;
      });

    this.patientService.ergos$.subscribe((ergoList:Patient[]) => {
      this.ergoList = ergoList;
    });
  }

  ngOnInit(): void {}
}
