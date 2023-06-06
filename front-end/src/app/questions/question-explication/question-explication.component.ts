import {Component, HostListener, Input} from '@angular/core';
import {Question, Reponse} from "../../../models/question.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Handicap_Leger_Entree, Retour} from "../../../enums/enumPatient";
import {QUESTION_LISTE} from "../../../mocks/quiz-list.mock";
import {ClickableDirective} from "../../autre/ClickableDirective";
import {FonctionCommuneThemeQuiz} from "../../autre/FonctionCommuneThemeQuiz";
import {Tuple} from "../../autre/Tuple";
import {QuizService} from "../../../services/quiz.service";
import {Quiz} from "../../../models/quiz.model";

@Component({
  selector: 'app-question-explication',
  templateUrl: './question-explication.component.html',
  styleUrls: ['./question-explication.component.scss']
})
export class QuestionExplicationComponent {
  public tupleRetour: Tuple = new Tuple("theme-list", undefined);
  private changementDeplacement: number[] = [0, 0, 0, 0, 0]; // deplacementXActuelle, deplacementYactuelle, deplacementXprécédent, deplacementYprecedent

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";
    if(e.key == Handicap_Leger_Entree.ESPACE || (handicap == "leger" && e.key == Handicap_Leger_Entree.ENTREE)){
      if (this.id == '1'){
        this.router.navigate(['show-question',2]);
      }if (this.id == '2'){
        this.router.navigate(['quiz-resultat'])
      }
    }
    else if (e.key == Retour.BACKSPACE || e.key == Retour.DOLLAR || e.key == Retour.EGAL)
      this.router.navigate(['quiz-list']);
    else
      FonctionCommuneThemeQuiz.ajouterAutreTouche(e);
  }

  @HostListener("window:mousemove", ["$event.clientX", "$event.clientY"])
  onMouseMove(e: any, e2: any){
    this.changementDeplacement[0] = e;
    this.changementDeplacement[1] = e2;
  }

  @Input()
  public questions: Question | undefined;

  public quiz : Quiz | undefined;
  public reponseCorrecte: number;
  public id: string | null;

  public reponseListe: Reponse[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id == null) this.id = '1';
    this.questions = QUESTION_LISTE.find(quiz => quiz.id === this.id);
    this.quizService.getReponseListe(this.questions?.quizId, this.id).subscribe((reponseListe) => {
      this.reponseListe = reponseListe;
    });

    this.reponseCorrecte = this.reponseListe.findIndex((reponse: Reponse) => reponse.estCorrect) ?? -1;
    let clickable = localStorage.getItem("patient-utilisation_souris");
    if (clickable != null && clickable == "oui")
      ClickableDirective.deplacementPageCursor(this.changementDeplacement);
  }
}
