import {Component, HostListener, Input} from '@angular/core';
import {Question, Reponse} from "../../../models/question.model";
import {QuestionService} from "../../../services/question.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss']
})


export class ShowQuestionComponent {

  @Input()
  public question: Question[] = [];

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";
    if (handicap == "fort") this.reponseParkinsonFort(e);
    else this.reponseParkinsonLeger(e);
  }

  constructor(public questionService: QuestionService, private router: Router) {
    this.questionService.question$.subscribe((question1: Question[]) => {
      this.question = question1;
    });

  }

  private reponseParkinsonFort(e : KeyboardEvent): void{
    if (e.key == '\''|| e.key== '('|| e.key== '-'|| e.key== 'r'|| e.key== 't') {
      let reponse = this.question[0].responses[0];
      this.reponseNavigation(reponse);
    }
    //zone violette
    if (e.key == 'a'|| e.key== 'z'|| e.key== 'q'|| e.key== 's'|| e.key== 'w'|| e.key== 'x') {
      let reponse = this.question[0].responses[1];
      this.reponseNavigation(reponse);
    }
    //zone jaune
    if(e.key == 'h'|| e.key== 'j'|| e.key== 'b'|| e.key== 'n'|| e.key== ',') {
      let reponse = this.question[0].responses[2];
      this.reponseNavigation(reponse);
    }
    //zone bleu
    if(e.key == 'o'|| e.key== 'p'|| e.key== 'l'|| e.key== 'm'|| e.key== ':'|| e.key== '!') {
      let reponse = this.question[0].responses[3];
      this.reponseNavigation(reponse);
    }
  }

  private reponseParkinsonLeger(e : KeyboardEvent): void{
    if (e.key == "ArrowUp") {
      let reponse = this.question[0].responses[0];
      this.reponseNavigation(reponse);
    }
    //zone violette
    if (e.key == "ArrowLeft") {
      let reponse = this.question[0].responses[1];
      this.reponseNavigation(reponse);
    }
    //zone jaune
    if(e.key == "ArrowDown") {
      let reponse = this.question[0].responses[2];
      this.reponseNavigation(reponse);
    }
    //zone bleu
    if (e.key == "ArrowRight") {
      let reponse = this.question[0].responses[3];
      this.reponseNavigation(reponse);
    }
  }

  private reponseNavigation(reponse: Reponse): void {
    if(reponse.estCorrect) {
      this.router.navigate(['question-explication'])
    }
    else {
      this.router.navigate(['question-explication'])
    }
  }
}
