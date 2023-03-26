import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private rooter: Router) { }

  ngOnInit(): void { }

  goToHelp() {
    window.addEventListener('keydown', (e) => {
      if(e.key == 'ù' || e.key == '*') {
        this.rooter.navigate(['/page-aide'])
      }
    })
  }

}
