import {Component, HostListener, Input} from '@angular/core';
import {Theme} from "../../../models/theme.model";
import {Quiz} from "../../../models/quiz.model";
import {Handicap_Fort_Entree, Handicap_Leger_Entree, Retour} from "../../../enums/enumPatient";
import {ThemeService} from "../../../services/theme.service";
import {QuizService} from "../../../services/quiz.service";
import {Router} from "@angular/router";
import {Timer} from "../../timer/Timer";

@Component({
  selector: 'app-quiz-resultat',
  templateUrl: './quiz-resultat.component.html',
  styleUrls: ['./quiz-resultat.component.scss']
})
export class QuizResultatComponent {
  public lienRetour = "/theme-list";
  public lien = '/show-question/1';

  @Input()
  theme: Theme[] = [];
  quiz: Quiz[] = [];

  timer : Timer = new Timer();

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";

    if (e.key == Retour.EGAL || e.key == Retour.DOLLAR || e.key == Retour.BACKSPACE) this.router.navigate(['theme-list']);
    else if (e.key == Handicap_Fort_Entree.ESPACE || (handicap == "leger" && e.key == Handicap_Leger_Entree.ENTREE) )
      this.router.navigate(['show-question',1]);
  }

  constructor(public themeService: ThemeService, public quizService: QuizService, public router: Router) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.theme = themes;
    });
    this.quizService.quizs$.subscribe((quizzes: Quiz[]) => {
      this.quiz = quizzes;
    });

    this.quizService.stopTimer();
    this.timer = this.quizService.timer;
  }

  rejouer() {
    this.quizService.resetTimer();
    this.quizService.startTimer();
    this.router.navigate(['show-question',1]);
  }
}
