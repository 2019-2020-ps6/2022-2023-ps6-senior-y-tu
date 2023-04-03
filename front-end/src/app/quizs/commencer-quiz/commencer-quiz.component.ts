import {Component, HostListener, Input} from '@angular/core';
import {Theme} from "../../../models/theme.model";
import {Quiz} from "../../../models/quiz.model";
import {ThemeService} from "../../../services/theme.service";
import {QuizListComponent} from "../quiz-list/quiz-list.component";
import {QuizService} from "../../../services/quiz.service";
import {Reponse} from "../../../models/question.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-commencer-quiz',
  templateUrl: './commencer-quiz.component.html',
  styleUrls: ['./commencer-quiz.component.scss']
})
export class CommencerQuizComponent {

  public taille: number | string;

  @Input()
  theme: Theme[] = [];
  quiz: Quiz[] = [];

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";
    if(e.key == ' ') {
      this.router.navigate(['show-question']);
    }
    else if(handicap == "leger" && (e.key == "Enter" || e.key == ' ')) {
      this.router.navigate(['show-question']);
    }
  }

  constructor(public themeService: ThemeService, public quizService: QuizService, public router: Router) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.theme = themes;
    });
    this.quizService.quizs$.subscribe((quizzes: Quiz[]) => {
      this.quiz = quizzes;
    });
    let tailleTemp = localStorage.getItem("patient-taille");
    this.taille = (tailleTemp == null)? 24: tailleTemp;

  }
}
