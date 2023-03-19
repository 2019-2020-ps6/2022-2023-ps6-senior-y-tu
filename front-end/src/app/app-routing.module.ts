import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuizListComponent} from "./Quiz/quiz-list/quiz-list.component";

const routes: Routes = [
  {path: 'quiz-list', component: QuizListComponent},
  { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
