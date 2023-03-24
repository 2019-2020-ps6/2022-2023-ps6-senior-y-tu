import {Question} from "./question.model";

export interface Quiz {
  id: string;
  nom: string ;
  theme: string;
  image?: string;
  questions: Question[];
}
