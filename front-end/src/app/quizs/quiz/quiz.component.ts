import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  @Input()
  options : any;

  @Input()
  quiz: Quiz | undefined;

  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() { }

  ngOnInit(): void {

  }

  deletedQuiz(){
    this.quizDeleted.emit(this.quiz);
  }

}
