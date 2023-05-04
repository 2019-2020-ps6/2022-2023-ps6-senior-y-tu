import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Theme} from "../models/theme.model";
import { THEME_LIST} from "../mocks/theme-list.mock";

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
    = new BehaviorSubject(THEME_LIST);

  /*constructor(private http: HttpClient) {
    this.retrieveThemes();
  }

  retrieveThemes(): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }*/

  addTheme(theme: Theme): void {
    THEME_LIST.push(theme);
  }

}

