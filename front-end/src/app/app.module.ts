import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreerQuizComponent } from './Quiz/creer-quiz/creer-quiz.component';
import { QuizListComponent} from "./Quiz/quiz-list/quiz-list.component";
import { QuizComponent} from "./Quiz/quiz/quiz.component";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CreerQuizComponent,
    QuizComponent,
    QuizListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
