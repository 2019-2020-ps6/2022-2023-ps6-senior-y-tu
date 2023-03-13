import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreerQuizComponent } from './Quizs/creer-quiz/creer-quiz.component';
import { CreerQuestionComponent } from './Questions/creer-question/creer-question.component';

@NgModule({
  declarations: [
    AppComponent,
    CreerQuizComponent,
    CreerQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
