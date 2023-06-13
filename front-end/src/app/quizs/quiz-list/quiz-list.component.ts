import {Component, HostListener, OnInit} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {QuizService} from "../../../services/quiz.service";
import { Retour } from "../../../enums/enumPatient";
import {ActivatedRoute, Router} from "@angular/router";
import {ClickableDirective} from "../../autre/ClickableDirective";
import {ThemeService} from "../../../services/theme.service";
import {Theme} from "../../../models/theme.model";
import {FonctionCommuneThemeQuiz} from "../../autre/FonctionCommuneThemeQuiz";
import {Tuple} from "../../autre/Tuple";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit{
  protected tupleRetour: Tuple = new Tuple('/theme-list', undefined);
  private nombreCaseLargeur = 1;
  public quizList: Quiz[] = [];
  private buttonSelected: number = 1;
  private changementDeplacement: number[] = [0, 0, 0, 0, 0]; // deplacementXActuelle, deplacementYactuelle, deplacementXprécédent, deplacementYprecedent
  protected themeParent: Theme | undefined;

  @HostListener("window:mousemove", ["$event.clientX", "$event.clientY"])
  onMouseMove(e: any, e2: any){
    this.changementDeplacement[0] = e;
    this.changementDeplacement[1] = e2;
  }
  @HostListener("window:resize") onWindowResize(): void {
    this.nombreCaseLargeur = FonctionCommuneThemeQuiz.changeDeplacementBouton(window.innerWidth);
  }

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";
    if (e.key == Retour.EGAL || e.key == Retour.BACKSPACE|| e.key == Retour.DOLLAR) this.root.navigate(['theme-list']);
    if(handicap == "fort")
      this.buttonSelected = FonctionCommuneThemeQuiz.patientFort(e, this.nombreCaseLargeur, this.buttonSelected, this.root,
        "/commencer-quiz", "")
    else
      this.buttonSelected = FonctionCommuneThemeQuiz.patientLeger(e, this.nombreCaseLargeur, this.buttonSelected, this.root,
        "/commencer-quiz", "");
  }

  constructor( public quizService: QuizService, private root : Router, private themeService : ThemeService, private rootT : ActivatedRoute) {
    let clickable = localStorage.getItem("patient-utilisation_souris");
    if (clickable != null && clickable == "oui")
      ClickableDirective.deplacementPageCursor(this.changementDeplacement);
    FonctionCommuneThemeQuiz.changeDeplacementBouton(window.innerWidth);
  }

  ngOnInit() {
    let idTheme = this.rootT.snapshot.paramMap.get('id');
    if (idTheme != null) {
      this.quizService.recupererQuizs()
      this.quizService.quizs$.subscribe((quizzes: Quiz[]) => {
        this.quizList = quizzes.filter((quiz) => quiz.themeId == idTheme);
      });
    }
  }
}
