import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Theme} from "../../../models/theme.model";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input()
  theme: Theme | undefined;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  selectQuiz(): void {
    this.quizSelected.emit(true);
  }
}
