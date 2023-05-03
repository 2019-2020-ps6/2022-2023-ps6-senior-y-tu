import { Component } from '@angular/core';
import {PatientService} from "../../../services/patient.service";
import {ActivatedRoute} from "@angular/router";
import {StatQuiz} from "../../../models/stat-quiz.model";

@Component({
  selector: 'app-list-stat-quiz',
  templateUrl: './list-stat-quiz.component.html',
  styleUrls: ['./list-stat-quiz.component.scss']
})
export class ListStatQuizComponent {

  public statListe: StatQuiz[] | undefined = [];

  public patientid: string | null;


  constructor(private route: ActivatedRoute, public patientService: PatientService) {
    this.patientid = this.route.snapshot.paramMap.get('id');
    this.statListe = patientService.getStatListe(this.patientid);

  }

}
