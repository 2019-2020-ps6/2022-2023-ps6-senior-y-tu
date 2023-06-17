# Readme livraison OPS 

## Status de la livraison  
Etape 1 : Faite  
Etape 2 : Faite  
Etape 3 : Commencée mais pas fonctionnelle  
Etape 4 : Pas commencée

## Healthchecks  
Pour le healthcheck coté frontend, on vérifie si la route du frontend au port 4200 (port dans le container du frontend) en localhost est toujours présente toutes les 10 secondes.  
Pour le healthcheck coté backend, on vérifie si la route de api status du backend au port 9428 (port dans le container du backend) en localhost est toujours présente toutes les 10 secondes.  
De plus le service du frontend, fonctionne que si le backend est en vie et donc il est dépendant au service du backend.  

## Explication  

Chaque docker file prend une version alpine node de version 16.16.0 (une version stable).  
Puis, on ajoute les paquets nécessaire pour la vérification des routes du backend et front-end ainsi que de modifier les variables d'environnements du fichier de config pour pouvoir changer le domaine et le port grâce aux variables d'environnements ajoutées dans le docker compose (ce paquet est utilisé uniquement par le front-end).  
Ensuite, on copie les données importantes (source du front-end et app et database pour le backend) .
Après, on installe node et nginx qui permettent de transformer tous nos fichiers angular en fichier html, css et javascript.  
Pour le docker compose, on a ajouté 2 services soit le front-end et le backend.  
Ainsi, on construit leur image via le build et on leur spécifie le port, leur variables d'environnements à ajouter et leur nom d'image.  
Puis, on a configuré le healthcheck (comme expliqué dans la partie healthcheck) et on a ajouté le volume pour la database (de nom db-data) pour rendre les données persistantes.
