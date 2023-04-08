export interface Patient {
  id: string;
  nom: string;
  prenom : string;
  dateNaissance: Date;
  image : string;
  explication: string;
  taille: number;
  handicap: string;
  souris: string;
}

export interface Ergo {
  id: string;
  nom: string;
  image: string;
}
