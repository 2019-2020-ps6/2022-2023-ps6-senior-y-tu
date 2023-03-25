import {Ergo} from "../models/personne.model";
import {ERGO_LISTE} from "../mocks/personne-list.mock";
import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ErgoService {
  private ergos: Ergo[] = ERGO_LISTE;
  public ergos$: BehaviorSubject<Ergo[]> = new BehaviorSubject(ERGO_LISTE);

  constructor() {}

  addErgo(ergo: Ergo) {
    this.ergos.push(ergo);
  }
}
