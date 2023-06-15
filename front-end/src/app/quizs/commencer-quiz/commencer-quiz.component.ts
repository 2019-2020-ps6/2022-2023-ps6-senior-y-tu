import {Component, HostListener, Input} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {ThemeService} from "../../../services/theme.service";
import {QuizService} from "../../../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Handicap_Fort_Entree, Handicap_Leger_Entree, Retour} from "../../../enums/enumPatient";
import {ClickableDirective} from "../../autre/ClickableDirective";
import {Tuple} from "../../autre/Tuple";
import {Question} from "../../../models/question.model";
import {PatientConfiguration} from "../../autre/patientConfiguration";
import {StatistiqueQuizService} from "../../../services/statistique-quiz.service";
import {StatistiqueQuiz} from "../../../models/statistique-quiz.model";


@Component({
  selector: 'app-commencer-quiz',
  templateUrl: './commencer-quiz.component.html',
  styleUrls: ['./commencer-quiz.component.scss']
})
export class CommencerQuizComponent {

  @Input()
  themeNom: string | undefined;
  quiz: Quiz | undefined;
  questionListe: Question[] = [];

  public tupleRetour: Tuple = new Tuple('/theme-list', undefined);
  public tupleEntrer: Tuple | undefined;
  private changementDeplacement: number[] = [0, 0, 0, 0, 0]; // deplacementXActuelle, deplacementYactuelle, deplacementXprécédent, deplacementYprecedent
  private firstQuestion: string = ""
  private themeId: string = ""
  protected nbQuestion: number = 0;
  public idS: string | undefined;
  public meilleurScore: number |undefined;
  public nombreParties: number | undefined;

  @HostListener("window:mousemove", ["$event.clientX", "$event.clientY"])
  onMouseMove(e: any, e2: any){
    this.changementDeplacement[0] = e;
    this.changementDeplacement[1] = e2;
  }
  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = (this.config.config == undefined) ? "fort" : this.config.config?.handicap;

    if (e.key == Retour.EGAL || e.key == Retour.DOLLAR || e.key == Retour.BACKSPACE) this.router.navigate(['quiz-list', this.themeId]);
    else if (e.key == Handicap_Fort_Entree.ESPACE || (handicap == "leger" && e.key == Handicap_Leger_Entree.ENTREE)){
      this.quizService.startTimer();
      this.router.navigate(['show-question/' + this.quiz?.id, this.firstQuestion, this.idS]);
    }
  }


  constructor(public themeService: ThemeService, public quizService: QuizService, public router: Router, private route: ActivatedRoute, private config: PatientConfiguration, public statistiqueService: StatistiqueQuizService) {

    const idP = this.route.snapshot.paramMap.get('id');

    this.statistiqueService.getStatistiqueWithBestScore().subscribe((stat)=>{
      this.meilleurScore = stat?.bonneReponse || 0;
    });

    this.statistiqueService.getNombrePartiesJouees().subscribe((nombrePartiesJouees) => {
      this.nombreParties = nombrePartiesJouees || 0;
    });

    this.quizService.getNbQuestionsByQuizId(idP)?.subscribe((nb) => {
      this.nbQuestion = nb;
    });

    this.quizService.getQuizById(idP).subscribe((quiz)=>{
      this.quiz = quiz;
      let question1 = undefined;
      this.quizService.getQuestionsByQuizId(idP)?.subscribe((question) =>{
        question1 = question[0].id;
        this.firstQuestion = question1;
        this.themeId = quiz.themeId
        this.tupleRetour = new Tuple('/quiz-list', quiz.themeId);

        const stat: StatistiqueQuiz = {
          bonneReponse: 0,
          nombreReponse: this.nbQuestion,
          idPatient: '1',
          idQuiz: ''+this.quiz?.id,
          temp: 0,
        };

        this.statistiqueService.addStatistiqueQuiz(stat);

        const idQ = (this.quiz)? this.quiz.id: null;
        this.statistiqueService.getStatistiqueByQuizId(idQ).subscribe((stat)=>{
          this.idS = stat.id;

          this.tupleEntrer = new Tuple('/show-question/' + this.quiz?.id + '/' + this.firstQuestion + '/' + this.idS, undefined);
        });
      });
      this.themeNom = this.themeService.getThemeById(this.quiz?.themeId)?.nomTheme;
    });

    this.quizService.getQuestionsByQuizId(idP)?.subscribe((questions) => {
      this.questionListe = questions;
    });

    this.themeNom = this.themeService.getThemeById(this.quiz?.themeId)?.nomTheme;

    if (config.config != undefined && config.config.souris == "oui")
      ClickableDirective.deplacementPageCursor(this.changementDeplacement);

  }

  ngOnInit(): void {

  }

  jouer() {
    this.quizService.startTimer();
  }

}
