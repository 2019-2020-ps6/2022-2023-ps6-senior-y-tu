import {Patient, Ergo} from '../models/personne.model';

export const Patient_Lucienne: Patient = {
    id: '1',
    nom:"De La Mer",
    prenom: "Lucienne",
    dateNaissance:'14/03/1946',
    image: '/assets/Image-Patient/Image_Lucienne.png',
    handicap: 'leger',
    explication: 'oui',
    taille:40
};

export const Patient_Jean: Patient = {
  id: '2',
  nom:"Bois",
  prenom: "Jean",
  dateNaissance:'09/07/1950',
  image: '/assets/Image-Patient/Image_Jean.png',
  handicap: 'fort',
  explication: 'oui',
  taille:32
};

export const Patient_Jeanne: Patient = {
  id: '3',
  nom:"Dupont",
  prenom: "Jeanne",
  dateNaissance:'17/12/49',
  image: '/assets/Image-Patient/Image_Jeanne.png',
  handicap: 'leger',
  explication: 'non',
  taille:40
};

export const Patient_Jean_Pierre: Patient = {
  id: '4',
  nom:"Dupond",
  prenom: "Jean",
  dateNaissance:'18/12/1949',
  image: '/assets/Image-Patient/Image_Jean.png',
  handicap: 'leger',
  explication: 'oui',
  taille:40
};

export const Patient_Jeanne_Marie: Patient = {
  id: '5',
  nom:"Durant",
  prenom: "Jeanne-Marie",
  dateNaissance:"06/07/1937",
  image: '/assets/Image-Patient/Image_Jeanne.png',
  handicap: 'leger',
  explication: 'oui',
  taille:40
};

export const Ergo_Edward: Ergo = {
  id: '1',
  nom:"Edward",
  image: "/assets/Image-Patient/Image_Edward.png",
};

export const PATIENT_LISTE: Patient[] = [
    Patient_Lucienne,
    Patient_Jean,
    Patient_Jeanne,
    Patient_Jean_Pierre,
    Patient_Jeanne_Marie
];

export const ERGO_LISTE: Ergo[] = [
  Ergo_Edward
];
