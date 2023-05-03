import {StatQuiz, temps} from "../models/stat-quiz.model";

export const temps_capitale: temps = {
  minutes: "1",
  secondes: "49"
}

export const temps_capitale2: temps = {
  minutes: "3",
  secondes: "12"
}

export const StatQuiz_Capitale: StatQuiz = {
  id: "1",
  nom: "Les Capitales",
  theme: "Géographie",
  score: "1/2",
  temps: temps_capitale,
  nombreClick: "5",
  souris: "oui",
  image: 'https://www.babelio.com/users/QUIZ_10-capitales-europeennes-dans-ces-films-cultes_5756.jpeg',
}

export const StatQuiz_Capitale2: StatQuiz = {
  id: "2",
  nom: "Les Capitales",
  theme: "Géographie",
  score: "2/2",
  temps: temps_capitale2,
  nombreClick: "3",
  souris: "oui",
  image: 'https://www.babelio.com/users/QUIZ_10-capitales-europeennes-dans-ces-films-cultes_5756.jpeg',
}
