import {Component, Input} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QUIZ_LISTE} from "../../../mocks/quiz-list.mock";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QuizService} from "../../../services/quiz.service";


@Component({
  selector: 'app-quiz-modification',
  templateUrl: './quiz-modification.component.html',
  styleUrls: ['./quiz-modification.component.scss']
})
export class QuizModificationComponent {
  public quizForm : FormGroup;

  @Input()
  quizToUpdate: Quiz | undefined;



  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, public quizService : QuizService){
    const id = this.route.snapshot.paramMap.get('id');
    this.quizToUpdate = QUIZ_LISTE.find(quiz => quiz.id === id);

    this.quizForm = this.formBuilder.group({
      nom: [''],
      theme: [''],
      image: ['']
    });

    this.quizForm.patchValue({
      nom: this.quizToUpdate?.nom,
      theme: this.quizToUpdate?.theme,
      image: this.quizToUpdate?.image
    });
  }

  ngOnInit(): void {

  }

  modifierQuiz() {
    const quiz: Quiz = this.quizForm.getRawValue() as Quiz;
    this.quizService.updateQuiz(this.quizToUpdate, quiz);
    console.log('Quiz Modifié: ', quiz);

  }

}
