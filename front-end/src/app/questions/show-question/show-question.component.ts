import {Component, Input} from '@angular/core';
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

  constructor(public questionService: QuestionService, private router: Router) {
    this.questionService.question$.subscribe((question1: Question[]) => {
      this.question = question1;
    });

  }

  ngOnInit(): void{}

  repondre(lettre: string, reponse:Reponse) :void{
      window.addEventListener('keypress', (e) => {
        //zone verte
        if((e.key == '\''|| e.key== '('|| e.key== '-'|| e.key== 'r'|| e.key== 't') && reponse == this.question[0].responses[0]) {
          if (reponse.estCorrect) {
            console.log(reponse.valeur);
            this.router.navigate(['question-explication']);
          } else {
            console.log(reponse.valeur)
            this.router.navigate(['question-explication']);
          }
        }
        //zone violette
        if((e.key == 'a'|| e.key== 'z'|| e.key== 'q'|| e.key== 's'|| e.key== 'w'|| e.key== 'x') && reponse == this.question[0].responses[1]) {
          if (reponse.estCorrect) {
            console.log(reponse.valeur);
            this.router.navigate(['question-explication']);
          } else {
            console.log(reponse.valeur)
            this.router.navigate(['question-explication']);
          }
        }
        //zone jaune
        if((e.key == 'h'|| e.key== 'j'|| e.key== 'b'|| e.key== 'n'|| e.key== ',') && reponse == this.question[0].responses[2]) {
          if (reponse.estCorrect) {
            console.log(reponse.valeur);
            this.router.navigate(['question-explication']);
          } else {
            console.log(reponse.valeur)
            this.router.navigate(['question-explication']);
          }
        }
        //zone bleu
        if((e.key == 'o'|| e.key== 'p'|| e.key== 'l'|| e.key== 'm'|| e.key== ':'|| e.key== '!') && reponse == this.question[0].responses[3]) {
          if (reponse.estCorrect) {
            console.log(reponse.valeur);
            this.router.navigate(['question-explication']);
          } else {
            console.log(reponse.valeur)
            this.router.navigate(['question-explication']);
          }
        }
      });
    }
}
