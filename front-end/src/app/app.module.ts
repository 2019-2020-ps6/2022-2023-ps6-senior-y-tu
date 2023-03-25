import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizListComponent} from "./quizs/quiz-list/quiz-list.component";
import { QuizComponent} from "./quizs/quiz/quiz.component";
import { CreerQuestionComponent } from './questions/creer-question/creer-question.component';
import { HeaderPatientComponent } from './header/patient/headerPatient.component';
import {HeaderProComponent} from "./header/pro/headerPro.component";
import {HeaderAccueilComponent} from "./header/accueil/headerAccueil.component";
import {CreerQuizComponent} from "./quizs/creer-quiz/creer-quiz.component";
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { PatientComponent } from './patients/patient/patient.component';
import { PageAideComponent } from "./footer/page_aide/pageAide.component";
import { MesQuizsComponent } from './quizs/mes-quizs/mes-quizs.component';
import {ThemeComponent} from "./themes/theme/theme.component";
import {ThemeListComponent} from "./themes/theme-list/theme-list.component";
import { ShowQuestionComponent } from './questions/show-question/show-question.component';
import {FooterComponent} from "./footer/footer.component";


import  {RouterModule} from "@angular/router";
import { AccueilComponent } from './accueil/accueil.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


import { QuestionComponent } from './questions/question/question.component';
import { QuestionListeComponent } from './questions/question-liste/question-liste.component';
import { QuizModificationComponent} from "./quizs/quiz-modification/quiz-modification.component";
import {CreerPatientsComponent} from "./patients/creer-patients/creer-patients.component";
import {MesPatientsComponent} from "./patients/mes-patients/mes-patients.component";

// import * as http from "http";


@NgModule({
  declarations: [
    AppComponent,
    CreerQuizComponent,
    QuizComponent,
    QuizListComponent,
    ThemeComponent,
    ThemeListComponent,
    CreerQuestionComponent,
    HeaderPatientComponent,
    HeaderProComponent,
    HeaderAccueilComponent,
    AccueilComponent,
    MesQuizsComponent,
    PatientListComponent,
    PatientComponent,
    ShowQuestionComponent,
    PageAideComponent,
    FooterComponent,
    QuestionComponent,
    QuestionListeComponent,
    QuizModificationComponent,
    QuizModificationComponent,
    CreerPatientsComponent,
    MesPatientsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule{}
