import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Patient} from "src/models/patient.model";
import { PATIENT_LISTE, ERGO_LISTE} from '../mocks/patient-list.mock';


@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private patients: Patient[] = PATIENT_LISTE;
  private ergos: Patient[] = ERGO_LISTE;

  public patients$: BehaviorSubject<Patient[]> = new BehaviorSubject(PATIENT_LISTE);
  public ergos$: BehaviorSubject<Patient[]> = new BehaviorSubject(ERGO_LISTE);
  addPatient(patient: Patient) {
    PATIENT_LISTE.push(patient);
  }

  addErgo(ergo: Patient) {
    ERGO_LISTE.push(ergo);
  }
}
