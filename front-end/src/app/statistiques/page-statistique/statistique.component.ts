import {Component, Input, OnInit, Output} from "@angular/core";
import {PageStatistique} from "../../../models/page-statistique.model";
import {Router} from "@angular/router";
import {PageSatistiqueService} from "../../../services/page-satistique.service";

@Component({
  selector: 'app-pageStatistique',
  templateUrl: 'statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})

export class PageStatistiqueComponent implements OnInit{
  @Input()
  public statList: PageStatistique[] = [];

  constructor(public pageStatService: PageSatistiqueService) {
    this.pageStatService.pageStat$.subscribe((statList) => {
      this.statList = statList;
    })
  }

  ngOnInit(): void {
  }
}
