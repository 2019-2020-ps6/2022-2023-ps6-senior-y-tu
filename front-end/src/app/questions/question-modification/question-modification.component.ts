import {Component, Input} from '@angular/core';
import {Question, Reponse} from "../../../models/question.model";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";


@Component({
  selector: 'app-question-modification',
  templateUrl: './question-modification.component.html',
  styleUrls: ['./question-modification.component.scss']
})
export class QuestionModificationComponent {

  @Input()
  questionToUpdate: Question | undefined;
  reponseListe: Reponse[] = [];

  @Input()
  quiz: Quiz | undefined;

  public questionForm: FormGroup;



    constructor(private route : ActivatedRoute,public formBuilder : FormBuilder, public quizService : QuizService) {
      this.questionForm = this.formBuilder.group({
        id: [''],
        intitule: [''],
        reponses: this.formBuilder.array([]),
        image: [''],
        explication: ['']
      });

    }

    ngOnInit() {
      this.loadQuestion();
    }

  get reponses(): FormArray {
      return this.questionForm.get('reponses') as FormArray;
  }

  initReponsesFormArray() {
    const reponsesFormArray = this.questionForm.get('reponses') as FormArray;
    this.reponseListe.forEach(reponse => {
      reponsesFormArray.push(
        this.formBuilder.group({
          valeur: new FormControl(reponse.valeur),
          estCorrect: new FormControl(reponse.estCorrect)
        })
      );
    });
  }



  loadQuestion() {

      const questionId = this.route.snapshot.paramMap.get('questionId');
      //front
    /*
      const question = this.quizService.getQuestionById(id, questionId);
      if(!question) return;
      this.questionToUpdate = question;
      this.questionForm.patchValue({
        id: question.id,
        intitule: question.intitule,
        img: '',
        explication: question.explication,
      });

     */


    const quizId = this.route.snapshot.paramMap.get('id');
    if(!quizId || !questionId) return;
    if (quizId) {
      this.quizService.getQuizById(quizId).subscribe((quiz) => {
        this.quiz = quiz;
        this.quizService.getReponseListe(quizId, questionId).subscribe((reponseListe) => {
          this.reponseListe = reponseListe;
          this.initReponsesFormArray();
        });
      });
    }


    this.quizService.getQuestionById(quizId, questionId)?.subscribe((question) => {
      this.questionToUpdate = question;
      console.log("explication : " + this.questionToUpdate?.explication)
      console.log(this.questionToUpdate)
      if(!this.questionToUpdate) return;
      this.questionForm.patchValue({
        id: this.questionToUpdate.id,
        intitule: this.questionToUpdate.intitule,
        reponses: [],
        image: '',
        explication: this.questionToUpdate.explication,
      });

      const reponsesFormArray = this.questionForm.get('reponses') as FormArray;
      while (reponsesFormArray.length) {
        reponsesFormArray.removeAt(0);
      }

      this.reponseListe.forEach(reponse => {
        reponsesFormArray.push(this.formBuilder.group({
          //id: reponse.id,
          valeur: reponse.valeur,
          estCorrect: reponse.estCorrect,
        }));
      });

    });

  }

  modifierQuestion() {
      if(!this.quiz) return;
      const question: Question = this.questionForm.getRawValue() as Question;
      if(question.image === '') {
        question.image = this.questionToUpdate?.image || '';
      }
      this.quizService.updateQuestion(question, this.quiz.id);

      //console.log('Question modifiée: ', question);
  }

  onRadioChange(index: number) {
    const reponsesFormArray = this.questionForm.get('reponses') as FormArray;
    reponsesFormArray.controls.forEach((control, i) => {
      if (i === index) {
        control.get('estCorrect')?.setValue(true);
      } else {
        control.get('estCorrect')?.setValue(false);
      }
    });
  }


  deleteQuestion() {
      this.quizService.deleteQuestion(this.questionToUpdate, this.quiz);
  }




}
