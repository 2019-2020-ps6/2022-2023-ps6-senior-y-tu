import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { Patient} from "src/models/personne.model";
import { PATIENT_LISTE} from '../mocks/personne-list.mock';
import {StatQuiz} from "../models/stat-quiz.model";
import {HttpClient} from "@angular/common/http";
import {httpOptionsBase, serverUrl} from "../configs/server.config";

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private patients: Patient[] = [];
  private patientsUrl = serverUrl + '/patients'
  private httpOptions = httpOptionsBase;

  public patients$: BehaviorSubject<Patient[]> = new BehaviorSubject(<Patient[]> []);
public patientSelected$ : Subject<Patient> = new Subject<Patient>();
  constructor(private http: HttpClient) {
    this.getPatients();
  }

  getPatients(): void {
    this.http.get<Patient[]>(this.patientsUrl).subscribe((patientsListe) => {
      this.patients = patientsListe;
      this.patients$.next(this.patients);
    });
  }

  getPatientsById (id: string): void {
    this.http.get<Patient>(this.patientsUrl + '/'+ id).subscribe((patient) => {
      this.patientSelected$.next(patient);
    })
  }

  getPatientId (id: string): Observable<Patient> {
    return this.http.get<Patient>(this.patientsUrl + '/' + id);
  }

  retrievePatient(): void {
    this.http.get<Patient[]>(this.patientsUrl).subscribe((patientsList) => {
      this.patients = patientsList;
      this.patients$.next(this.patients);
    });
  }
  addPatient(patient: Patient) : void {
    this.http.post<Patient>(this.patientsUrl, patient, this.httpOptions).subscribe((patientAjouter) => {
      this.retrievePatient()
      this.patientSelected$.next(patientAjouter);
    });
  }

  deletePatient(patient: Patient): void {
    const urlWithId = this.patientsUrl+'/'+patient.id;
    this.http.delete<Patient>(urlWithId, this.httpOptions).subscribe(() => this.retrievePatient());
  }

  updatePatient(idPatient: Patient | undefined, patient: Patient): void {
    if (idPatient != undefined) {
      patient.id = idPatient.id
      if(patient.nom == undefined || patient.nom == ' ' || patient.nom == " ") {patient.nom = idPatient.nom;}
      if(patient.prenom == undefined || patient.prenom == ' ' || patient.prenom == " ") {patient.prenom = idPatient.prenom;}
      if(patient.image == undefined || patient.image == ' ' || patient.image == " ") {patient.image = idPatient.image;}
      if(patient.dateNaissance == undefined) {patient.dateNaissance = idPatient.dateNaissance;}
      console.log("p", patient)
      this.http.put<Patient>(this.patientsUrl + '/' + idPatient.id, patient, this.httpOptions).subscribe(() => this.getPatients());
    }
  }

  /*getStatListe(patientid: string | null): StatQuiz[] | undefined {
    let statListe: StatQuiz[] | undefined = [];
    if (patientid) {
      statListe = this.patients.find(patient => patient.id === patientid)?.idstatistiques;
    }
    return statListe;
  }*/
}
