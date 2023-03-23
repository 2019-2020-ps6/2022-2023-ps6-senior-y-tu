import {Component, Input} from '@angular/core';
import {Question} from "../../../models/question.model";
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QUIZ_LISTE} from "../../../mocks/quiz-list.mock";

@Component({
  selector: 'app-question-liste',
  templateUrl: './question-liste.component.html',
  styleUrls: ['./question-liste.component.scss']
})
export class QuestionListeComponent {

  @Input()
  public quiz :  Quiz | undefined;

  public questionListe: Question[] | undefined = [];


  constructor(private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LISTE.find(quiz => quiz.id === id);
    this.questionListe = this.quiz?.questions;
  }


}
