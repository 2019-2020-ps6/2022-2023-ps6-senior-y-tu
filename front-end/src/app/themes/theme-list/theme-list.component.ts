import {Component, HostListener} from '@angular/core';
import { ThemeService} from "../../../services/theme.service";
import { Theme} from "../../../models/theme.model";
import { Router } from '@angular/router';
import {Retour} from "../../../enums/enumPatient";
import {ClickableDirective} from "../../autre/ClickableDirective";
import {FonctionCommuneThemeQuiz} from "../../autre/FonctionCommuneThemeQuiz";
import {Tuple} from "../../autre/Tuple";

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent {
  private nombreCaseLargeur = 1;
  protected lienRetour: Tuple = new Tuple("/accueil", undefined);
  public themeList: Theme[] = [];
  private buttonSelected: number = 1;
  private changementDeplacement: number[] = [0, 0, 0, 0, 0]; // deplacementXActuelle, deplacementYactuelle, deplacementXprécédent, deplacementYprecedent

  @HostListener("window:mousemove", ["$event.clientX", "$event.clientY"])
  onMouseMove(e: any, e2: any){
    this.changementDeplacement[0] = e;
    this.changementDeplacement[1] = e2;
  }

  @HostListener("window:resize") onWindowResize() {
    this.nombreCaseLargeur = FonctionCommuneThemeQuiz.changeDeplacementBouton(window.innerWidth);
  }


  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";
    if(handicap == "fort")
      this.buttonSelected = FonctionCommuneThemeQuiz.patientFort(e, this.nombreCaseLargeur, this.buttonSelected, this.root,
        '/quiz-list', this.themeList[this.buttonSelected - 1].id);
    else
      this.buttonSelected = FonctionCommuneThemeQuiz.patientLeger(e, this.nombreCaseLargeur, this.buttonSelected, this.root,
        '/quiz-list', this.themeList[this.buttonSelected - 1].id);
  }

  constructor(public themeService: ThemeService, private root : Router) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
    let clickable = localStorage.getItem("patient-utilisation_souris");
    if (clickable != null && clickable == "oui")
      ClickableDirective.deplacementPageCursor(this.changementDeplacement);
    this.changeDeplacementBouton(window.innerWidth);
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

}
