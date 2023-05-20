import {Component, HostListener, Input} from '@angular/core';
import {Theme} from "../../../models/theme.model";
import {Quiz} from "../../../models/quiz.model";
import {Handicap_Fort_Entree, Handicap_Leger_Entree, Retour} from "../../../enums/enumPatient";
import {ThemeService} from "../../../services/theme.service";
import {QuizService} from "../../../services/quiz.service";
import {Router} from "@angular/router";
import {Timer} from "../../timer/Timer";
import {Tuple} from "../../autre/Tuple";

@Component({
  selector: 'app-quiz-resultat',
  templateUrl: './quiz-resultat.component.html',
  styleUrls: ['./quiz-resultat.component.scss']
})
export class QuizResultatComponent {
  public tupleRetour: Tuple = new Tuple("/theme-list", undefined);
  public tuple: Tuple = new Tuple('/show-question', '1');
  protected nombreClick: number = 0;
  protected autresLettreTaper : Array<{lettre: string, occurence: number}> = [];

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
    let clickable = localStorage.getItem("nombreDeplacement");
    if (clickable != null) {
      this.nombreClick = parseInt(clickable);
      localStorage.setItem("nombreDeplacement", "0");
    }

    let autreTouche = localStorage.getItem("autresTouchesAppuyer");
    if (autreTouche != null)
        this.compterLettre(autreTouche);

    this.quizService.stopTimer();
    this.timer = this.quizService.timer;
  }

  private compterLettre(autreTouche: string) {
    let n: number = autreTouche.length;
    let lettreCourante: string = autreTouche.charAt(0);
    let occurence: number = 1;
    for (let i: number = 1; i < n; i++) {
      if (lettreCourante != autreTouche.charAt(i)) {
        this.autresLettreTaper.push({lettre: lettreCourante, occurence: occurence});
        lettreCourante = autreTouche.charAt(i);
        occurence = 1;
      }
      else
        occurence++;
    }
    this.autresLettreTaper.push({lettre: lettreCourante, occurence: occurence});
    localStorage.setItem("autresTouchesAppuyer", "");
  }

  rejouer() {
    this.quizService.resetTimer();
    this.quizService.startTimer();
    this.router.navigate(['show-question',1]);
  }
}
