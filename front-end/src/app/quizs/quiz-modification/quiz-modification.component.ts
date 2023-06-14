import {Component, Input} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QuizService} from "../../../services/quiz.service";
import {ThemeService} from "../../../services/theme.service";
import {Theme} from "../../../models/theme.model";


@Component({
  selector: 'app-quiz-modification',
  templateUrl: './quiz-modification.component.html',
  styleUrls: ['./quiz-modification.component.scss']
})
export class QuizModificationComponent {
  public quizForm : FormGroup;

  @Input()
  quizToUpdate: Quiz | undefined;
  theme : Theme | undefined;


  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, public quizService : QuizService, public themeService : ThemeService){
    const id = this.route.snapshot.paramMap.get('id');
    this.quizForm = this.formBuilder.group({
      id: [''],
      nom: [''],
      image: [''],
      theme: [''],
    });

    this.quizService.getQuizById(id).subscribe((quiz) => {
      this.quizToUpdate = quiz;

      this.themeService.getThemeId(quiz.themeId);
      this.themeService.themesSelected$.subscribe((theme) => {
        this.theme = theme;
      })

      this.quizForm.patchValue({
        id: quiz.id,
        nom: quiz.nom,
        image: quiz.image,
        theme: '',
      });
    });
    //this.quizToUpdate = QUIZ_LISTE.find(quiz => quiz.id === id);
    //this.themeNom = this.themeService.getThemeById(this.quizToUpdate?.themeId)?.nomTheme;
  }

  ngOnInit(): void {

  }

  modifierQuiz() {
    const themeValue = this.quizForm.getRawValue();
    const quiz = this.quizForm.getRawValue() as Quiz;

    if (this.quizToUpdate != undefined) {
      let quizAAdd: Quiz = {
        "id": this.quizToUpdate.id,
        "nom": this.quizToUpdate.nom,
        "image": this.quizToUpdate.image,
        "themeId": (this.theme?.id) ? this.theme.id : "0",
      }
      if (quiz.image !== '') {
        quizAAdd.image = quiz.image;
      }
      if (quiz.nom !== '')
        quizAAdd.nom = quiz.nom
      this.quizService.updateQuiz(this.quizToUpdate, quizAAdd);
    }
    //console.log('Quiz Modifié: ', quiz);

    if (this.theme != undefined && themeValue.theme != '' && this.theme.nomTheme != themeValue.theme ) {
      const theme: Theme = {
        "id": this.theme.id,
        "nomTheme": themeValue.theme,
        "image": this.theme.image
      };
      this.themeService.updateTheme(theme);
    }

  }

}
