import { Component, OnInit } from '@angular/core';
import {PatientConfiguration} from "../../autre/patientConfiguration";
import {Subject} from "rxjs";
import {Patient} from "../../../models/personne.model";

@Component({
  selector: 'app-header-patient',
  templateUrl: './headerPatient.component.html',
  styleUrls: ['./headerPatient.component.scss']
})
export class HeaderPatientComponent implements OnInit {

  constructor(protected patientConfig : PatientConfiguration) {}

  protected dialog(): void {
    let dialog = document.getElementsByTagName("dialog")[0];
    dialog.showModal();
  }

  ngOnInit(): void {
  }

}
