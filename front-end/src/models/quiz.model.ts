import {Question} from "./question.model";

export interface Quiz {
  nom: string ;
  theme: string;
  image?: string;
  questions: Question[];
}
