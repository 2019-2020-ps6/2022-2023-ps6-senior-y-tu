export interface Reponse {
  type?: string;
  valeur: string;
  estCorrect: boolean;
}

export interface Question {
  id: string;
  intitule: string;
  responses: Reponse[];
}
