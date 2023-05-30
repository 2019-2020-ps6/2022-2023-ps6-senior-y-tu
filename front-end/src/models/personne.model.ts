import {StatQuiz} from "./stat-quiz.model";
import { Configuration } from "./configuration.model"

export interface Patient {
  id: string;
  nom: string;
  prenom : string;
  dateNaissance: Date;
  image : string;
  idconfiguration: string;
  idstatistiques: string;
}

export interface Ergo {
  id: string;
  nom: string;
  image: string;
}
