import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-creer-question',
  templateUrl: './creer-question.component.html',
  styleUrls: ['./creer-question.component.scss']
})
export class CreerQuestionComponent implements  OnInit{

  @Input() quiz: Quiz | undefined;

  public questionForm: FormGroup;
  constructor( public formBuilder: FormBuilder, public quizService: QuizService, private route: ActivatedRoute) {

    this.questionForm = this.formBuilder.group({
      id: [''],
      intitule: [''],
      reponses: this.formBuilder.array([]),
      img: [''],
      explication: ['']
    });
    for (let i= 0; i < 4; i++) {
      this.addReponse();
    }
  }

  ngOnInit(): void {
    this.quiz = this.quizService.getQuizById(this.route.snapshot.paramMap.get('id'));
  }


  get reponses(): FormArray {
    return this.questionForm.get('reponses') as FormArray;
  }

  onCreer() {
    const question: Question = this.questionForm.getRawValue() as Question;
    this.quizService.addQuestion(question, this.quiz);
    //console.log('Question Ajoutée: ', question);
  }

  addReponse(): void {
    this.reponses.push(this.createReponse());
  }

  private createReponse() {
    return this.formBuilder.group({
      id: [''],
      valeur: [''],
      estCorrect: [false]
    });
  }
}
