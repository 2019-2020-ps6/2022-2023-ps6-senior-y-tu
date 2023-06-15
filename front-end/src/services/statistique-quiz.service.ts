import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StatistiqueQuiz} from "../models/statistique-quiz.model";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {BehaviorSubject, map, Subject} from "rxjs";
import {Quiz} from "../models/quiz.model";

@Injectable( {
  providedIn:'root'
})

export class StatistiqueQuizService {
  private statistiquequiz: StatistiqueQuiz[] = [];
  private statistiqueQuizUrl = serverUrl + '/statistiqueQuiz'

  public statistiquequiz$: BehaviorSubject<StatistiqueQuiz[]> = new BehaviorSubject(<StatistiqueQuiz[]>[]);
  public statistiquequizSelectioner$: Subject<StatistiqueQuiz> = new Subject();
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveStatistiqueQuiz()
  }

  retrieveStatistiqueQuiz(): void {
    this.http.get<StatistiqueQuiz[]>(this.statistiqueQuizUrl).subscribe((statistiqueQuizList) => {
      this.statistiquequiz  = statistiqueQuizList;
      this.statistiquequiz$.next(this.statistiquequiz);
    });
  }

  addStatistiqueQuiz(statistiqueQuiz: StatistiqueQuiz): void {
    this.http.post<StatistiqueQuiz>(this.statistiqueQuizUrl, statistiqueQuiz, this.httpOptions).subscribe((statistiqueQuizAjouter) => {
      this.retrieveStatistiqueQuiz();
      this.statistiquequizSelectioner$.next(statistiqueQuizAjouter);
    });
  }

  getStatistiqueByQuizId(id: string | null) {
    const url = this.statistiqueQuizUrl+'?idQuiz='+id;
    return this.http.get<StatistiqueQuiz[]>(url).pipe(
      map((statistiqueQuizList) => statistiqueQuizList.find((statistiqueQuiz) => statistiqueQuiz.idQuiz === id))
    );
  }

  updateStatistiqueScore(quizId: string | null, newScore: number): void {
    const url = this.statistiqueQuizUrl + '?idQuiz=' + quizId;
    this.http.get<StatistiqueQuiz[]>(url).subscribe((statistiqueQuizList) => {
      const firstStatistiqueQuiz = statistiqueQuizList[0]; // Get the first element

      if (firstStatistiqueQuiz) {
        firstStatistiqueQuiz.bonneReponse = newScore;
        const updateUrl = this.statistiqueQuizUrl + '/' + firstStatistiqueQuiz.id;

        this.http.put<StatistiqueQuiz>(updateUrl, firstStatistiqueQuiz, this.httpOptions)
          .subscribe(() => {
            this.retrieveStatistiqueQuiz();
          });
      }
    });
  }
}
