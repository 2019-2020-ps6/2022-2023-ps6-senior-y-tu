import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-page-aide',
  templateUrl: './pageAide.component.html',
  styleUrls: ['./pageAide.component.scss']
})

export class PageAideComponent implements AfterViewInit {

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    if(e.key == 'Backspace' || e.key == '=' || e.key == '$') {
      this.location.back();
    }
  }

  constructor(private location: Location) {}

  ngAfterViewInit() {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = "fort";
    if(handicap == "fort") {
      let img = document.getElementById("imageClavier") as HTMLImageElement;
      img.src = "../../../assets/Clavier2.png";
    }
  }
}
