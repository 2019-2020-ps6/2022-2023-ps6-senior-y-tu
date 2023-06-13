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
  addTheme(themeAdd : Theme): void {
    this.http.post<Theme>(this.themeUrl, themeAdd, this.httpOptions).subscribe((theme) => {
      this.themes$.next(this.themes);
      this.themesSelected$.next(theme)
    });
  }

  updateTheme(theme: Theme): void {
    this.http.put<Theme>(this.themeUrl + '/' + theme.id, theme, this.httpOptions).subscribe((theme) => {
      this.themesSelected$.next(theme)
    });
  }


  getThemeById(id: string | undefined): Theme | undefined {
    return this.themes.find(theme => theme.id === id);
  }

}

