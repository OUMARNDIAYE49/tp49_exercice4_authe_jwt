# Sécurisation d'une API avec Express.js

## Description
Ce projet est une API simple créée avec **Express.js**. Il inclut des mesures de sécurité telles que :
- Sécurisation avec **Helmet** pour protéger contre les vulnérabilités courantes.
- Limitation du taux de requêtes avec **express-rate-limit** pour prévenir les attaques DoS.
- Configuration de **CORS** pour contrôler les accès provenant de certains domaines.

## Prérequis
- **Node.js** installé sur votre machine.

## Installation

1. Clonez le dépôt ou téléchargez les fichiers.
  
```bash
    git clone https://github.com/OUMARNDIAYE49/tp49_exercice2.git
```
2. Naviguez dans le répertoire du projet et exécutez la commande suivante pour installer les dépendances :

```bash
npm install
```

2. Pour lancer 
```bash
  npm start
```

## Endpoints

1. GET /api/hello

    Description : Retourne un message de bienvenue.
    Réponse :

    json
    { "message": "Hello world" }

2. GET /api/private-data (Route sécurisée)

    Description : Retourne des données privées, accès restreint par clé API.
    Headers requis : x-api-key: votre-api-key-secrete
    Réponse (clé valide) :

    json

    { "message": "Voici vos données privées" }

    Réponse (clé invalide ou absente) :

    json

    { "message": "Accès interdit. Clé API manquante ou invalide." }