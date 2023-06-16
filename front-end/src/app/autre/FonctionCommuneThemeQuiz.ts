import {Router} from "@angular/router";
import {
  Handicap_Fort_Bas, Handicap_Fort_Droite,
  Handicap_Fort_Entree, Handicap_Fort_Gauche, Handicap_Fort_Haut,
  Handicap_Leger_Bas,
  Handicap_Leger_Droite,
  Handicap_Leger_Entree,
  Handicap_Leger_Gauche,
  Handicapt_Leger_Haut
} from "../../enums/enumPatient";

export class FonctionCommuneThemeQuiz {

  /**
   * Fonction pour traiter le clavier du patient Leger
   * @param e La touche du clavier
   * @param nombreCaseLargeur Le nombre de case dans la fenetre
   * @param buttonSelected Le bouton sélectionner
   * @param root Le router pour se déplacer
   * @param vers La page où on doit aller
   * @param param Les paramètre à ajouter vers où on doit aller
   * @return Le nouveau bouton selectionner
   */
  public static patientLeger(e: KeyboardEvent, nombreCaseLargeur: number, buttonSelected: number, root : Router, vers: string, param: string) : number {
    if(e.key == Handicap_Leger_Entree.ENTREE || e.key == Handicap_Leger_Entree.ESPACE)
      FonctionCommuneThemeQuiz.goToEnter(root, vers, param);
    else if(e.key == Handicapt_Leger_Haut.FLECHE_HAUT)
      return this.switchButton(-1 * nombreCaseLargeur, buttonSelected);
    else if (e.key == Handicap_Leger_Droite.FLECHE_DROITE)
      return this.switchButton(1, buttonSelected);
    else if (e.key == Handicap_Leger_Gauche.FLECHE_GAUCHE)
      return this.switchButton(-1, buttonSelected);
    else if(e.key == Handicap_Leger_Bas.FLECHE_BAS)
      return this.switchButton(nombreCaseLargeur, buttonSelected);
    else {
      this.ajouterAutreTouche(e);
      return buttonSelected;
    }
    return 1;
  }

  /**
   * Fonction pour traiter le clavier du patient Fort
   * @param e La touche du clavier
   * @param nombreCaseLargeur Le nombre de case dans la fenetre
   * @param buttonSelected Le bouton sélectionner
   * @param root Le router pour se déplacer
   * @param vers La page où on doit aller
   * @param param Les paramètre à ajouter vers où on doit aller
   * @return Le nouveau bouton selectionner
   */
  public static patientFort(e: KeyboardEvent, nombreCaseLargeur: number, buttonSelected: number, root : Router, vers: string, param: string) : number {
    if (e.key == Handicap_Fort_Entree.ESPACE) FonctionCommuneThemeQuiz.goToEnter(root, vers, param);
    if (e.key == Handicap_Fort_Haut.T || e.key == Handicap_Fort_Haut.E || e.key == Handicap_Fort_Haut.APPOSTROPHE
      || e.key == Handicap_Fort_Haut.MOINS || e.key == Handicap_Fort_Haut.PARENTHESE_OUVERTE || e.key == Handicap_Fort_Haut.R)
      return this.switchButton(-1*nombreCaseLargeur, buttonSelected);

    else if (e.key == Handicap_Fort_Gauche.A || e.key == Handicap_Fort_Gauche.Z || e.key == Handicap_Fort_Gauche.Q
      || e.key == Handicap_Fort_Gauche.S || e.key == Handicap_Fort_Gauche.W || e.key == Handicap_Fort_Gauche.X)
      return  this.switchButton(-1, buttonSelected);

    else if (e.key == Handicap_Fort_Bas.H || e.key == Handicap_Fort_Bas.J || e.key == Handicap_Fort_Bas.B
      || e.key == Handicap_Fort_Bas.N || e.key == Handicap_Fort_Bas.VIRGULE)
      return this.switchButton(nombreCaseLargeur, buttonSelected);

    else if (e.key == Handicap_Fort_Droite.O || e.key == Handicap_Fort_Droite.P || e.key == Handicap_Fort_Droite.L
      || e.key == Handicap_Fort_Droite.M || e.key == Handicap_Fort_Droite.POINT_EXCLAMATION || e.key == Handicap_Fort_Droite.DOUBLE_POINT)
      return this.switchButton(1, buttonSelected);

    else {
      this.ajouterAutreTouche(e);
      return buttonSelected;
    }
  }


  /**
   * Fonction pour switcher la couleur de deux boutons
   * @param deplacementPage Le nombre de case dans une page
   * @param buttonSelected Le bouton selectionner
   * @return le nouveau bouton selectionner
   */
  private static switchButton(deplacementPage : number, buttonSelected : number) : number {
    let buttons = document.getElementsByClassName("button-card") as unknown as HTMLButtonElement[];
    let ancienBoutonSelection = buttons[buttonSelected] as HTMLButtonElement;
    let newBoutonSelection = null;
    if (deplacementPage < 0 && buttonSelected + deplacementPage >= 1 ||
      deplacementPage > 0 && buttonSelected + deplacementPage < buttons.length)
      newBoutonSelection = buttons[buttonSelected + deplacementPage] as HTMLButtonElement;

    if (newBoutonSelection != null) {
      buttonSelected += deplacementPage;
      let colorAncienBoutonSelection = ancienBoutonSelection.style.backgroundColor;
      ancienBoutonSelection.style.backgroundColor = newBoutonSelection.style.backgroundColor;
      newBoutonSelection.style.backgroundColor = colorAncienBoutonSelection;
    }
    return buttonSelected
  }

  /**
   * Fonction pour changer de page
   * @param rooter router permettant de se déplacer dans les pages
   * @param vers vers la page où on doit aller
   * @param param les paramètres à aller pour la page
   */
  public static goToEnter(rooter : Router, vers: string, param: string) : void {
    rooter.navigate([vers, param]);
  }

  /**
   * Fonction pour les statistique d'un patient sur le clavier
   * @param e La touche du clavier appuyé
   */
  static ajouterAutreTouche(e: KeyboardEvent) {
    let newChaine: string = "";
    let ancienneChaine = localStorage.getItem("autresTouchesAppuyer");
    if (ancienneChaine == null)
      localStorage.setItem("autresTouchesAppuyer", e.key);
    else if (e.key >= "a" && e.key <= "z"){
      let n: number = ancienneChaine.length;
      let i = 0;
      for (; i < n; i++) {
        if (ancienneChaine.charAt(i) < e.key)
          newChaine += ancienneChaine.charAt(i);
        else
          break;
      }
      newChaine += e.key;
      for (; i < n; i++)
        newChaine += ancienneChaine.charAt(i);
      localStorage.setItem("autresTouchesAppuyer", newChaine);
    }
  }

  /**
   * Fonction pour changer le nombre de case de la page
   * @param width La taille de la page
   */
  public static changeDeplacementBouton(width: number): number {
    let temp = (width - 603) / 602 + 1;

    if (temp >= 3)
      return 3;
    else if (temp >= 2)
      return 2;
    else
      return 1;
  }

}
