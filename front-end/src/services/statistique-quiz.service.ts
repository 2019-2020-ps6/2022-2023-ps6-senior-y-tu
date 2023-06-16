import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StatistiqueQuiz} from "../models/statistique-quiz.model";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {BehaviorSubject, map, Subject} from "rxjs";
import {Timer} from "../app/timer/Timer";

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

  addStatistiqueQuiz(statistiqueQuiz: StatistiqueQuiz) {
    this.http.post<StatistiqueQuiz>(this.statistiqueQuizUrl, statistiqueQuiz, this.httpOptions).subscribe((statistiqueQuizAjouter) => {
      this.retrieveStatistiqueQuiz();
      this.statistiquequizSelectioner$.next(statistiqueQuizAjouter);
    });
  }

  getStatistiqueByQuizId(id: string | null) {
    const url = this.statistiqueQuizUrl + '?idQuiz=' + id;
    return this.http.get<StatistiqueQuiz[]>(url).pipe(
      map((statistiqueQuizList) => {
        const filteredStatistiqueQuiz = statistiqueQuizList.find(
          (statistiqueQuiz) => statistiqueQuiz.idQuiz === id
        );
        const lastStatistiqueQuiz = statistiqueQuizList[statistiqueQuizList.length - 1];
        return lastStatistiqueQuiz;
      })
    );
  }

  updateStatistiqueScore(idStat: string | null, newScore: number): void {
    const url = this.statistiqueQuizUrl + '/' + idStat; // Append the ID to the URL
    this.http.get<StatistiqueQuiz>(url).subscribe((statistiqueQuiz) => {
      if (statistiqueQuiz) {
        statistiqueQuiz.bonneReponse = newScore;

        const updateUrl = this.statistiqueQuizUrl + '/' + idStat;
        this.http.put<StatistiqueQuiz>(updateUrl, statistiqueQuiz, this.httpOptions)
          .subscribe(() => {
            this.retrieveStatistiqueQuiz();
          });
      }
    });
  }

  getStatistiqueById( idS: string | null) {
    const urlWithId = this.statistiqueQuizUrl + '/' + idS;
    return this.http.get<StatistiqueQuiz>(urlWithId);
  }

  getStatistiqueWithBestScore(){
    return this.http.get<StatistiqueQuiz[]>(this.statistiqueQuizUrl).pipe(
      map(statistiqueQuizList => {
        // Recherche de la statistique avec le meilleur score
        let bestStatistiqueQuiz: StatistiqueQuiz | undefined;
        let bestScore = -1;

        for (const statistiqueQuiz of statistiqueQuizList) {
          if (statistiqueQuiz.bonneReponse > bestScore) {
            bestStatistiqueQuiz = statistiqueQuiz;
            bestScore = statistiqueQuiz.bonneReponse;
          }
        }
        return bestStatistiqueQuiz;
      })
    );
  }

  getNombrePartiesJouees() {
    return this.http.get<StatistiqueQuiz[]>(this.statistiqueQuizUrl).pipe(
      map(statistiqueQuizList => statistiqueQuizList.length)
    );
  }

  updateTimer(idStat: string | null, newTime: number) {
    const url = this.statistiqueQuizUrl + '/' + idStat;
    this.http.get<StatistiqueQuiz>(url).subscribe((statistiqueQuiz) => {
      if (statistiqueQuiz) {
        statistiqueQuiz.temp= newTime;

        const updateUrl = this.statistiqueQuizUrl + '/' + idStat;
        this.http.put<StatistiqueQuiz>(updateUrl, statistiqueQuiz, this.httpOptions)
        .subscribe(() => {
          this.retrieveStatistiqueQuiz();
        });
      }
    });
  }
}
