export interface Patient {
  id: string;
  nom: string;
  prenom : string;
  dateNaissance: Date;
  image : string;

  explication: string;
  taille: number;
  handicap: string;
}
