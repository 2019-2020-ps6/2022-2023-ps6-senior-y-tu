import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Theme} from "../../../models/theme.model";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  public taille: number | string;

  @Input()
  theme: Theme | undefined;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    let tailleTemp = localStorage.getItem("patient-taille");
    this.taille = (tailleTemp == null)? 24: tailleTemp;
    console.log(this.taille+"de theme list");
  }

  ngOnInit(): void {
  }

  selectQuiz(): void {
    this.quizSelected.emit(true);
  }
}
