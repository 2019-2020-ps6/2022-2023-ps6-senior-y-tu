export interface Patient {
  id: string;
  nom: string;
  prenom : string;
  dateNaissance: string;
  image : string;
  explication: string;
  taille: number;
  handicap: string;
}

export interface Ergo {
  id: string;
  nom: string;
  image: string;
}
