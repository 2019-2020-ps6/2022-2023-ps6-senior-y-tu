import { Injectable} from "@angular/core";
import { BehaviorSubject} from "rxjs";
import {PageStatistique} from "../models/page-statistique.model";
import {STAT_LIST} from "../mocks/page-statistique.mock";

@Injectable({
  providedIn: 'root'
})

export class PageSatistiqueService {
  private pageStat: PageStatistique[] = STAT_LIST;

  public pageStat$: BehaviorSubject<PageStatistique[]> = new BehaviorSubject(STAT_LIST);

  constructor() {}

}
