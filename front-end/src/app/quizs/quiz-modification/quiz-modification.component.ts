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
    this.quizForm = this.formBuilder.group({
      id: [''],
      nom: [''],
      image: [''],
      theme: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.getQuizById(id).subscribe((quiz) => {
      this.quizToUpdate = quiz;

      this.themeService.getThemesById(quiz.themeId)
      this.themeService.themesSelected$.subscribe((theme) => {
        this.theme = theme;

        this.quizForm.patchValue({
          id: this.quizToUpdate?.id,
          nom: this.quizToUpdate?.nom,
          image: quiz.image,
          theme: this.theme?.nomTheme,
        });
      })
    });
  }

  modifierQuiz() {
    const quizGetForm = this.quizForm.getRawValue();
    const idQuiz = this.route.snapshot.paramMap.get('id');

    if (idQuiz != null) {
      const quiz: Quiz = {
        id: idQuiz,
        nom: quizGetForm.nom,
        image: quizGetForm.image,
        themeId: "5",
      }

      this.changementQuiz(quiz, quizGetForm.theme)
    }
  }

  private changementQuiz(quiz: Quiz, nomTheme: string) {
    if (this.theme != undefined) {
      let checkDiff = this.checkDifference(quiz);

      if (this.theme.nomTheme != nomTheme && nomTheme != '') {
        this.theme.nomTheme = nomTheme;
        this.themeService.updateTheme(this.theme);

        this.themeService.themesSelected$.subscribe((theme) => {
          quiz.themeId = theme.id
          this.quizService.updateQuiz(quiz);
        })
      }

      else if (checkDiff) {
        quiz.themeId = this.theme.id
        this.quizService.updateQuiz(quiz)
      }
    }
  }

  private checkDifference(quiz: Quiz): boolean {
    return this.quizToUpdate?.nom == quiz.nom && this.quizToUpdate.image == quiz.image
  }

}
