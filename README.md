# Readme livraison OPS 

# Status de la livraison  
Etape 1 : Fait  
Etape 2 : Fait  
Etape 3 : Commencé mais pas fonctionnel  
Etape 4 : Pas commencé  

# Healthchecks  
Pour le healthcheck coté frontend, on vérifie si la route du frontend au port 4200 (port dans le container du frontend) en localhost est toujours présente toutes les 10 secondes.  
Pour le healthcheck coté backend, on vérifie si la route de api status du backend au port 9428 (port dans le container du backend) en localhost est toujours présente toutes les 10 secondes.  
De plus le service du frontend, fonctionne que si le backend est en vie et donc il est dépendant au service du backend.  

# Explication  

