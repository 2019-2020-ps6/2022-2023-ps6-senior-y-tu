import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Subject} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import {Question, Reponse} from "../models/question.model";
import {Timer} from "../app/timer/Timer";

import {serverUrl, httpOptionsBase} from "../configs/server.config";
import {HttpClient} from '@angular/common/http';

import {Theme} from "../models/theme.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizs: Quiz[] = [];

  public quizs$: BehaviorSubject<Quiz[]> = new BehaviorSubject(<Quiz[]>[]);
  public quizSelected$: Subject<Quiz> = new Subject();


  public timer : Timer = new Timer();

  public timer$: BehaviorSubject<Timer> = new BehaviorSubject(this.timer);

  private quizUrl = serverUrl + '/quiz'

  private httpOptions = httpOptionsBase;
  private questionsPath = 'questions';
  public questionSelected$: Subject<Question> = new Subject();

  private reponsesPath = 'reponses';
  private reponseSelected$: Subject<Reponse> = new Subject()



  constructor(private http: HttpClient) {
    this.recupererQuizs()

  }

  recupererQuizs(){
    this.http.get<Quiz[]>(this.quizUrl).subscribe((listeQuiz) => {
      this.quizs = listeQuiz;
      this.quizs$.next(this.quizs);
    });
  }

  setSelectedQuiz(quizId: string): void {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }


  getQuizs(): Quiz[] {
    return this.quizs;
  }


  //addQuiz front
  /*
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
  */
  addQuiz(quiz: Quiz, theme : Theme): void {
    //quiz.themeId = this.themeService.getIdByNom(theme, quiz.image);
    if(!quiz.themeId) quiz.themeId = '1';
    if(!quiz.image) quiz.image ='sansImage';

    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe((quizz) => {
      this.recupererQuizs()
      this.quizSelected$.next(quizz);
    });
  }

  //front
  /*
  deleteQuiz(quiz: Quiz): void {
    const index = this.quizs.indexOf(quiz);
    console.log('index: ', index)
    this.quizs.splice(index, 1);
    this.quizs$.next(this.quizs);
  }
   */
  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.recupererQuizs());
  }

  //front
  /*
  updateQuiz(quizToUpdate: Quiz | undefined, quiz: Quiz): void {
    if (!quizToUpdate) return;
    const index = this.quizs.findIndex(q => q.id === quizToUpdate.id)
    if (index === -1) return;
    this.quizs[index] = quiz;
    this.quizs$.next(this.quizs);

    console.log('Quiz Modifié (QuizService): ', quiz);
  }
   */

  updateQuiz(quizToUpdate: Quiz | undefined, quiz: Quiz): void{
    if (!quizToUpdate) return;
    const urlWithId = this.quizUrl + '/' + quizToUpdate.id;
    this.http.put<Quiz>(urlWithId, quiz, this.httpOptions).subscribe(() => this.recupererQuizs());
    console.log('Quiz Modifié (QuizService): ', quiz);
  }

  getIdQuizWithName(quiz: Quiz): string {
    const taille = this.quizs.length;
    if(taille === 0) return '';
    return this.quizs[taille - 1].id;
  }


  //front
  /*
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
   */

  addQuestion(question: Question, quiz: Quiz | undefined): void {
    if (!quiz) return;
    if(!question.image) question.image = 'sansImage';
    if (!question.explication) question.explication = 'Pas d\'explication';
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe((question) => {
      console.log('question: ', question)
      this.setSelectedQuiz(quiz.id);
        this.questionSelected$.next(question);
    });
  }

  //front
  /*
  getQuestionById(id: string | null, questionId: string | null) {
    if (!id || !questionId) return;
    const quiz = this.quizs.find(q => q.id === id);
    if (!quiz) return;
    return quiz.questions.find(q => q.id === questionId);

  }
   */

  getQuestionById(id: string | null, questionId: string | null) {
    if (!id || !questionId) return;
    console.log(id, questionId)
    const urlWithId = this.quizUrl + '/' + id + '/' + this.questionsPath + '/' + questionId;
    console.log(urlWithId)
    return this.http.get<Question>(urlWithId);
  }

//front
  /*
  updateQuestion(question: Question, id: string) {

    const quiz = this.quizs.find(q => q.id === id);
    if (!quiz) return;
    const index = quiz.questions.findIndex(q => q.id === question.id);
    if (index === -1) return;
    quiz.questions[index] = question;
    this.quizs$.next(this.quizs);

    console.log('Question Modifiée: ', question);

  }
   */
  updateQuestion(question: Question, id: string) {
    const urlWithId = this.quizUrl + '/' + id + '/' + this.questionsPath + '/' + question.id;
    this.http.put<Question>(urlWithId, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(id));
    console.log('Question Modifiée: ', question);
  }

  //front
  /*
  getQuizById(id: string | null) {
    if (!id) return;
    return this.quizs.find(q => q.id === id);
  }
   */

  getQuizById(id: string | null) {
    const urlWithId = this.quizUrl + '/' + id;
    return this.http.get<Quiz>(urlWithId);
  }



  //front
  /*
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
   */

  deleteQuestion(question: Question | undefined, quiz: Quiz | undefined) {
    if (!quiz) return;
    if (!question) return;
    const urlWithId = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(urlWithId, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    console.log('Question Supprimée: ', question);
  }

  //front
  /*
  private remiseAZeroQuestionsId(quiz: Quiz) {
    for(let i = 0; i < quiz.questions.length; i++) {
      quiz.questions[i].id = (i + 1).toString();
    }
    this.quizs$.next(this.quizs);
  }

   */

  getQuestionsByQuizId(id: string | null) {
    if (!id) return;
    const urlWithId = this.quizUrl + '/' + id + '/questions' ;
    return this.http.get<Question[]>(urlWithId);
  }

  getNbQuestionsByQuizId(id: string | null) {
    if (!id) return;
    const urlWithId = this.quizUrl + '/' + id + '/' + this.questionsPath;
    return this.http.get<Question[]>(urlWithId).pipe(map(questions => questions.length));
  }

  addReponse(reponse: Reponse, quiz: Quiz | undefined): void {
    if (!quiz) return;
    console.log('reponse: ', reponse);
    console.log('quiz: ', quiz);
    const urlWithId = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + reponse.questionId + '/' + this.reponsesPath;
    this.http.post<Reponse>(urlWithId, reponse, this.httpOptions).subscribe((Reponse) => {
      this.setSelectedQuiz(quiz.id)
      this.reponseSelected$.next(Reponse);
    });
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

  getReponseListe(quizId: string | undefined, questionId: string | undefined) {
    console.log(quizId, questionId)
    const urlWithId = this.quizUrl + '/' + quizId + '/' + this.questionsPath + '/' + questionId + '/' + this.reponsesPath
    return this.http.get<Reponse[]>(urlWithId);
  }

}

