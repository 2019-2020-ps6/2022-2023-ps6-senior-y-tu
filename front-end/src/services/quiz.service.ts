import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LISTE } from '../mocks/quiz-list.mock';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizs: Quiz[] = QUIZ_LISTE;

  public quizs$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LISTE);



  constructor() {

  }

  getQuizs(): Quiz[] {
    return this.quizs;
  }


  addQuiz(quiz: Quiz): void {
    const lastId = parseInt(this.quizs[this.quizs.length - 1].id);
    quiz.id = (lastId + 1).toString();

    this.quizs.push(quiz);
    this.quizs$.next(this.quizs);
  }

  deleteQuiz(quiz: Quiz): void {
    const index = this.quizs.indexOf(quiz);
    console.log('index: ', index)
    this.quizs.splice(index, 1);
    this.quizs$.next(this.quizs);
  }

  updateQuiz(quizToUpdate: Quiz | undefined, quiz: Quiz): void {
    if (!quizToUpdate) return;
    console.log('quizs; ', this.quizs);

    const index = this.quizs.findIndex(q => q.id === quizToUpdate.id)

    console.log('index: ', index)
    if (index === -1) return;
    console.log('quiz: ', quiz)

    this.quizs[index] = quiz;
    this.quizs$.next(this.quizs);

    console.log('Quiz Modifié (QuizService): ', quiz);
  }



}

