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
  index : number | undefined =0;

  public reponseListe: Reponse[] = [];
  protected nbQuestion: number = 0;

  public idQz : string | null = null;
  public idQt : string | null = null;
  public idRp: string | undefined = "";


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

  constructor(private route: ActivatedRoute, private router: Router, public quizService: QuizService) {

    let clickable = localStorage.getItem("patient-utilisation_souris");
    if (clickable != null && clickable == "oui")
      ClickableDirective.deplacementPageCursor(this.changementDeplacement);

    this.index = 1;
  }

  ngOnInit() {
    this.idQz = this.route.snapshot.paramMap.get('id');
    this.idQt = this.route.snapshot.paramMap.get('questionId');
    console.log("test", this.idQz, this.idQt)
    this.quizService.getQuestionById(this.idQz, this.idQt)?.subscribe((question) => {
      this.question = question;
      const idQuiz = (this.idQz)? this.idQz: undefined
      console.log(idQuiz);
      this.quizService.getReponseListe(idQuiz, question.id).subscribe((reponse) =>{
        this.reponseListe = reponse;
        console.log(this.reponseListe);
      });
    });

    this.quizService.getNbQuestionsByQuizId(this.idQz)?.subscribe((nb) => {
      this.nbQuestion = nb;
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
        reponse = (this.reponseListe)[2];
      }

    //zone bleu
    else if(e.key == Handicap_Fort_Droite.O || e.key == Handicap_Fort_Droite.P || e.key == Handicap_Fort_Droite.L
      || e.key == Handicap_Fort_Droite.M || e.key== Handicap_Fort_Droite.DOUBLE_POINT || e.key == Handicap_Fort_Droite.POINT_EXCLAMATION)
      {
        reponse = (this.reponseListe)[3];
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
      case Handicap_Leger_Droite.FLECHE_DROITE : reponse = (this.reponseListe)[2]; break;
      case Handicap_Leger_Bas.FLECHE_BAS : reponse = (this.reponseListe)[3]; break;
      default: FonctionCommuneThemeQuiz.ajouterAutreTouche(e); break;
    }
    if (reponse != null) this.reponseNavigation(reponse);
  }

  private reponseNavigation(reponse: Reponse): void {
    this.idRp = reponse.id;
    console.log(this.idQz, this.idQt)
    this.router.navigate(['question-explication/'+ this.idQz +'/'+this.idQt+'/'+this.idRp]);
  }
}
