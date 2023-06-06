import {Component, Input} from '@angular/core';
import {Question} from "../../../models/question.model";
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QUIZ_LISTE} from "../../../mocks/quiz-list.mock";
import {QuizService} from "../../../services/quiz.service";

import {httpOptionsBase, serverUrl} from "../../../configs/server.config";

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
      console.log(quiz)
      this.quiz = quiz;
    });
    //this.quiz = QUIZ_LISTE.find(quiz => quiz.id === id);
    this.quizService.getQuestionsByQuizId(id)?.subscribe((questions) => {
      console.log(questions)
      this.questionListe = questions;
    });
    //this.questionListe = this.quiz?.questions;
  }


}
