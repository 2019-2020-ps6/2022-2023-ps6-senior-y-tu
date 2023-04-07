import {Patient, Ergo} from '../models/personne.model';

export const Patient_Lucienne: Patient = {
    id: '1',
    nom:"De La Mer",
    prenom: "Lucienne",
    dateNaissance:new Date(1946-3-14),
    image: '/assets/Image-Patient/Image_Lucienne.png',
    handicap: 'leger',
    explication: 'oui',
    taille:40,
    souris:'oui'
};

export const Patient_Jean: Patient = {
  id: '2',
  nom:"Bois",
  prenom: "Jean",
  dateNaissance:new Date(1950-7-9),
  image: '/assets/Image-Patient/Image_Jean.png',
  handicap: 'fort',
  explication: 'non',
  taille:32,
  souris:'non'
};

export const Patient_Jeanne: Patient = {
  id: '3',
  nom:"Dupont",
  prenom: "Jeanne",
  dateNaissance:new Date(1949-12-17),
  image: '/assets/Image-Patient/Image_Jeanne.png',
  handicap: 'leger',
  explication: 'oui',
  taille:40,
  souris:'non'
};

export const Patient_Jean_Pierre: Patient = {
  id: '4',
  nom:"Dupond",
  prenom: "Jean",
  dateNaissance:new Date(1949-12-18),
  image: '/assets/Image-Patient/Image_Jean.png',
  handicap: 'leger',
  explication: 'oui',
  taille:40,
  souris:'oui'
};

export const Patient_Jeanne_Marie: Patient = {
  id: '5',
  nom:"Durant",
  prenom: "Jeanne-Marie",
  dateNaissance:new Date(1937-7-6),
  image: '/assets/Image-Patient/Image_Jeanne.png',
  handicap: 'leger',
  explication: 'oui',
  taille:40,
  souris:'non'
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
