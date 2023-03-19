import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CreerQuizComponent} from "./quizs/creer-quiz/creer-quiz.component";
import {CreerQuestionComponent} from "./questions/creer-question/creer-question.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {MesQuizsComponent} from "./quizs/mes-quizs/mes-quizs.component";


const routes: Routes = [
  { path: 'creer-quiz', component: CreerQuizComponent },
  { path: 'creer-question', component: CreerQuestionComponent },
  { path: 'accueil', component: AccueilComponent },
  {path : 'mes-quizs', component: MesQuizsComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
