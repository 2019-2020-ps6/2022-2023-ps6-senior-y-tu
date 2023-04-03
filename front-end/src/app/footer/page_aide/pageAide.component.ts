import {Component, HostListener, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-header-aide',
  templateUrl: './pageAide.component.html',
  styleUrls: ['./pageAide.component.scss']
})
export class PageAideComponent implements OnInit {

  public taille: number | string;
  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    if(e.key == 'Backspace' || e.key == '=' || e.key == '$') {
      this.location.back();
    }
  }

  constructor(private location: Location) {
    let tailleTemp = localStorage.getItem("patient-taille");
    this.taille = (tailleTemp == null)? 24: tailleTemp;
  }

  ngOnInit(): void {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";
    if(handicap == "fort") {
      let img = document.getElementById("imgClavier") as HTMLImageElement;
      img.src = "../../../assets/Clavier2.png";
    }
  }
}
