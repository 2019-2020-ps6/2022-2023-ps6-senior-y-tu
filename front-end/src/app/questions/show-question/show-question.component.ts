import {Component, HostListener, Input, OnInit} from '@angular/core';
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
import {ClickableDirective} from "../../autre/ClickableDirective";
import {FonctionCommuneThemeQuiz} from "../../autre/FonctionCommuneThemeQuiz";
import {Tuple} from "../../autre/Tuple";
import {QuizService} from "../../../services/quiz.service";
import {PatientConfiguration} from "../../autre/patientConfiguration";
import { StatistiqueQuiz } from 'src/models/statistique-quiz.model';
import {StatistiqueQuizService} from "../../../services/statistique-quiz.service";

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss']
})


export class ShowQuestionComponent implements OnInit{
  public tupleRetour: Tuple = new Tuple('/commencer-quiz', undefined);
  private changementDeplacement: number[] = [0, 0, 0, 0, 0]; // deplacementXActuelle, deplacementYactuelle, deplacementXprécédent, deplacementYprecedent

  @Input()
  question: Question | undefined;
  questionListe: Question[]  | undefined;
  index : number = 0;

  public reponseListe: Reponse[] = [];
  protected nbQuestion: number = 0;
  public score: number = 0;
  public statistique: StatistiqueQuiz | undefined;

  public idQz : string | null = null;
  public idQt : string | null = null;
  public idRp: string | undefined = "";


  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = (this.patientConfig.config == undefined)? "fort" : this.patientConfig.config?.handicap;
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

  constructor(private route: ActivatedRoute, private router: Router, public quizService: QuizService, private patientConfig: PatientConfiguration, private statistiqueService : StatistiqueQuizService) {
    if (patientConfig.config != undefined && patientConfig.config.souris == "oui")
      ClickableDirective.deplacementPageCursor(this.changementDeplacement);
    this.index = 1;
  }

  ngOnInit() {
    this.idQt = this.route.snapshot.paramMap.get('questionId');

    this.quizService.getQuestionById(this.idQz, this.idQt)?.subscribe((question) => {
      this.question = question;
      const idQuiz = (this.idQz)? this.idQz: undefined

      this.quizService.getReponseListe(idQuiz, question.id).subscribe((reponse) =>{
        this.reponseListe = reponse;
      });
    });

    this.quizService.getNbQuestionsByQuizId(this.idQz)?.subscribe((nb) => {
      this.nbQuestion = nb;
    });

    this.quizService.getQuestionsByQuizId(this.idQz)?.subscribe((questions) => {
      for (let i = 0; i < this.nbQuestion; i++) {
        if (questions[i].id + "" === this.idQt) {
          this.index = i;
          break;
        }
      }
    });
  }

  private reponseParkinsonFort(e : KeyboardEvent): void{
    let reponse = null;

    if (e.key == Handicap_Fort_Haut.E || e.key == Handicap_Fort_Haut.PARENTHESE_OUVERTE || e.key == Handicap_Fort_Haut.APPOSTROPHE
      || e.key == Handicap_Fort_Haut.MOINS|| e.key== Handicap_Fort_Haut.R|| e.key== Handicap_Fort_Haut.T)
      {
        reponse = (this.reponseListe)[0];
      }

    //zone violette
    else if (e.key == Handicap_Fort_Gauche.A || e.key == Handicap_Fort_Gauche.Z || e.key == Handicap_Fort_Gauche.Q
      || e.key == Handicap_Fort_Gauche.S || e.key == Handicap_Fort_Gauche.W || e.key == Handicap_Fort_Gauche.X)
      {
        reponse = (this.reponseListe)[1];
      }

    //zone jaune
    else if(e.key == Handicap_Fort_Bas.H || e.key == Handicap_Fort_Bas.J || e.key == Handicap_Fort_Bas.B
      || e.key == Handicap_Fort_Bas.N || e.key == Handicap_Fort_Bas.VIRGULE)
      {
        reponse = (this.reponseListe)[3];
      }

    //zone bleu
    else if(e.key == Handicap_Fort_Droite.O || e.key == Handicap_Fort_Droite.P || e.key == Handicap_Fort_Droite.L
      || e.key == Handicap_Fort_Droite.M || e.key== Handicap_Fort_Droite.DOUBLE_POINT || e.key == Handicap_Fort_Droite.POINT_EXCLAMATION)
      {
        reponse = (this.reponseListe)[2];
      }
    else
      FonctionCommuneThemeQuiz.ajouterAutreTouche(e);
    if (reponse != null) this.reponseNavigation(reponse);

  }

  private reponseParkinsonLeger(e : KeyboardEvent): void{
    let reponse = null;

    switch (e.key) {
      case Handicapt_Leger_Haut.FLECHE_HAUT : reponse = (this.reponseListe)[0]; break;
      case Handicap_Leger_Gauche.FLECHE_GAUCHE : reponse = (this.reponseListe)[1]; break;
      case Handicap_Leger_Droite.FLECHE_DROITE : reponse = (this.reponseListe)[3]; break;
      case Handicap_Leger_Bas.FLECHE_BAS : reponse = (this.reponseListe)[2]; break;
      default: FonctionCommuneThemeQuiz.ajouterAutreTouche(e); break;
    }
    if (reponse != null) this.reponseNavigation(reponse);
  }

  private reponseNavigation(reponse: Reponse): void {
    this.idRp = reponse.id;

    if (this.idQz != null) {
      this.statistiqueService.getStatistiqueByQuizId(this.idQz).subscribe((statistiqueQuiz) => {
        const currentScore = statistiqueQuiz?.bonneReponse || 0;
        const newScore = currentScore + 1;
        this.statistiqueService.updateStatistiqueScore(this.idQz, newScore);
      });
    }

    this.router.navigate(['question-explication/'+ this.idQz +'/'+this.idQt+'/'+this.idRp]);

  }
}
