import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LISTE } from '../mocks/quiz-list.mock';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private quizs: Quiz[] = QUIZ_LISTE;

  public quizs$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LISTE);


  /*
   The list of quiz.
   The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = QUIZ_LISTE;


  /*
   Observable which contains the list of the quiz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]>
    = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();

  addQuiz(quiz: Quiz): void {

    this.quizs.push(quiz);
    this.quizs$.next(this.quizs);
  }

  deleteQuiz(quiz: Quiz): void {
    const index = this.quizs.indexOf(quiz);
    this.quizs.splice(index, 1);
    this.quizs$.next(this.quizs);
  }

}

