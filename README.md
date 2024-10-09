# Nom du Projet

Le Projet est une plateforme pour les coachs sportifs afin de leur simlpifier la création de séances de sport pour se concentrer sur le contenu.

## Table des Matières

- [Aperçu du projet](#aperçu-du-projet)
- [Technologies](#technologies)
- [Pré-requis](#pré-requis)
- [Installation](#installation)
  - [Backend (Laravel API)](#backend-laravel-api)
  - [Frontend (React)](#frontend-react)

## Aperçu du projet

Ce projet est une application web complète avec une API RESTful développée en Laravel pour le backend, et une interface utilisateur réalisée en React pour le frontend.

## Technologies

- **Backend**: Laravel
- **Frontend**: React
- **Base de données**: MySQL
- **Autres outils**: Composer, NPM

## Pré-requis

Assurez-vous d'avoir les outils suivants installés sur votre machine :

- [PHP >= 8.0](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js >= 14.x](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

## Installation

### Backend (Laravel API)

1. Clonez ce dépôt :

   ```bash
   git clone https://github.com/JohanPires/GeniusTrainer.git
   cd GeniusTrainer/project_back

   ```

2. Installez les dépendances PHP :

   ```bash
   composer install
   ```

3. Configurez la base de données dans le fichier `.env`, par exemple :

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nom_de_la_base
   DB_USERNAME=utilisateur
   DB_PASSWORD=mot_de_passe
   ```

4. Exécutez les migrations pour créer les tables dans la base de données :

   ```bash
   php artisan migrate
   ```

5. Démarrez le serveur Laravel :
   ```bash
   php artisan serve
   ```

### Frontend (React)

1. Accédez au dossier frontend :

   ```bash
   cd ../frontend
   ```

2. Installez les dépendances Node.js :

   ```bash
   npm install
   ```

3. bConfigurez les variables d'environnement pour le frontend dans un fichier `.env`:

   ```env
   REACT_APP_BACK_URL_LARAVEL=http://localhost:8000/
   ```

4. Démarrez l'application React :
   ```bash
   npm start
   ```

Vous pouvez accéder à l'interface utilisateur React sur [http://localhost:3000]
l'API Laravel sur [http://localhost:8000]
