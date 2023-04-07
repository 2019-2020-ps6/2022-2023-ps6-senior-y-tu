import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Question} from "../../../models/question.model";
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-creer-question',
  templateUrl: './creer-question.component.html',
  styleUrls: ['./creer-question.component.scss']
})
export class CreerQuestionComponent {

    public questionForm : FormGroup;
    @Input()
    quiz: Quiz | undefined;
    constructor(public formBuilder : FormBuilder, public quizService : QuizService) {
      this.questionForm = this.formBuilder.group({
            intitule: [''],
            reponse: this.formBuilder.array([]),
            image: [''],
            description: [''],
        });
    }

    ngOnInit(): void {
    }

    onCreer() {
      const question: Question = this.questionForm.getRawValue() as Question;
      //this.quizService.addQuestion(question, this.quiz);
      console.log('Question Ajoutée: ', question);
    }


}
