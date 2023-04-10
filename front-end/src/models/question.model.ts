
export interface Reponse {
  id: string;
  valeur: string;
  estCorrect: boolean;
}

export interface Question {
  id: string;
  intitule: string;
  reponses: Reponse[];
  img: string;
  explication: string;

}
