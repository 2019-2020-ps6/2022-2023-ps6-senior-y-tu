import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuizListComponent} from "./quizs/quiz-list/quiz-list.component";
import {CreerQuizComponent} from "./quizs/creer-quiz/creer-quiz.component";
import {CreerQuestionComponent} from "./questions/creer-question/creer-question.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {MesQuizsComponent} from "./quizs/mes-quizs/mes-quizs.component";
import {ThemeListComponent} from "./themes/theme-list/theme-list.component";
import {ShowQuestionComponent} from "./questions/show-question/show-question.component";
import {PageAideComponent} from "./footer/page_aide/pageAide.component";
import {QuizModificationComponent} from "./quizs/quiz-modification/quiz-modification.component";
import {QuestionListeComponent} from "./questions/question-liste/question-liste.component";
import {MesPatientsComponent} from "./patients/mes-patients/mes-patients.component";
import {CreerPatientsComponent} from "./patients/creer-patients/creer-patients.component";
import {QuestionModificationComponent} from "./questions/question-modification/question-modification.component";
import {QuestionExplicationComponent} from "./questions/question-explication/question-explication.component";
import {CommencerQuizComponent} from "./quizs/commencer-quiz/commencer-quiz.component";




const routes: Routes = [
  { path: 'creer-quiz', component: CreerQuizComponent },
  { path: 'creer-question', component: CreerQuestionComponent },
  { path: 'creer-patient', component: CreerPatientsComponent },
  {path: 'quiz-list', component: QuizListComponent },
  { path: 'accueil', component: AccueilComponent },

  {path : 'mes-quizs', component: MesQuizsComponent},
    { path: 'theme-list', component: ThemeListComponent},
  { path: 'show-question', component: ShowQuestionComponent},
  {path: 'quiz-modification/:id', component: QuizModificationComponent},
  {path: 'question-liste/:id', component: QuestionListeComponent},
  {path: 'question-modification/:id', component: QuestionModificationComponent},
  {path: 'question-explication', component: QuestionExplicationComponent},
  {path: 'commencer-quiz', component: CommencerQuizComponent},



  { path:'mes-patients', component: MesPatientsComponent },

  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'page-aide', component: PageAideComponent, data: {id: "1", nom:"edward", image:""}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
