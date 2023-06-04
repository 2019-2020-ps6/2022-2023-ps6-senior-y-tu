import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Configuration} from "../models/configuration.model";

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
    console.log("je suis dans le service add configuration");
    this.http.post<Configuration>(this.configurationUrl, configuration, this.httpOptions).subscribe(() => this.retrieveConfiguration());
  }

  setSelectedConfiguration(userId: string): void {
    const urlWithId = this.configurationUrl + '/' + userId;
    this.http.get<Configuration>(urlWithId).subscribe((user) => {
      this.configurationSelected$.next(user);
    });
  }

  deleteConfiguration(configuration: Configuration): void {
    const urlWithId = this.configurationUrl + '/' + configuration;
    this.http.delete<Configuration>(urlWithId, this.httpOptions).subscribe(() => this.retrieveConfiguration());
  }
}
