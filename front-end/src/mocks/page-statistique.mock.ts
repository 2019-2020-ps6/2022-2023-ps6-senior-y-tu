import {PageStatistique, temps} from "../models/page-statistique.model";

import {StatQuiz_Capitale, StatQuiz_Capitale2} from "./stat-quiz.mock";

export const temps_lucienne: temps = {
  minutes: "1",
  secondes: "27"
}

export const PageStatistique_Lucienne: PageStatistique = {
  nomPatient: "Lucienne",
  idPatient: "1",
  score: "1/2",
  temps: temps_lucienne,
  handicap: "leger",
  nombreClick: "3",
  souris: "oui",
  police: 40,
  image: '/assets/Image-Patient/Image_Lucienne.png',
  listStatQuiz: [StatQuiz_Capitale, StatQuiz_Capitale2]
}

export const STAT_LIST: PageStatistique[] = [
  PageStatistique_Lucienne
];
