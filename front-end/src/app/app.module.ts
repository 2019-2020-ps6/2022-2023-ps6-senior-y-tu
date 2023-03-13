import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreerQuizComponent } from './Quiz/creer-quiz/creer-quiz.component';
import { HeaderPatientComponent } from './header/patient/headerPatient.component';
import {HeaderProComponent} from "./header/pro/headerPro.component";
import {HeaderAccueilComponent} from "./header/accueil/headerAccueil.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderPatientComponent,
    HeaderProComponent,
    HeaderAccueilComponent,
    CreerQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule{}
