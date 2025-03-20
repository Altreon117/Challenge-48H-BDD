# Challenge-48H-BDD
Création d'un site pour le Bureau de Développement Durable de Paris Ynov Campus dans le contexte du challenge 48h


# Projet : Site Web du Bureau du Développement Durable (BDD)

## Contexte et Objectif
Durant le Challenge 48h des B1 Informatique, l'objectif est de réaliser un site web dédié à l’association du Bureau du Développement Durable (BDD).
Ce site doit être une plateforme interactive et fonctionnelle permettant aux étudiants de s’inscrire et de participer aux activités du bureau.

Le **Bureau du Développement Durable (BDD)** est une association qui sensibilise au développement durable et à la solidarité étudiante au sein de **Paris Ynov Campus** à travers des activités et événements.

## Fonctionnalités Principales

### Pages Obligatoires
1. **Présentation “Qui sommes-nous ?”**
   - Page d’introduction au BDD, ses objectifs et ses missions.
   
2. **Contact**
   - Formulaire de contact permettant aux étudiants de poser des questions.
   - Informations de contact du bureau (réseaux sociaux, mail, etc.).
   
3. **Actualités**
   - Affichage des anciennes, actuelles et futures activités du bureau.
   - Fonctionnalité permettant aux étudiants de s’inscrire aux activités futures.
   
4. **Connexion (Log in / Sign up)**
   - Interface d’inscription et de connexion pour les étudiants.
   - Système d’authentification permettant d’accéder à certaines fonctionnalités du site.
   
5. **Page Administrateur**
   - Interface réservée aux administrateurs du site.
   - Fonctionnalité permettant de modifier les actualités et de mettre à jour les activités proposées.

### Fonctionnalités après connexion
- **Actualités** : Les utilisateurs connectés peuvent consulter les activités et s’y inscrire.
- **Gestion des événements** : Les administrateurs peuvent ajouter, modifier et supprimer des événements.

## Technologies Utilisées
- **Frontend** : HTML, CSS, JavaScript
- **Backend** : Node.js, Express.js
- **Base de données** : SQLite / MySQL
- **Authentification** : bcrypt pour le hachage des mots de passe
- **API REST** : Express.js pour gérer les requêtes et les routes

## Installation et Exécution

### Prérequis
- Node.js installé sur votre machine
- Un gestionnaire de base de données (SQLite ou MySQL)

### Étapes d’Installation
1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-repo.git
   cd votre-repo
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer la base de données**
   - Vérifier que la base de données est bien configurée.
   - Exécuter les migrations SQL si nécessaire.

4. **Lancer le serveur**
   ```bash
   npm start
   ```

5. **Accéder au site**
   - Ouvrir un navigateur et aller sur : `http://localhost:3000`

## Endpoints API
| Méthode | Endpoint              | Description |
|---------|-----------------------|-------------|
| GET     | /api/evenements       | Récupérer tous les événements |
| POST    | /api/evenements       | Ajouter un nouvel événement (admin uniquement) |
| PUT     | /api/evenements/:id   | Modifier un événement (admin uniquement) |
| DELETE  | /api/evenements/:id   | Supprimer un événement (admin uniquement) |
| POST    | /api/auth/login       | Connexion utilisateur |
| POST    | /api/auth/signup      | Inscription utilisateur |
| GET     | /api/auth/user        | Récupérer les infos de l'utilisateur connecté |

## Bonnes Pratiques
- Utilisation de **bcrypt** pour le hachage des mots de passe.
- Vérification des permissions pour les actions réservées aux administrateurs.
- Validation des données envoyées par les utilisateurs.

## Améliorations Futures
- Mise en place d’un système de notifications pour les nouveaux événements.
- Intégration d’un calendrier interactif pour afficher les activités.
- Ajout d’un espace membre pour gérer ses inscriptions aux événements.

---
**Auteur(s)** : Équipe du Challenge 48h - B1 Informatique


