import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Theme} from "../../../models/theme.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  lienQuiz = '/quiz-list';

  @Input()
  theme: Theme | undefined;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  private router: any;

  constructor(public root : Router) {
  }

  ngOnInit(): void {
  }

  selectQuizClick(themeNom: string | undefined): void {
    ThemeComponent.selectQuiz(themeNom);
    this.root.navigate([this.lienQuiz]);
  }

  public static selectQuiz(themeNom: string | undefined): void {
    if (typeof themeNom === "string") {
      console.log(themeNom);
      localStorage.setItem("nomTheme", themeNom);
    }
  }
}
