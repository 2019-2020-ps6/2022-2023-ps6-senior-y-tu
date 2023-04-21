import {Component, HostListener, Input} from '@angular/core';
import {Question, Reponse} from "../../../models/question.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Handicap_Leger_Entree, Retour} from "../../../enums/enumPatient";
import {QUESTION_LISTE} from "../../../mocks/quiz-list.mock";

@Component({
  selector: 'app-question-explication',
  templateUrl: './question-explication.component.html',
  styleUrls: ['./question-explication.component.scss']
})
export class QuestionExplicationComponent {
  public lienRetour = "quiz-list";
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
  }

  @Input()
  public questions: Question | undefined;
  public reponseCorrecte: number;
  public id: string | null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.questions = QUESTION_LISTE.find(quiz => quiz.id === this.id);

    this.reponseCorrecte = this.questions?.reponses?.findIndex((reponse: Reponse) => reponse.estCorrect) ?? -1;
  }
}
