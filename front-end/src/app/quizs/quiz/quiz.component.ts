
import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

  public taille: number | string;

  @Input()
  options : any;

  @Input()
  quiz: Quiz | undefined;

  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {
    let tailleTemp = localStorage.getItem("patient-taille");
    this.taille = (tailleTemp == null)? 24: tailleTemp;
  }

  ngOnInit(): void {

  }

  deletedQuiz(){
    this.quizDeleted.emit(this.quiz);
  }

  //selectQuiz(): void {
  //  this.quizSelected.emit(true);
  //}

}
