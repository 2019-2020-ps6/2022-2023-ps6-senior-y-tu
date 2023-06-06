import {Component, OnInit} from '@angular/core';
import { Quiz} from "../../../models/quiz.model";
import { QuizService } from "../../../services/quiz.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Theme} from "../../../models/theme.model";
import {Router} from "@angular/router";

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

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router : Router) {
    this.quizForm = this.formBuilder.group({
      nom: [''],
      image: [''],
      nomTheme: [''],
    });

    //front
    //const listeQuiz = this.quizService.getQuizs();
    //this.newId = (listeQuiz.length + 1).toString();
  }
  ngOnInit(): void {  }


  onCreer() {
    const valeur = this.quizForm.getRawValue() ;
    const quiz: Quiz = {
      nom: valeur.nom,
      image: valeur.image,
      themeId: valeur.themeId,
      id: valeur.id,
    }
    const theme: Theme = {
      nomTheme: valeur.nomTheme,
      image: valeur.image,
      id: valeur.themeId,

    }

    this.quizService.addQuiz(quiz, theme);

    this.quizService.quizSelected$.subscribe((quiz) => {
      const quizId = quiz.id;

      this.router.navigate(["/creer-quiz", quizId, "creer-question"]);
    });






  }
}
