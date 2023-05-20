import {Component, HostListener, Input} from '@angular/core';
import {Question, Reponse} from "../../../models/question.model";
import {ActivatedRoute, Router} from "@angular/router";
import {
  Handicap_Fort_Bas, Handicap_Fort_Droite,
  Handicap_Fort_Gauche,
  Handicap_Fort_Haut,
  Handicap_Leger_Bas,
  Handicap_Leger_Droite,
  Handicap_Leger_Gauche,
  Handicapt_Leger_Haut, Retour
} from "../../../enums/enumPatient";
import {QUESTION_LISTE} from "../../../mocks/quiz-list.mock";
import {ClickableDirective} from "../../autre/ClickableDirective";
import {ThemeListComponent} from "../../themes/theme-list/theme-list.component";
import {FonctionCommuneThemeQuiz} from "../../autre/FonctionCommuneThemeQuiz";
import {Tuple} from "../../autre/Tuple";

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss']
})


export class ShowQuestionComponent {
  public tupleRetour: Tuple = new Tuple('/commencer-quiz', undefined);
  private changementDeplacement: number[] = [0, 0, 0, 0, 0]; // deplacementXActuelle, deplacementYactuelle, deplacementXprécédent, deplacementYprecedent

  @Input()
  public questions: Question | undefined;
  public id: string | null;

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";

    if (e.key == Retour.EGAL || e.key == Retour.DOLLAR || e.key == Retour.BACKSPACE) this.router.navigate(['quiz-list']);
    if (handicap == "fort") this.reponseParkinsonFort(e);
    else this.reponseParkinsonLeger(e);
  }

  @HostListener("window:mousemove", ["$event.clientX", "$event.clientY"])
  onMouseMove(e: any, e2: any){
    this.changementDeplacement[0] = e;
    this.changementDeplacement[1] = e2;
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.questions = QUESTION_LISTE.find(quiz => quiz.id === this.id) ;
    let clickable = localStorage.getItem("patient-utilisation_souris");
    if (clickable != null && clickable == "oui")
      ClickableDirective.deplacementPageCursor(this.changementDeplacement);
  }

  private reponseParkinsonFort(e : KeyboardEvent): void{
    let reponse = null;

    if (e.key == Handicap_Fort_Haut.E || e.key == Handicap_Fort_Haut.PARENTHESE_OUVERTE || e.key == Handicap_Fort_Haut.APPOSTROPHE
      || e.key == Handicap_Fort_Haut.MOINS|| e.key== Handicap_Fort_Haut.R|| e.key== Handicap_Fort_Haut.T)
      {
        reponse = this.questions?.reponses[0];
      }

    //zone violette
    else if (e.key == Handicap_Fort_Gauche.A || e.key == Handicap_Fort_Gauche.Z || e.key == Handicap_Fort_Gauche.Q
      || e.key == Handicap_Fort_Gauche.S || e.key == Handicap_Fort_Gauche.W || e.key == Handicap_Fort_Gauche.X)
      {
        reponse = this.questions?.reponses[1];
      }

    //zone jaune
    else if(e.key == Handicap_Fort_Bas.H || e.key == Handicap_Fort_Bas.J || e.key == Handicap_Fort_Bas.B
      || e.key == Handicap_Fort_Bas.N || e.key == Handicap_Fort_Bas.VIRGULE)
      {
        reponse = this.questions?.reponses[2];
      }

    //zone bleu
    else if(e.key == Handicap_Fort_Droite.O || e.key == Handicap_Fort_Droite.P || e.key == Handicap_Fort_Droite.L
      || e.key == Handicap_Fort_Droite.M || e.key== Handicap_Fort_Droite.DOUBLE_POINT || e.key == Handicap_Fort_Droite.POINT_EXCLAMATION)
      {
        reponse = this.questions?.reponses[3];
      }
    else
      FonctionCommuneThemeQuiz.ajouterAutreTouche(e);
    if (reponse != null) this.reponseNavigation(reponse);
  }

  private reponseParkinsonLeger(e : KeyboardEvent): void{
    let reponse = null;
    switch (e.key) {
      case Handicapt_Leger_Haut.FLECHE_HAUT : reponse = this.questions?.reponses[0]; break;
      case Handicap_Leger_Gauche.FLECHE_GAUCHE : reponse = this.questions?.reponses[1]; break;
      case Handicap_Leger_Droite.FLECHE_DROITE : reponse = this.questions?.reponses[2]; break;
      case Handicap_Leger_Bas.FLECHE_BAS : reponse = this.questions?.reponses[3]; break;
      default: FonctionCommuneThemeQuiz.ajouterAutreTouche(e); break;
    }
    if (reponse != null) this.reponseNavigation(reponse);
  }

  private reponseNavigation(reponse: Reponse): void {
    if(reponse.estCorrect) {
      if (this.id == '1'){
        this.router.navigate(['question-explication',1])
      }if (this.id == '2'){
        this.router.navigate(['question-explication',2])
      }
    }
    else {
      if (this.id == '1'){
        this.router.navigate(['question-explication',1])
      }if (this.id == '2'){
        this.router.navigate(['question-explication',2])
      }    }
  }
}
