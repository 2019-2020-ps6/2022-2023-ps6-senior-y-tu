import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Theme} from "../../../models/theme.model";
import {Router} from "@angular/router";
import {Tuple} from "../../autre/Tuple";


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit{
  protected utilisationSouris: boolean = false;
  protected goto : Tuple | undefined;

  @Input()
  theme: Theme | undefined;

  @Input()
  couleur : boolean = false;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public root : Router) {
    let souris = localStorage.getItem("patient-utilisation_souris");
    if (souris != null && souris == "oui")
      this.utilisationSouris = true;
  }

  ngOnInit() {
    this.goto = new Tuple( '/quiz-list', this.theme?.id)
  }

  selectQuizClick(themeNom: string | undefined): void {
    ThemeComponent.selectQuiz(themeNom);
    this.root.navigate([ '/quiz-list']);
  }

  public static selectQuiz(themeNom: string | undefined): void {
    if (typeof themeNom === "string") {
      console.log(themeNom);
      localStorage.setItem("nomTheme", themeNom);
    }
  }
}
