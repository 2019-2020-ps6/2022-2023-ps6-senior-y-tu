import {Patient} from '../models/patient.model';

export const Patient_Lucienne: Patient = {
    id: '1',
    prenom: "Lucienne",
    image: '/assets/Image-Patient/Image_Lucienne.png'
};

export const Patient_Jean: Patient = {
  id: '2',
  prenom: "Jean",
  image: '/assets/Image-Patient/Image_Jean.png'
};

export const Patient_Jeanne: Patient = {
  id: '3',
  prenom: "Jeanne",
  image: '/assets/Image-Patient/Image_Jeanne.png'
};

export const Patient_Jean_Pierre: Patient = {
  id: '4',
  prenom: "Jean",
  image: '/assets/Image-Patient/Image_Jean.png'
};

export const Patient_Jeanne_Marie: Patient = {
  id: '5',
  prenom: "Jeanne-Marie",
  image: '/assets/Image-Patient/Image_Jeanne.png'
};

export const Ergo_Edward: Patient = {
  id: '1',
  prenom: "Edward",
  image: "/assets/Image-Patient/Image_Edward.png"
};

export const PATIENT_LISTE: Patient[] = [
    Patient_Lucienne,
    Patient_Jean,
    Patient_Jeanne,
    Patient_Jean_Pierre,
    Patient_Jeanne_Marie
];

export const ERGO_LISTE: Patient[] = [
  Ergo_Edward
];
