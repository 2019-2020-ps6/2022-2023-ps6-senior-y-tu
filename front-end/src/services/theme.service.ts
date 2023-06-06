import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { Theme } from "../models/theme.model";
import { THEME_LIST } from "../mocks/theme-list.mock";
import {HttpClient} from "@angular/common/http";
import {httpOptionsBase, serverUrl} from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private themeUrl = serverUrl + '/themes'
  private themes: Theme[] = [];

  public themes$: BehaviorSubject<Theme[]>
    = new BehaviorSubject(<Theme[]> []);

  public themesSelected$ : Subject<Theme> = new Subject<Theme>();

  private httpOptions = httpOptionsBase;


  constructor(private http: HttpClient) {
    this.getThemes();
  }

  getThemes(): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }

  getThemesById(id: string) : void {
    this.http.get<Theme>(this.themeUrl + '/' + id).subscribe((theme) => {
      this.themesSelected$.next(theme);
    })
  }

  //front

  /**
  addTheme(theme: Theme): void {
    THEME_LIST.push(theme);
  }
   */

  //back
  addTheme(themeAdd : Theme, image : string | undefined): void {
    console.log("addTheme");
    console.log(themeAdd);
    themeAdd.image = image;
    console.log(themeAdd)

    this.http.post<Theme>(this.themeUrl, themeAdd, this.httpOptions).subscribe((theme) => {
      this.themes.push(theme);
      this.themes$.next(this.themes);
    });

  }


  getThemeById(id: string | undefined): Theme | undefined {
    return this.themes.find(theme => theme.id === id);
  }

  getIdByNom(themeAdd: Theme, image : string | undefined): string {
    const id = this.themes.find(theme => theme.nomTheme === themeAdd.nomTheme)?.id;
    if (id) {
      return id;
    } else {
      this.addTheme(themeAdd, image);
      return this.themes.find(theme => theme.nomTheme === themeAdd.nomTheme)?.id || '';
    }
  }

}

