import {Component, Input} from '@angular/core';
import {Question, Reponse} from "../../../models/question.model";
import {Patient} from "../../../models/patient.model";
import {PatientService} from "../../../services/patient.service";
import {QuestionService} from "../../../services/question.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss']
})
export class ShowQuestionComponent {

  @Input()
  public question: Question[] =[];


  constructor(public questionService: QuestionService, private router: Router) {
    this.questionService.question$.subscribe((question1: Question[]) => {
      this.question = question1;
    });

  }

  ngOnInit(): void{
  }

  repondre() :void{
    window.addEventListener('keydown', (e) => {
      if(e.key == 'q'|| e.key== 'w'){
        //this.router.navigate(['theme-list']);

      }
      if(e.key == 'o'|| e.key== 'p'){
        this.router.navigate(['quiz-list']);
      }
    });
  }


}
