import {Component, HostListener, Input} from '@angular/core';
import {Question, Reponse} from "../../../models/question.model";
import {QuestionService} from "../../../services/question.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-question-explication',
  templateUrl: './question-explication.component.html',
  styleUrls: ['./question-explication.component.scss']
})
export class QuestionExplicationComponent {
  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";
    if(e.key == ' ') {
      this.router.navigate(['quiz-list']);
    }
    else if(handicap == "leger" && e.key == "Enter") {
      this.router.navigate(['quiz-list']);
    }
  }

  @Input()
  public question: Question[] = [];
  public reponseCorrecte: number;

  constructor(public questionService: QuestionService, private router: Router) {
    this.questionService.question$.subscribe((question1: Question[]) => {
      this.question = question1;
    });
    this.reponseCorrecte = this.question[0].responses.findIndex((reponse: Reponse) => reponse.estCorrect);
  }
}
