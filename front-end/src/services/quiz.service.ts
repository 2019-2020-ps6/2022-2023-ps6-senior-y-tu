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
    quiz.id = (this.quizs.length + 1).toString();

    this.quizs.push(quiz);
    this.quizs$.next(this.quizs);
  }

  deleteQuiz(quiz: Quiz): void {
    const index = this.quizs.indexOf(quiz);
    this.quizs.splice(index, 1);
    this.quizs$.next(this.quizs);
  }

  updateQuiz(quiz: Quiz | undefined): void {
    if (!quiz) return; // vérifier si le quiz est défini

    const index = this.quizs.findIndex(q => q.id === quiz.id); // trouver l'index du quiz à mettre à jour
    if (index === -1) return; // vérifier si le quiz a été trouvé

    this.quizs[index] = quiz; // mettre à jour le quiz dans le tableau
    this.quizs$.next(this.quizs);

    console.log('Quiz Modifié (QuizService): ', quiz);
  }



}

