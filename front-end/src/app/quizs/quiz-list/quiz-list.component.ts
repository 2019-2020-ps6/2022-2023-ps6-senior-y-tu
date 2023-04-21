import {AfterViewInit, Component, HostListener} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {QuizService} from "../../../services/quiz.service";
import {Handicap_Fort_Bas, Handicap_Fort_Entree, Handicap_Leger_Entree, Handicap_Fort_Droite, Handicap_Fort_Gauche,
Handicap_Fort_Haut, Handicap_Leger_Bas,  Handicap_Leger_Droite, Handicap_Leger_Gauche, Handicapt_Leger_Haut,
Retour} from "../../../enums/enumPatient";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements AfterViewInit {
  protected lienRetour = '/theme-list';
  private nombreCaseLargeur = 1;
  public quizList: Quiz[] = [];
  private buttonSelected: number = 1;

  @HostListener("window:resize") onWindowResize(): void {
    this.changeDeplacementBouton(window.innerWidth);
  }

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";
    if (e.key == Retour.EGAL || e.key == Retour.BACKSPACE|| e.key == Retour.DOLLAR) this.root.navigate(['theme-list']);
    if(handicap == "fort") this.patientFort(e);
    else this.patientLeger(e);
  }

  constructor( public quizService: QuizService, private root : Router) {
    this.quizService.quizs$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    })}


  selectTheme(): string | any {
    if (this.quizList.length!=0)
      return this.quizList[0].theme;
  }


  ngAfterViewInit() {
    this.buttonSelected = 1;
    let temp = document.getElementsByClassName("button-card") as HTMLCollectionOf<HTMLButtonElement>;
    temp[this.buttonSelected].style.backgroundColor = "#b4a7d6";
    this.changeDeplacementBouton(window.innerWidth);
  }

  private patientLeger(e: KeyboardEvent) : void {
    if(e.key == Handicap_Leger_Entree.ENTREE || e.key == Handicap_Leger_Entree.ESPACE) this.goToEnter();
    else if(e.key == Handicapt_Leger_Haut.FLECHE_HAUT) this.switchButton(-1 * this.nombreCaseLargeur);
    else if (e.key == Handicap_Leger_Droite.FLECHE_DROITE) this.switchButton(1);
    else if (e.key == Handicap_Leger_Gauche.FLECHE_GAUCHE) this.switchButton(-1);
    else if(e.key == Handicap_Leger_Bas.FLECHE_BAS) this.switchButton(this.nombreCaseLargeur);
  }

  private patientFort(e: KeyboardEvent) : void {
    if (e.key == Handicap_Fort_Entree.ESPACE) this.goToEnter();
    if (e.key == Handicap_Fort_Haut.T || e.key == Handicap_Fort_Haut.E || e.key == Handicap_Fort_Haut.APPOSTROPHE
      || e.key == Handicap_Fort_Haut.MOINS || e.key == Handicap_Fort_Haut.PARENTHESE_OUVERTE || e.key == Handicap_Fort_Haut.R) this.switchButton(-1 * this.nombreCaseLargeur);
    else if (e.key == Handicap_Fort_Gauche.A || e.key == Handicap_Fort_Gauche.Z || e.key == Handicap_Fort_Gauche.Q
      || e.key == Handicap_Fort_Gauche.S || e.key == Handicap_Fort_Gauche.W || e.key == Handicap_Fort_Gauche.X) this.switchButton(-1);
    else if (e.key == Handicap_Fort_Bas.H || e.key == Handicap_Fort_Bas.J || e.key == Handicap_Fort_Bas.B
      || e.key == Handicap_Fort_Bas.N || e.key == Handicap_Fort_Bas.VIRGULE) this.switchButton(2 * this.nombreCaseLargeur);
    else if (e.key == Handicap_Fort_Droite.O || e.key == Handicap_Fort_Droite.P || e.key == Handicap_Fort_Droite.L
      || e.key == Handicap_Fort_Droite.M || e.key == Handicap_Fort_Droite.POINT_EXCLAMATION || e.key == Handicap_Fort_Droite.DOUBLE_POINT) this.switchButton(1);
  }

  private switchButton(deplacementPage : number) : void {
    let buttons = document.getElementsByClassName("button-card");
    let ancienBoutonSelection = buttons[this.buttonSelected] as HTMLButtonElement;
    let newBoutonSelection = null;

    if (deplacementPage < 0 && this.buttonSelected + deplacementPage >= 1 ||
      deplacementPage > 0 && this.buttonSelected + deplacementPage < buttons.length)
      newBoutonSelection = buttons[this.buttonSelected + deplacementPage] as HTMLButtonElement;

    if (newBoutonSelection != null) {
      this.buttonSelected += deplacementPage;
      let colorAncienBoutonSelection = ancienBoutonSelection.style.backgroundColor;
      ancienBoutonSelection.style.backgroundColor = newBoutonSelection.style.backgroundColor;
      newBoutonSelection.style.backgroundColor = colorAncienBoutonSelection;
    }
  }

  private changeDeplacementBouton(width: number): void {
    this.nombreCaseLargeur = (width - 603) / 602 + 1;

    if (this.nombreCaseLargeur >= 3)
      this.nombreCaseLargeur = 3;
    else if (this.nombreCaseLargeur >= 2)
      this.nombreCaseLargeur = 2;
    else
      this.nombreCaseLargeur = 1;
  }
  private goToEnter() : void {
    this.root.navigate(["/commencer-quiz"]);
  }
}
