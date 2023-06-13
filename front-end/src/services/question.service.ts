import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {Question} from "../models/question.model";
import {QUESTION_LISTE} from "../mocks/quiz-list.mock";


@Injectable({
  providedIn: 'root'
})

export class QuestionService {
  private question: Question[] = [];

  public question$: BehaviorSubject<Question[]> = new BehaviorSubject(QUESTION_LISTE);

  constructor() {}

  addQuestion(questions: Question) {

    this.question.push(questions);
    this.question$.next(this.question);
  }

  nextQuestion(): void{
    this.question$.next(this.question);
  }
}
