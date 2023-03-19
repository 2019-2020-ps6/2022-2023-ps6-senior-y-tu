import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuizListComponent} from "./Quiz/quiz-list/quiz-list.component";
import {CreerQuizComponent} from "./quizs/creer-quiz/creer-quiz.component";
import {CreerQuestionComponent} from "./questions/creer-question/creer-question.component";
import {AccueilComponent} from "./accueil/accueil.component";


const routes: Routes = [
  { path: 'creer-quiz', component: CreerQuizComponent },
  { path: 'creer-question', component: CreerQuestionComponent },
    {path: 'quiz-list', component: QuizListComponent},
    { path: 'accueil', component: AccueilComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
