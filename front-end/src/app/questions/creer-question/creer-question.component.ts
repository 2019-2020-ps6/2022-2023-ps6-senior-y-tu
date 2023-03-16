import { Component } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-creer-question',
  templateUrl: './creer-question.component.html',
  styleUrls: ['./creer-question.component.scss']
})
export class CreerQuestionComponent {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    retour(): void {
      this.router.navigate(['../../quizzes/creer-quiz']);
    }

}
