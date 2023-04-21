import {Component, Input} from '@angular/core';
import {Question} from "../../../models/question.model";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
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

  @Input()
  quiz: Quiz | undefined;

  public questionForm: FormGroup;



    constructor(private route : ActivatedRoute,public formBuilder : FormBuilder, public quizService : QuizService) {
      this.questionForm = this.formBuilder.group({
        id: [''],
        intitule: [''],
        reponses: this.formBuilder.array([]),
        img: [''],
        explication: ['']
      });

    }

    ngOnInit() {
      this.loadQuestion();
      this.quiz = this.quizService.getQuizById(this.route.snapshot.paramMap.get('id'));

    }

  get reponses(): FormArray {
      return this.questionForm.get('reponses') as FormArray;
  }



  loadQuestion() {

      const id = this.route.snapshot.paramMap.get('id');
      const questionId = this.route.snapshot.paramMap.get('questionId');
      const question = this.quizService.getQuestionById(id, questionId);
      if(!question) return;
      this.questionToUpdate = question;
      this.questionForm.patchValue({
        id: question.id,
        intitule: question.intitule,
        img: '',
        explication: question.explication,
      });
      const reponsesFormArray = this.questionForm.get('reponses') as FormArray;
      while (reponsesFormArray.length) {
        reponsesFormArray.removeAt(0);
      }
      question.reponses.forEach(reponse => {
        reponsesFormArray.push(this.formBuilder.group({
          id: reponse.id,
          valeur: reponse.valeur,
          estCorrect: reponse.estCorrect,
        }));
      });



  }

  modifierQuestion() {
      if(!this.quiz) return;
      const question: Question = this.questionForm.getRawValue() as Question;
      if(question.img === '') {
        question.img = this.questionToUpdate?.img || '';
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
