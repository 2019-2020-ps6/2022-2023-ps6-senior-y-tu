import {Component, OnInit} from '@angular/core';
import { Quiz} from "../../../models/quiz.model";
import { QuizService } from "../../../services/quiz.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Theme} from "../../../models/theme.model";
import {Router} from "@angular/router";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-creer-quiz',
  templateUrl: './creer-quiz.component.html',
  styleUrls: ['./creer-quiz.component.scss']
})
export class CreerQuizComponent implements  OnInit{
  public quizForm : FormGroup;
  //public newId: string;
  quiz: Quiz | undefined;

  theme: Theme | undefined;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router : Router, private themeService: ThemeService) {
    this.quizForm = this.formBuilder.group({
      nom: [''],
      image: [''],
      nomTheme: [''],
    });
  }
  ngOnInit(): void {
  }


  onCreer() {
    const valeur = this.quizForm.getRawValue() ;

    const theme = {
      nomTheme: valeur.nomTheme,
      image: valeur.image,
      id: "1"
    }

    this.themeService.addTheme(theme);
    this.themeService.themesSelected$.subscribe((theme) => {

      const quiz: Quiz = {
        nom: valeur.nom,
        image: valeur.image,
        themeId: theme.id,
        id: valeur.id,
      }

      this.quizService.addQuiz(quiz, theme);
      this.quizService.quizSelected$.subscribe((quiz) => {
        const quizId = quiz.id;
        this.router.navigate(["/creer-quiz", quizId, "creer-question"]);
      });
    })
  }
}
