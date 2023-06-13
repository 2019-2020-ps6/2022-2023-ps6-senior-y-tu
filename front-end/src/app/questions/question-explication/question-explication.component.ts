import {Component, HostListener, Input} from '@angular/core';
import {Question, Reponse} from "../../../models/question.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Handicap_Leger_Entree, Retour} from "../../../enums/enumPatient";
import {ClickableDirective} from "../../autre/ClickableDirective";
import {FonctionCommuneThemeQuiz} from "../../autre/FonctionCommuneThemeQuiz";
import {Tuple} from "../../autre/Tuple";
import {QuizService} from "../../../services/quiz.service";

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
  public question: Question | undefined;

  public reponseCorrecte: Reponse | undefined;
  public idQz: string | null;
  public idQt: string | null;
  public idRp: string | null;

  protected nbQuestion: number = 0;

  public reponseListe: Reponse[] = [];
  public afficherBravo: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService) {
    this.idQz = this.route.snapshot.paramMap.get('id');
    this.idQt = this.route.snapshot.paramMap.get('questionId');
    this.idRp = this.route.snapshot.paramMap.get('reponseId');

    if(this.idQz == null) this.idQz = '1';

    this.quizService.getQuestionById(this.idQz, this.idQt)?.subscribe((question) => {
        this.question = question;

      this.quizService.getReponseListe(question.quizId, question.id).subscribe((reponseListe) => {
        this.reponseListe = reponseListe;
        this.reponseCorrecte = this.reponseListe.find((reponse: Reponse) => reponse.estCorrect);
      });
    });

    this.quizService.getNbQuestionsByQuizId(this.idQz)?.subscribe((nb) => {
      this.nbQuestion = nb;
    });

    console.log(this.reponseCorrecte);

    if(this.idRp == this.reponseCorrecte?.id){
      console.log("ok")
      this.afficherBravo = true;
    }

    let clickable = localStorage.getItem("patient-utilisation_souris");
    if (clickable != null && clickable == "oui")
      ClickableDirective.deplacementPageCursor(this.changementDeplacement);
  }
}
