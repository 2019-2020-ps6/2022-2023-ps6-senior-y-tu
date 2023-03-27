
export interface Reponse {
  id: string;
  type?: string;
  valeur: string;
  estCorrect: boolean;
}

export interface Question {
  id: string;
  intitule: string;
  reponses: Reponse[];
  img: string;
  description: string;
}
