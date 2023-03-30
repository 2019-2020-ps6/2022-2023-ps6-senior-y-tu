import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Patient} from "src/models/personne.model";
import { PATIENT_LISTE} from '../mocks/personne-list.mock';
import {Quiz} from "../models/quiz.model";

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private patients: Patient[] = PATIENT_LISTE;

  public patients$: BehaviorSubject<Patient[]> = new BehaviorSubject(PATIENT_LISTE);

  constructor() {}
  addPatient(patient: Patient) {
    patient.id = (this.patients.length+1).toString();
    this.patients.push(patient);
    this.patients$.next(this.patients);
  }

  deletePatient(patient: Patient): void {
    const index = this.patients.indexOf(patient);
    this.patients.splice(index, 1);
    this.patients$.next(this.patients);
  }

  updatePatient(patient: Patient | undefined): void {
    if (!patient) return; // vérifier si le quiz est défini

    const index = this.patients.findIndex(q => q.id == patient.id); // trouver l'index du quiz à mettre à jour
    if (index === -1) return; // vérifier si le quiz a été trouvé

    this.patients[index] = patient; // mettre à jour le quiz dans le tableau
    this.patients$.next(this.patients);

    console.log('Quiz Modifié (QuizService): ', patient);
  }
}
