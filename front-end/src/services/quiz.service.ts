import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LISTE } from '../mocks/quiz-list.mock';
import {Question} from "../models/question.model";
import {Timer} from "../app/timer/Timer";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizs: Quiz[] = QUIZ_LISTE;

  public quizs$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LISTE)

  public timer : Timer = new Timer();

  public timer$: BehaviorSubject<Timer> = new BehaviorSubject(this.timer);


  constructor() {

  }

  getQuizs(): Quiz[] {
    return this.quizs;
  }


  addQuiz(quiz: Quiz): void {
    if(!this.quizs) return;
    if(this.quizs.length !== 0) {
      const lastId = parseInt(this.quizs[this.quizs.length - 1].id);
      quiz.id = (lastId + 1).toString();
    }
    else {
      quiz.id = '1';
    }


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
    const index = this.quizs.findIndex(q => q.id === quizToUpdate.id)
    if (index === -1) return;
    this.quizs[index] = quiz;
    this.quizs$.next(this.quizs);

    console.log('Quiz Modifié (QuizService): ', quiz);
  }

  addQuestion(question: Question, quiz: Quiz | undefined): void {
    if (!quiz) return;
    if(!this.quizs) return;
    const index = this.quizs.findIndex(q => q.id === quiz.id);
    if (index === -1) return;

    if(this.quizs[index].questions.length !== 0) {
      const lastId = parseInt(this.quizs[index].questions[this.quizs[index].questions.length - 1].id);
      if(!lastId) return;
      question.id = (lastId + 1).toString();
    }
    else {
      question.id = '1';
    }


    for(let i = 0; i < question.reponses.length; i++) {
      question.reponses[i].id = (i + 1).toString();
    }


    this.quizs[index].questions.push(question);
    this.quizs$.next(this.quizs);

    console.log('Question Ajoutée: ', question);
  }


  getQuestionById(id: string | null, questionId: string | null) {
    if (!id || !questionId) return;
    const quiz = this.quizs.find(q => q.id === id);
    if (!quiz) return;
    return quiz.questions.find(q => q.id === questionId);

  }

  updateQuestion(question: Question, id: string) {

    const quiz = this.quizs.find(q => q.id === id);
    if (!quiz) return;
    const index = quiz.questions.findIndex(q => q.id === question.id);
    if (index === -1) return;
    quiz.questions[index] = question;
    this.quizs$.next(this.quizs);

    console.log('Question Modifiée: ', question);

  }

  getQuizById(id: string | null) {
    if (!id) return;
    return this.quizs.find(q => q.id === id);
  }

  deleteQuestion(question: Question | undefined, quiz: Quiz | undefined) {
    if (!quiz) return;
    if (!question) return;
    const index = quiz.questions.indexOf(question);
    console.log('index: ', index)
    quiz.questions.splice(index, 1);
    this.quizs$.next(this.quizs);

    console.log('Question Supprimée: ', question);
    this.remiseAZeroQuestionsId(quiz);
  }


  private remiseAZeroQuestionsId(quiz: Quiz) {
    for(let i = 0; i < quiz.questions.length; i++) {
      quiz.questions[i].id = (i + 1).toString();
    }
    this.quizs$.next(this.quizs);
  }

  startTimer() {
    this.timer.start();
    this.timer$.next(this.timer);
  }
  stopTimer() {
    this.timer.stop();
    this.timer$.next(this.timer);
  }

  resetTimer() {
    this.timer.reset();
    this.timer$.next(this.timer);
  }

  getTimer() {
    return this.timer;
  }

  setTimer(timer: Timer) {
    this.timer = timer;
    this.timer$.next(this.timer);
  }

}

