import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StatistiqueQuiz} from "../models/statistique-quiz.model";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable( {
  providedIn:'root'
})

export class StatistiqueQuizService {
  private statistiquequiz: StatistiqueQuiz[] = [];
  private statistiqueQuizUrl = serverUrl + '/statistiqueQuiz'

  public statistiquequiz$: BehaviorSubject<StatistiqueQuiz[]> = new BehaviorSubject(<StatistiqueQuiz[]> []);
  public statistiquequizSelectioner$: Subject<StatistiqueQuiz> = new Subject<StatistiqueQuiz>();
  private httpOptions = httpOptionsBase;
  constructor(private http: HttpClient) {
  }

  retrieveStatistiqueQuiz(): void {
    this.http.get<StatistiqueQuiz[]>(this.statistiqueQuizUrl).subscribe((statistiqueQuizList) => {
      this.statistiquequiz  = statistiqueQuizList;
      this.statistiquequiz$.next(this.statistiquequiz);
    })
  }
  addStatistiqueQuiz(statistiqueQuiz: StatistiqueQuiz): void {
    this.http.post<StatistiqueQuiz>(this.statistiqueQuizUrl, statistiqueQuiz, this.httpOptions).subscribe((statistiqueQuizAjoutet) => {
      this.retrieveStatistiqueQuiz();
      this.statistiquequizSelectioner$.next(statistiqueQuizAjoutet);
    })
  }
}
