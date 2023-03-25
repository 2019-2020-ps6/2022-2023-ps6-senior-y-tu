import { Injectable } from "@angular/core";
// @ts-ignore
import { BehaviorSubject } from "rxjs";
import {Question} from "../models/question.model";
import {QUESTION_LIST} from "../mocks/quiz-list.mock";


@Injectable({
  providedIn: 'root'
})

export class QuestionService {
  private question: Question[] = QUESTION_LIST;

  public question$: BehaviorSubject<Question[]> = new BehaviorSubject(QUESTION_LIST);

  constructor() {

  }

  addQuestion(questions: Question) {

    this.question.push(questions);
    this.question$.next(this.question);
  }

}