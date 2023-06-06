import {Component, HostListener, Input} from '@angular/core';
import {Theme} from "../../../models/theme.model";
import {Quiz} from "../../../models/quiz.model";
import {ThemeService} from "../../../services/theme.service";
import {QuizService} from "../../../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Handicap_Fort_Entree, Handicap_Leger_Entree, Retour} from "../../../enums/enumPatient";
import {ClickableDirective} from "../../autre/ClickableDirective";
import {Tuple} from "../../autre/Tuple";

import {httpOptionsBase, serverUrl} from "../../../configs/server.config";

@Component({
  selector: 'app-commencer-quiz',
  templateUrl: './commencer-quiz.component.html',
  styleUrls: ['./commencer-quiz.component.scss']
})
export class CommencerQuizComponent {
  public tupleRetour: Tuple = new Tuple('/theme-list', undefined);
  public tupleEntrer: Tuple = new Tuple('/show-question', '1');
  private changementDeplacement: number[] = [0, 0, 0, 0, 0]; // deplacementXActuelle, deplacementYactuelle, deplacementXprécédent, deplacementYprecedent

  protected nbQuestion: number = 0;

  @Input()
  theme: Theme[] = [];
  quiz: Quiz[] = [];

  @HostListener("window:mousemove", ["$event.clientX", "$event.clientY"])
  onMouseMove(e: any, e2: any){
    this.changementDeplacement[0] = e;
    this.changementDeplacement[1] = e2;
  }
  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";

    if (e.key == Retour.EGAL || e.key == Retour.DOLLAR || e.key == Retour.BACKSPACE) this.router.navigate(['quiz-list']);
    else if (e.key == Handicap_Fort_Entree.ESPACE || (handicap == "leger" && e.key == Handicap_Leger_Entree.ENTREE) )
      this.router.navigate(['show-question/1']);
  }



  constructor(public themeService: ThemeService, public quizService: QuizService, public router: Router, private route: ActivatedRoute) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.theme = themes;
    });
    this.quizService.quizs$.subscribe((quizzes: Quiz[]) => {
      this.quiz = quizzes;
    });
    let clickable = localStorage.getItem("patient-utilisation_souris");
    if (clickable != null && clickable == "oui")
      ClickableDirective.deplacementPageCursor(this.changementDeplacement);

    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.getNbQuestionsByQuizId(id)?.subscribe((nb) => {
      this.nbQuestion = nb;
    });
  }

  ngOnInit(): void {

  }

  jouer() {
    this.quizService.startTimer();
  }

}
