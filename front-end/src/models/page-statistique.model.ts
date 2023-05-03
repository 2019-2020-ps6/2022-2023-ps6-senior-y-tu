import {StatQuiz} from "./stat-quiz.model";

export interface temps{
  minutes: string;
  secondes: string;
}

export interface PageStatistique {
  nomPatient: string;
  idPatient: string;
  score: string;
  temps: temps
  handicap: string;
  nombreClick: string;
  souris: string;
  police: number;
  image: string;
  listStatQuiz: StatQuiz[];
}
