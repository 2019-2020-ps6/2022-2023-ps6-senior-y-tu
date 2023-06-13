import {Component, Input} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QuizService} from "../../../services/quiz.service";
import {ThemeService} from "../../../services/theme.service";


@Component({
  selector: 'app-quiz-modification',
  templateUrl: './quiz-modification.component.html',
  styleUrls: ['./quiz-modification.component.scss']
})
export class QuizModificationComponent {
  public quizForm : FormGroup;

  @Input()
  quizToUpdate: Quiz | undefined;
  themeNom : string | undefined;


  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, public quizService : QuizService, public themeService : ThemeService){
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.getQuizById(id).subscribe((quiz) => {
      this.quizToUpdate = quiz;
    });
    //this.quizToUpdate = QUIZ_LISTE.find(quiz => quiz.id === id);
    this.themeNom = this.themeService.getThemeById(this.quizToUpdate?.themeId)?.nomTheme;

    this.quizForm = this.formBuilder.group({
      id: [''],
      nom: [''],
      image: [''],
      theme: [''],
    });

    this.quizForm.patchValue({
      id: this.quizToUpdate?.id,
      nom: this.quizToUpdate?.nom,
      image: '',
      theme: this.themeNom,
    });



  }

  ngOnInit(): void {

  }

  modifierQuiz() {
    const quiz: Quiz = this.quizForm.getRawValue() as Quiz;
    if (quiz.image === '') {
      quiz.image = this.quizToUpdate?.image;
    }
    this.quizService.updateQuiz(this.quizToUpdate, quiz);
    //console.log('Quiz Modifié: ', quiz);

  }

}
