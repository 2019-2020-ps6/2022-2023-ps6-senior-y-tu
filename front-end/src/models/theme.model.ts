import {QuizListComponent} from "../app/quizs/quiz-list/quiz-list.component";

export interface Theme {
  nom: string ;
  image?: string;
  quizs: QuizListComponent[];
}
