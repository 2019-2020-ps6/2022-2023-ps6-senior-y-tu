import {Component, Input} from '@angular/core';
import {Question, Reponse} from "../../../models/question.model";
import {QuestionService} from "../../../services/question.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-question-explication',
  templateUrl: './question-explication.component.html',
  styleUrls: ['./question-explication.component.scss']
})
export class QuestionExplicationComponent {


  @Input()
  public question: Question[] = [];
  public reponseCorrecte: number;

  constructor(public questionService: QuestionService, private router: Router) {
    this.questionService.question$.subscribe((question1: Question[]) => {
      this.question = question1;
    });
    this.reponseCorrecte = this.question[0].responses.findIndex((reponse: Reponse) => reponse.estCorrect);
  }

  ngOnInit(): void{}

  suivant() :void{
    window.addEventListener('keypress', (e) => {
      if (e.key == ' ') {
        this.router.navigate(['quiz-list']);
      }
    });
  }
}
