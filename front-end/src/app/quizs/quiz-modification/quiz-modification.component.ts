import {Component, Input} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QUIZ_LISTE} from "../../../mocks/quiz-list.mock";


@Component({
  selector: 'app-quiz-modification',
  templateUrl: './quiz-modification.component.html',
  styleUrls: ['./quiz-modification.component.scss']
})
export class QuizModificationComponent {
  @Input()
  quiz: Quiz | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quiz = QUIZ_LISTE.find(quiz => quiz.id === id);
  }



}
