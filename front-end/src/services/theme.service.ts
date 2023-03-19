import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Theme} from "../models/theme.model";
import { THEME_LIST} from "../mocks/theme-list.mock";
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quiz.
   The list is retrieved from the mock.
   */
  private themes: Theme[] = THEME_LIST;

  /*
   Observable which contains the list of the quiz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public themes$: BehaviorSubject<Theme[]>
    = new BehaviorSubject(this.themes);

  public themeSelected$: Subject<Theme> = new Subject();

  private themeUrl = serverUrl + '/themes';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveThemes();
  }

  retrieveThemes(): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }

  addTheme(theme: Theme): void {
    this.http.post<Theme>(this.themeUrl, theme, this.httpOptions).subscribe(() => this.retrieveThemes());
  }
}

