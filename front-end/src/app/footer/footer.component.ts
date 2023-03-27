import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent{
  constructor(private rooter: Router) { }

  @HostListener("document:keydown", ["$event"])
  onkeydown(e: KeyboardEvent) {
    let handicap = localStorage.getItem("patient-handicap");
    if(handicap == null) handicap = " ";
    if (handicap == "leger" && (e.key == 'ù' || e.key == '*')) {
      this.rooter.navigate(['/page-aide'])
    }
    else if(e.key == '_' || e.key == 'ç' || e.key == 'u' || e.key == 'i') {
      this.rooter.navigate(['/page-aide']);
    }
  }
}
