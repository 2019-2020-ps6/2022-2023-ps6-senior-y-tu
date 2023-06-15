import {Directive, ElementRef, HostListener} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {PatientConfiguration} from "../../autre/patientConfiguration";

@Directive({
  selector: '[appDirectiveQuestionExplication]'
})
export class ClickableDirectiveQuestionExplication {
  private estClickable = false;

  @HostListener('click') onClick() {
    const idQuizz = this.activeRouteur.snapshot.paramMap.get('id');
    const idQuestion = this.activeRouteur.snapshot.paramMap.get('questionId');
    const idReponse = this.activeRouteur.snapshot.paramMap.get('reponseId');
    const idStat = this.activeRouteur.snapshot.paramMap.get('statId');

    if (idQuizz != null && idQuestion != null && idReponse != null && this.estClickable) {
      this.quizService.getQuestionsByQuizId(idQuizz)?.subscribe((questions) => {
        let currentIndex = -1;

        for (let i = 0; i < questions.length; i++) {
          if (questions[i].id + "" === idQuestion) {
            currentIndex = i;
            break;
          }
        }

        // Vérification de l'index de la question actuelle
        if (currentIndex !== -1 && currentIndex < questions.length - 1) {
          // L'index de la question suivante
          const nextIndex = currentIndex + 1;
          const nextQuestionId = questions[nextIndex].id;
          this.root.navigate(['/show-question/' + idQuizz + '/' + nextQuestionId +'/' + idStat]);
        } else {
          // Pas de question suivante
          this.root.navigate(['/quiz-resultat/'+ idQuizz +'/'+ idStat]);
        }
      });
    }
  }

  public constructor(private root : Router, private el : ElementRef, private activeRouteur : ActivatedRoute, private quizService : QuizService, private  patientConfig : PatientConfiguration) {
    this.estClickable = patientConfig.config != undefined && patientConfig.config.souris == "oui";
    el.nativeElement.style.cursor = this.estClickable? "pointer" : "default";
  }
}
