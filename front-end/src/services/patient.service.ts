import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Patient} from "src/models/personne.model";
import { PATIENT_LISTE} from '../mocks/personne-list.mock';

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

  updatePatient(patientAModifier: Patient | undefined, patient: Patient | undefined): void {
    if (!patientAModifier) return; // vérifier si le patient est défini
    console.log('patients; ',this.patients);

    const index = this.patients.findIndex(q => q.id == patientAModifier.id); // trouver l'index du patient à mettre à jour
    if (index === -1) return; // vérifier si le quiz a été trouvé
    console.log('patient; ',patient);

    if (patient) {
      this.patients[index] = patient;
    } // mettre à jour le patient dans le tableau
    this.patients$.next(this.patients);

    console.log('Patient Modifié (PatientService): ', patient);
  }
}
