import {Component, HostListener, Input} from '@angular/core';
import {Question, Reponse} from "../../../models/question.model";
import {QuestionService} from "../../../services/question.service";
import {Router} from "@angular/router";
import {
  Handicap_Fort_Bas, Handicap_Fort_Droite,
  Handicap_Fort_Gauche,
  Handicap_Fort_Haut,
  Handicap_Leger_Bas,
  Handicap_Leger_Droite,
  Handicap_Leger_Gauche,
  Handicapt_Leger_Haut, Retour
} from "../../../enums/enumPatient";

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss']
})


export class ShowQuestionComponent {

  @Input()
  public question: Question[] = [];

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";

    if (e.key == Retour.EGAL || e.key == Retour.DOLLAR || e.key == Retour.BACKSPACE) this.router.navigate(['/accueil']);
    if (handicap == "fort") this.reponseParkinsonFort(e);
    else this.reponseParkinsonLeger(e);
  }

  constructor(public questionService: QuestionService, private router: Router) {
    this.questionService.question$.subscribe((question1: Question[]) => {
      this.question = question1;
    });

  }

  private reponseParkinsonFort(e : KeyboardEvent): void{
    let reponse = null;

    if (e.key == Handicap_Fort_Haut.E || e.key == Handicap_Fort_Haut.PARENTHESE_OUVERTE || e.key == Handicap_Fort_Haut.APPOSTROPHE
      || e.key == Handicap_Fort_Haut.MOINS|| e.key== Handicap_Fort_Haut.R|| e.key== Handicap_Fort_Haut.T)
      reponse = this.question[0].reponses[0];

    //zone violette
    if (e.key == Handicap_Fort_Gauche.A || e.key == Handicap_Fort_Gauche.Z || e.key == Handicap_Fort_Gauche.Q
      || e.key == Handicap_Fort_Gauche.S || e.key == Handicap_Fort_Gauche.W || e.key == Handicap_Fort_Gauche.X)
      reponse = this.question[0].reponses[1];

    //zone jaune
    if(e.key == Handicap_Fort_Bas.H || e.key == Handicap_Fort_Bas.J || e.key == Handicap_Fort_Bas.B
      || e.key == Handicap_Fort_Bas.N || e.key == Handicap_Fort_Bas.VIRGULE)
      reponse = this.question[0].reponses[2];

    //zone bleu
    if(e.key == Handicap_Fort_Droite.O || e.key == Handicap_Fort_Droite.P || e.key == Handicap_Fort_Droite.L
      || e.key == Handicap_Fort_Droite.M || e.key== Handicap_Fort_Droite.DOUBLE_POINT || e.key == Handicap_Fort_Droite.POINT_EXCLAMATION)
      reponse = this.question[0].reponses[3];
    if (reponse != null) this.reponseNavigation(reponse);
  }

  private reponseParkinsonLeger(e : KeyboardEvent): void{
    let reponse = null;
    switch (e.key) {
      case Handicapt_Leger_Haut.FLECHE_HAUT : reponse = this.question[0].reponses[0]; break;
      case Handicap_Leger_Gauche.FLECHE_GAUCHE : reponse = this.question[0].reponses[1]; break;
      case Handicap_Leger_Droite.FLECHE_DROITE : reponse = this.question[0].reponses[2]; break;
      case Handicap_Leger_Bas.FLECHE_BAS : reponse = this.question[0].reponses[3]; break;
      default: break;
    }
    if (reponse != null) this.reponseNavigation(reponse);
  }

  private reponseNavigation(reponse: Reponse): void {
    if(reponse.estCorrect) {
      this.router.navigate(['question-explication'])
    }
    else {
      this.router.navigate(['question-explication'])
    }
  }
}
