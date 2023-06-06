
export interface Reponse {
  //id: string;
  valeur: string;
  estCorrect: boolean;

  questionId: string;
}

export interface Question {
  id: string;
  intitule: string;
  image: string;
  explication: string;

  quizId: string;

}
