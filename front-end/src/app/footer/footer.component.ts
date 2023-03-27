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
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = " ";
    window.addEventListener('keydown', (e) => {
      if (handicap == "leger" && (e.key == 'u' || e.key == '*')) {
          this.rooter.navigate(['/page-aide'])
        }
      else if(e.key == '_' || e.key == 'ç' || e.key == 'u' || e.key == 'i') {
        this.rooter.navigate(['/page-aide']);
      }
    })
  }

}
