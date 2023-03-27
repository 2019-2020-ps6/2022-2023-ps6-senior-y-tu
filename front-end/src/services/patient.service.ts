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
    this.patients.push(patient);
    this.patients$.next(this.patients);
  }

  deletePatient(patient: Patient): void {
    const index = this.patients.indexOf(patient);
    this.patients.splice(index, 1);
    this.patients$.next(this.patients);
  }
}
