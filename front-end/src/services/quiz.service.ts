import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LISTE } from '../mocks/quiz-list.mock';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizs: Quiz[] = QUIZ_LISTE;

  public quizs$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LISTE);

 // public quizSelected$: Subject<Quiz> = new Subject();

  constructor() {


  }


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

