import {PageStatistique} from "../models/page-statistique.model";
import {Patient} from "../models/personne.model";
import {
  Patient_Jean,
  Patient_Jean_Pierre,
  Patient_Jeanne,
  Patient_Jeanne_Marie,
  Patient_Lucienne
} from "./personne-list.mock";

export const PageStatistique_Lucienne: PageStatistique = {
  nomPatient: "Lucienne",
  id: "1",
  score: "1/2",
  temps: "1 min 27s",
  handicap: "leger",
  nombreClick: "3",
  souris: "oui",
  police: 40,
  image: '/assets/Image-Patient/Image_Lucienne.png'
}

export const STAT_LIST: PageStatistique[] = [
  PageStatistique_Lucienne
];
