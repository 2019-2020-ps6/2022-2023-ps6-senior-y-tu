import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreerQuestionComponent } from './questions/creer-question/creer-question.component';
import { HeaderPatientComponent } from './header/patient/headerPatient.component';
import {HeaderProComponent} from "./header/pro/headerPro.component";
import {HeaderAccueilComponent} from "./header/accueil/headerAccueil.component";
import {CreerQuizComponent} from "./quizs/creer-quiz/creer-quiz.component";

import  {RouterModule} from "@angular/router";
import { AccueilComponent } from './accueil/accueil.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { QuizComponent } from './quizs/quiz/quiz.component';
import { MesQuizsComponent } from './quizs/mes-quizs/mes-quizs.component';
// import * as http from "http";


@NgModule({
  declarations: [
    AppComponent,
    CreerQuizComponent,
    CreerQuestionComponent,
    HeaderPatientComponent,
    HeaderProComponent,
    HeaderAccueilComponent,
    AccueilComponent,
    QuizComponent,
    MesQuizsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule{}
