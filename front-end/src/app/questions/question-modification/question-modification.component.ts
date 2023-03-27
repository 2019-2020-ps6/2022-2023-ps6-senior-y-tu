import {Component, Input} from '@angular/core';
import {Question, Reponse} from "../../../models/question.model";
import {ActivatedRoute} from "@angular/router";
import {QUESTION_LISTE} from "../../../mocks/quiz-list.mock";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Quiz} from "../../../models/quiz.model";


@Component({
  selector: 'app-question-modification',
  templateUrl: './question-modification.component.html',
  styleUrls: ['./question-modification.component.scss']
})
export class QuestionModificationComponent {

  @Input()
  question: Question | undefined;

  @Input()
  quiz: Quiz | undefined;

  intitule : string ;
  reponses : Reponse[];
  image : string ;


  public questionForm : FormGroup;


    constructor(private route : ActivatedRoute,public formBuilder : FormBuilder) {
      this.intitule =this.question?.intitule as string;
      this.reponses =this.question?.reponses as Reponse[];
      this.image =this.question?.img as string;
      this.questionForm = this.formBuilder.group({
        intitule: this.question?.intitule,
        reponses: this.question?.reponses,
        image: this.question?.img
      });



    }

    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      this.question = QUESTION_LISTE.find(question => question.id === id);
      this.reponses = this.question?.reponses as Reponse[];
    }
}
