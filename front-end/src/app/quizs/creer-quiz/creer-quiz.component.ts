import {Component, OnInit} from '@angular/core';
import { Quiz} from "../../../models/quiz.model";
import { QuizService } from "../../../services/quiz.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-creer-quiz',
  templateUrl: './creer-quiz.component.html',
  styleUrls: ['./creer-quiz.component.scss']
})
export class CreerQuizComponent implements  OnInit{
  public quizForm : FormGroup;
  public newId: string;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      id: [''],
      nom: [''],
      theme: [''],
      image: [''],
      questions: this.formBuilder.array([]),
    });

    const listeQuiz = this.quizService.getQuizs();
    this.newId = (listeQuiz.length + 1).toString();
  }
  ngOnInit(): void {  }


  onCreer() {
    const quiz: Quiz = this.quizForm.getRawValue() as Quiz;
    this.quizService.addQuiz(quiz);
    console.log('Quiz Ajouté: ', quiz);
  }
}
