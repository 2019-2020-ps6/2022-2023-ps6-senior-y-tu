import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: "appDeconection",
  templateUrl: "./deconection.component.html",
  styleUrls: ["./deconection.component.scss"]
})


export class DeconectionComponent {
  public constructor(private root: Router) {
  }
  protected gotoaccueil(): void {
    this.root.navigate(["./accueil"]);
  }
}
