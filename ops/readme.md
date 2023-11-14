# Readme livraison OPS 

## Status de la livraison  
Etape 1 : Faite  
Etape 2 : Faite  
Etape 3 : Commencée mais pas fonctionnelle  
Etape 4 : Pas commencée

## Healthchecks  
Pour le healthcheck coté frontend, on vérifie si la route du frontend au port 4200 (port dans le container du frontend) en localhost est toujours présente toutes les 10 secondes.  
Pour le healthcheck coté backend, on vérifie si la route de api status du backend au port 9428 (port dans le container du backend) en localhost est toujours présente toutes les 10 secondes.  
De plus le service du frontend, ne fonctionne que si le backend est en vie et donc il est dépendant au service du backend.  

## Explication  

Chaque docker file prend une version alpine node de version 16.16.0 (une version stable).  
Puis, on ajoute les paquets nécessaires pour la vérification des routes du backend et front-end ainsi que de modifier les variables d'environnements du fichier de config pour pouvoir changer le domaine et le port grâce aux variables d'environnements ajoutées dans le docker compose (ce paquet est utilisé uniquement par le front-end).  
Ensuite, on copie les données importantes (source du front-end et app et database pour le backend).
Après, on installe node et nginx qui permettent de transformer tous nos fichiers angular en fichiers html, css et javascript.  
Pour le docker compose, on a ajouté 2 services à savoir le front-end et le backend.  
Ainsi, on construit leur image via le build et on leur spécifie le port, leur variables d'environnements à ajouter et leurs noms d'image.  
Puis, on a configuré le healthcheck (comme expliqué dans la partie healthcheck) et on a ajouté le volume pour la database (de nom db-data) pour rendre les données persistantes.  
Pour la partie test, on ajoute un nouveau dockerfile pour executer le playwright, puisqu'il a besoin seulement du noyau alpine car le node est inclus dans l'image du playwright importé après.  
Dans le docker-compose, on ajoute le service playwright ainsi que dans le build de front et playwright, on ajoute une ligne dockerfile pour préciser le dockerfile à éxécuter pour construire l'image.  

## Utilisateur

Le backend est avec l'utilisateur node et donc il y a que l'utilisateur node qui pourra éxécuter les données.  
Le frontend est avec l'utilisateur nginx qui est ajouté lors du deuxième import (soit nginx) donc les fichiers compilés seront avec les droits uniquement pour l'utilsateur nginx.  
Le playwright est avec l'utilisateur playwrightJammy (nom du noyau ajouté), et donc comme précedemment, les fichiers du site et des tests sont accessibles uniquement pour playwrightJammy.  
