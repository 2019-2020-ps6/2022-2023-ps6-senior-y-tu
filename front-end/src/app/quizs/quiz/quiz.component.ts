
import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {Tuple} from "../../autre/Tuple";
import {ThemeService} from "../../../services/theme.service";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {
  lien : string = "";
  lienTuple: Tuple = new Tuple("","");

  @Input()
  options : any;

  @Input()
  quiz: Quiz | undefined;

  @Input()
  color: boolean = false;

  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();


  themeName: string | undefined = "";

  constructor(private themeService: ThemeService) {
    const id = this.quiz?.id;
    this.lien = "/commencer-quiz/" + id;
    this.lienTuple = new Tuple(this.lien, undefined);
    this.themeName = themeService.getThemeById(this.quiz?.themeId)?.nomTheme;
  }

  ngOnInit(): void {

  }

  deletedQuiz(){
    this.quizDeleted.emit(this.quiz);
  }

  //selectQuiz(): void {
  //  this.quizSelected.emit(true);
  //}
}
