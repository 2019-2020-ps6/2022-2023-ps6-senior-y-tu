import {Component, OnInit, Input} from "@angular/core";
import { Ergo } from "src/models/personne.model";

@Component({
  selector: 'app-ergo',
  templateUrl: 'ergo.component.html',
  styleUrls: ['./ergo.component.scss']
})

export class ErgoComponent implements OnInit{

  @Input()
  ergo: Ergo | undefined ;

  constructor() {}

  ngOnInit(): void {}
}
