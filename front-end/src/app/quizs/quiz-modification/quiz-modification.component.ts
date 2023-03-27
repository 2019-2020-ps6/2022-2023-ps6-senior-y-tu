import {Component, Input} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QUIZ_LISTE} from "../../../mocks/quiz-list.mock";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-quiz-modification',
  templateUrl: './quiz-modification.component.html',
  styleUrls: ['./quiz-modification.component.scss']
})
export class QuizModificationComponent {
  public quizForm : FormGroup;

  @Input()
  quiz: Quiz | undefined;
  nom : string ;
  theme : string ;
  image : string ;

  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder) {
    const id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LISTE.find(quiz => quiz.id === id);

    this.nom =this.quiz?.nom as string;
    this.theme =this.quiz?.theme as string;
    this.image =this.quiz?.image as string;
    this.quizForm = this.formBuilder.group({
      nom: this.quiz?.nom,
      theme: this.quiz?.theme,
      image: this.quiz?.image
    });
  }

  ngOnInit(): void {

  }


}
