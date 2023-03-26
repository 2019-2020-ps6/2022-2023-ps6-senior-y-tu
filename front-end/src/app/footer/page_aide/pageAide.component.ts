import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-header-aide',
  templateUrl: './pageAide.component.html',
  styleUrls: ['./pageAide.component.scss']
})
export class PageAideComponent implements OnInit {

  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  retour(): void {
    window.addEventListener('keydown', (e) => {
      if(e.key == 'Backspace' || e.key == '=' || e.key == '$') {
        this.location.back();
      }
    })
  }

}
