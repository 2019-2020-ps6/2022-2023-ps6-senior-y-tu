import {PatientService} from "../../services/patient.service";
import {ConfigurationService} from "../../services/configuration.service";
import {Patient} from "../../models/personne.model";
import {Configuration} from "../../models/configuration.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PatientConfiguration{
  private readonly idPatient;
  public patient: Patient | undefined;
  public config: Configuration | undefined;

  constructor(private patientService : PatientService,private configurationService : ConfigurationService) {
    this.idPatient = document.cookie.split("=")[1]?.split(";")[0];
    if (this.idPatient != undefined) {
      this.patientService.getPatientsById(this.idPatient);
      this.configurationService.getSelectedConfiguration(this.idPatient);

      this.patientService.patientSelected$.subscribe((p) => {
        this.patient = p;
      })

      this.configurationService.configurationSelected$.subscribe((c) => {
        this.config = c;
      })
    }
  }

  public getConfiguration(): Subject<Configuration>{
    return this.configurationService.configurationSelected$;
  }
}
