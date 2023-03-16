import {Injectable} from "@angular/core";
import { Quiz } from '../models/quiz.model';
import { QUIZ_LISTE } from '../mocks/quiz-list.mock';
@Injectable({
  providedIn: 'root'
})

export class QuizService {

  constructor() { }

  ngOnInit(): void {
  }

  addQuiz(quiz: Quiz): void {
    QUIZ_LISTE.push(quiz);
  }

}
