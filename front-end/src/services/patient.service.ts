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
    if (!patient) return; // vérifier si le patient est défini

    const index = this.patients.findIndex(q => q.id == patient.id); // trouver l'index du quiz à mettre à jour
    if (index === -1) return; // vérifier si le patient a été trouvé
    if (patient.nom == null) patient.nom == this.patients[index].nom;
    if(patient.prenom == null)patient.prenom == this.patients[index].prenom;
    if (patient.dateNaissance == null) patient.dateNaissance == this.patients[index].dateNaissance;
    if(patient.handicap == null)patient.handicap == this.patients[index].handicap;
    if(patient.explication == null)patient.explication == this.patients[index].explication;
    if(patient.taille == null)patient.taille == this.patients[index].taille;

    this.patients[index].nom = patient.nom;


    this.patients[index] = patient; // mettre à jour le patient dans le tableau
    this.patients$.next(this.patients);

    console.log('Patient Modifié (PatientService): ', patient);
  }
  getTaille(patient: Patient) {

  }

  reset(patient: Patient) {

  }
}
