import {Component, Input} from '@angular/core';
import {Question} from "../../../models/question.model";
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  @Input()
  question: Question | undefined;
  @Input()
  quiz : Quiz | undefined;

  @Input()
  index : number = 0;

  protected listeQuestions: Question[] | undefined;

  protected rangDansQuiz: number | undefined;



  constructor() { }

  ngOnInit(): void {

  }

}
