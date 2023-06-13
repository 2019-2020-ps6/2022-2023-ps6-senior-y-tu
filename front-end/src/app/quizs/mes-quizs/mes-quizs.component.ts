import { Component } from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-mes-quizs',
  templateUrl: './mes-quizs.component.html',
  styleUrls: ['./mes-quizs.component.scss']
})
export class MesQuizsComponent {
  public quizListe: Quiz[] = [];
  public searchTerm: string = '';


  constructor(public quizService: QuizService) {
    this.quizService.quizs$.subscribe((quizListe) => {
      this.quizListe = quizListe;
    });
  }

  ngOnInit(): void {

  }

  quizDeleted($event: Quiz) {
    console.log('event received from child:', $event);
    this.quizService.deleteQuiz($event);
  }

  public filterQuizs(searchTerm: string): any[] {
    if (!searchTerm) {
      return this.quizListe;
    }
    return this.quizListe.filter((quiz: any) => {
      return quiz.nom.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }


}
