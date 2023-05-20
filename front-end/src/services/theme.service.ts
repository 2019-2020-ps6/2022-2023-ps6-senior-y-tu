import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { Theme } from "../models/theme.model";
import { THEME_LIST } from "../mocks/theme-list.mock";
import {HttpClient} from "@angular/common/http";
import { serverUrl } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private themeUrl = serverUrl + '/themes'
  private themes: Theme[] = [];

  public themes$: BehaviorSubject<Theme[]>
    = new BehaviorSubject(<Theme[]> []);

  public themesSelected$ : Subject<Theme> = new Subject<Theme>();

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

  addTheme(theme: Theme): void {
    THEME_LIST.push(theme);
  }

}

