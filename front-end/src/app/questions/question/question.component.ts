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

  protected listeQuestions: Question[] | undefined;

  protected rangDansQuiz: number | undefined;



  constructor(private QuizService : QuizService) { }

  ngOnInit(): void {
    this.QuizService.getQuestionsByQuizId(this.quiz?.id as string)?.subscribe((questions) => {
      this.listeQuestions = questions;
      this.rangDansQuiz = this.listeQuestions?.findIndex(question => question.id === this.question?.id) as number + 1;
    });


  }

}
