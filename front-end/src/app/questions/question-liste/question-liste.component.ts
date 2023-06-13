import {Component, Input} from '@angular/core';
import {Question} from "../../../models/question.model";
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";


@Component({
  selector: 'app-question-liste',
  templateUrl: './question-liste.component.html',
  styleUrls: ['./question-liste.component.scss']
})
export class QuestionListeComponent {
  lien = '/mes-quizs';

  @Input()
  public quiz :  Quiz | undefined;

  public questionListe: Question[] | undefined = [];


  constructor(private route: ActivatedRoute, private quizService: QuizService) {


  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.getQuizById(id)?.subscribe((quiz) => {
      this.quiz = quiz;
    });
    //this.quiz = QUIZ_LISTE.find(quiz => quiz.id === id);
    this.quizService.getQuestionsByQuizId(id)?.subscribe((questions) => {
      this.questionListe = questions;
    });
    //this.questionListe = this.quiz?.questions;
  }


}
