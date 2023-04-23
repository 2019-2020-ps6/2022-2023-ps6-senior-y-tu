import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-patient',
  templateUrl: './headerPatient.component.html',
  styleUrls: ['./headerPatient.component.scss']
})
export class HeaderPatientComponent implements OnInit {
  public nom: String;
  protected lienRetour = "/accueil";

  constructor() {
    let nomTemp = localStorage.getItem("patient-prenom");
    this.nom = (nomTemp == null)? "James" : nomTemp;
  }

  ngOnInit(): void {
  }

}
