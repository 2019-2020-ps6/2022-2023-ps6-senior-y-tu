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
    if (!patientAModifier) return;
    const index = this.patients.findIndex(q => q.id == patientAModifier.id)
    if (index == -1) return ;
    this.patients[index] = patientAModifier;
    this.patients$.next(this.patients);
    console.log('Patient MOdifier(PatientService): ', patientAModifier);
  }
}
