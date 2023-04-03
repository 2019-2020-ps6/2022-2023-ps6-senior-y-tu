import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header-patient',
  templateUrl: './headerPatient.component.html',
  styleUrls: ['./headerPatient.component.scss']
})
export class HeaderPatientComponent implements OnInit {
  public nom: String;
  public taille: number | string;

  constructor() {
    let nomTemp = localStorage.getItem("patient-prenom");
    this.nom = (nomTemp == null)? "James" : nomTemp;
    let tailleTemp = localStorage.getItem("patient-taille");
    this.taille = (tailleTemp == null)? 24: tailleTemp;
  }


  ngOnInit(): void {
  }

}
