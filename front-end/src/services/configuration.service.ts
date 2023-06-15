import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Configuration} from "../models/configuration.model";
import {Patient} from "../models/personne.model";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private configurations: Configuration[] = [];

  public configurations$: BehaviorSubject<Configuration[]> = new BehaviorSubject(<Configuration[]> []);

  public configurationSelected$: Subject<Configuration> = new Subject();

  private configurationUrl = serverUrl + '/configuration';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveConfiguration();
  }

  retrieveConfiguration(): void {
    this.http.get<Configuration[]>(this.configurationUrl).subscribe((configurationList) => {
      this.configurations = configurationList;
      this.configurations$.next(this.configurations);
    });
  }

  addConfiguration(configuration: Configuration): void {
    this.http.post<Configuration>(this.configurationUrl, configuration, this.httpOptions).subscribe(() => this.retrieveConfiguration());
  }

  getConfigId(idPatient : string){
    return this.http.get<Configuration>(this.configurationUrl+'/'+idPatient)
  }

  getSelectedConfiguration(userId: string): void {
    const urlWithId = this.configurationUrl + '/' + userId;
    this.http.get<Configuration>(urlWithId).subscribe((user) => {
      this.configurationSelected$.next(user);
    });
  }

  updateConfiguration(confiOrigine: Configuration | undefined, config: Configuration): void {
    console.log("je suis dans update configuration");
    console.log(this.configurationUrl+'/'+config.idPatient)
    if (confiOrigine != undefined) {
      config.id = confiOrigine.id;
      config.police = confiOrigine.police;
      config.souris = confiOrigine.souris;
      config.explication = confiOrigine.explication;
      config.handicap = confiOrigine.handicap;
      console.log("je suis dans config et je vais envoyer cette info", config)
      this.http.put<Configuration>(this.configurationUrl + '/' + config.idPatient, config, this.httpOptions).subscribe(() => this.retrieveConfiguration());
    }
  }

  deleteConfiguration(configuration: Configuration): void {
    const urlWithId = this.configurationUrl + '/' + configuration;
    this.http.delete<Configuration>(urlWithId, this.httpOptions).subscribe(() => this.retrieveConfiguration());
  }
}
