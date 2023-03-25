import {Component, Injectable, OnInit} from "@angular/core";
import {Ergo, Patient} from 'src/models/personne.model'
import {PatientService} from "src/services/patient.service";
import {ErgoService} from "../../../services/ergo.service";

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-personne-list',
  templateUrl: './personne-list.component.html',
  styleUrls: ['./personne-list.component.scss']
})

export class PersonneListComponent implements OnInit {

  public patientList: Patient[] = [];
  public ergoList: Ergo[] = []

  constructor(private patientService: PatientService, private ergoService: ErgoService) {
      this.patientService.patients$.subscribe((patientList:Patient[]) => {
        this.patientList = patientList;
      });

    this.ergoService.ergos$.subscribe((ergoList:Ergo[]) => {
      this.ergoList = ergoList;
    });
  }

  ngOnInit(): void {}
}