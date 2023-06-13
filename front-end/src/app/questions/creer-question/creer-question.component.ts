import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, AbstractControl} from '@angular/forms';
import {Question, Reponse} from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Tuple} from "../../autre/Tuple";

@Component({
  selector: 'app-creer-question',
  templateUrl: './creer-question.component.html',
  styleUrls: ['./creer-question.component.scss']
})
export class CreerQuestionComponent implements  OnInit{

  @Input()
  quiz: Quiz | undefined

  public lienQuestionListe: string | undefined;
  protected lienQuestionListeTuple = new Tuple('','');

  private isSend = false;

  public questionForm: FormGroup;
  constructor( public formBuilder: FormBuilder, public quizService: QuizService, private route: ActivatedRoute, private router : Router) {

    this.questionForm = this.formBuilder.group({
      intitule: [''],
      reponses: this.formBuilder.array([]),
      img: [''],
      explication: [''],
    });
    for (let i= 0; i < 4; i++) {
      this.addReponse();
    }
  }

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizService.getQuizById(quizId).subscribe((quiz) => {
        this.quiz = quiz;
      });
      this.lienQuestionListe = "/quiz/" + quizId + "/question-liste";
      this.lienQuestionListeTuple = new Tuple(this.lienQuestionListe, undefined);

    }
  }


  get reponses(): FormArray {
    return this.questionForm.get('reponses') as FormArray;
  }

  onCreer(valeur : any) {

    console.log('Valeur du formulaire: ', valeur)
    console.log('valeur explication: ', valeur.explication)

    const question: Question = {
      id: valeur.id,
      intitule: valeur.intitule,
      image: valeur.img,
      explication: valeur.explication,
      quizId: valeur.quizId
    }
    this.quizService.addQuestion(question, this.quiz);
    //console.log('Question Ajoutée: ', question);
    this.quizService.questionSelected$.subscribe((question) => {
      this.onCreerReponse(question, valeur);
    });



  }

  onCreerReponse(question : Question, valeur : any){
    const idQuestion = question.id;
    this.isSend = true;
    let lres: AbstractControl | undefined = this.reponses.controls.at(3)
    let lreponse : Reponse| undefined;
    if(lres != undefined) {
      lreponse = {
        valeur: lres.get('valeur')?.value,
        estCorrect: lres.get('estCorrect')?.value,
        questionId: idQuestion
      };
    }

    this.reponses.controls.forEach((reponse: AbstractControl) => {
      this.isSend = false;
      const rep: Reponse = {
        valeur: reponse.get('valeur')?.value,
        estCorrect: reponse.get('estCorrect')?.value,
        questionId: idQuestion
      };
      this.quizService.addReponse(rep, this.quiz);
    });

    let reponsesCreees = this.quizService.reponseSelected$.subscribe((reponse) => {
      if(lreponse?.valeur == reponse.valeur){
        this.router.navigate(['/quiz/' + this.quiz?.id + '/question-liste']);
      }
    });

  }

  ajouterQuestion(event: Event) {
    const valeur = this.questionForm.getRawValue();
    this.onCreer(valeur);
  }
/**
  validerQuiz(event: Event){
    event.preventDefault();
    const valeur = this.questionForm.getRawValue();
    this.onCreer(valeur);
    this.router.navigate(['/mes-quizs']);
  }
 */

  addReponse(): void {
    this.reponses.push(this.createReponse());
  }

  private createReponse() {
    return this.formBuilder.group({
      id: [''],
      valeur: [''],
      estCorrect: [false]
    });
  }

  retour(){
    if(!this.quiz?.id) return;
    let nbQuestions ;
    this.quizService.getQuestionsByQuizId(this.quiz.id).subscribe((questions) => {
      nbQuestions = questions.length;
      if(nbQuestions == 0 ){
        this.router.navigate(['/mes-quizs']);
      }
      else{
        this.router.navigate(['/quiz/' + this.quiz?.id + '/question-liste']);
      }
    });

  }
}
