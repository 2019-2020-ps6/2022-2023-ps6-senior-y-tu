import {Component, Input} from '@angular/core';
import {StatQuiz} from "../../../models/stat-quiz.model";

@Component({
  selector: 'app-stat-quiz',
  templateUrl: './stat-quiz.component.html',
  styleUrls: ['./stat-quiz.component.scss']
})
export class StatQuizComponent {

  @Input()
  stat : StatQuiz | undefined;





}
