import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public taille: number | string;
  public quizList: Quiz[] = [];

  constructor( public quizService: QuizService) {
    this.quizService.quizs$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    })
    let tailleTemp = localStorage.getItem("patient-taille");
    this.taille = (tailleTemp == null)? 24: tailleTemp;
  }


  selectTheme(): string | any {
    if (this.quizList.length!=0)
      return this.quizList[0].theme;
  }

  ngOnInit(): void {
  }

  quizSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }
}
