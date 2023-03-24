import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Question} from "../../../models/question.model";
import {QuestionService} from "../../../services/question.service";

@Component({
  selector: 'app-creer-question',
  templateUrl: './creer-question.component.html',
  styleUrls: ['./creer-question.component.scss']
})
export class CreerQuestionComponent {

    public questionForm : FormGroup;
    constructor(public formBuilder : FormBuilder, public questionService : QuestionService) {
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
      this.questionService.addQuestion(question);
      console.log('Question Ajoutée: ', question);
    }


}
