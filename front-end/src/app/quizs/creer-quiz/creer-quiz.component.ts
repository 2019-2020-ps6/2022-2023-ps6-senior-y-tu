import { Component } from '@angular/core';
import { Quiz} from "../../../models/quiz.model";
import { QuizService } from "../../../services/quiz.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-creer-quiz',
  templateUrl: './creer-quiz.component.html',
  styleUrls: ['./creer-quiz.component.scss']
})
export class CreerQuizComponent {
  public quizForm : FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      nom: '',
      theme: '',
      image: ''
    })
  }

  onValider() {
    const quiz: Quiz = this.quizForm.getRawValue() as Quiz;
    this.quizService.addQuiz(quiz);

  }
}
