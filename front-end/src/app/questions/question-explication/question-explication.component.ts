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

  public taille: number | string;
  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";
    if(e.key == ' ') {
      this.router.navigate(['quiz-list']);
    }
    else if(handicap == "leger" && (e.key == "Enter" || e.key == ' ')) {
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
    this.reponseCorrecte = this.question[0].reponses.findIndex((reponse: Reponse) => reponse.estCorrect);
    let tailleTemp = localStorage.getItem("patient-taille");
    this.taille = (tailleTemp == null)? 24: tailleTemp;
  }
}
