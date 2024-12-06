# Numerous: Jeu Multijoueurs

## Installation

### Prérequis
- [Node.js]

### 2. Backend
#### a. Naviguez dans le dossier backend
```bash
cd backend
```

#### b. Installez les dépendances
```bash
 npm install socket.io / express/ cors/ nodemon 
npm install
```

#### c. Démarrez le serveur
```bash
npm start
```

Le serveur sera accessible à l'adresse : `http://localhost:5000`

### 3. Frontend
#### a. Naviguez dans le dossier frontend
```bash
cd ../frontend
si ça marche : 
npx create-react-app front --legacy-peer-deps

sinon : 
npx create-react-app front --force

insisté sur npm :  npx create-react-app front --use-npm --legacy-peer-deps
ensuite : cd front/
puis : npm install react@18 react-dom@18
et à la fin : npm install @testing-library/jest-dom @testing-library/react @testing-library/user-event web-vitals


```

#### b. Installez les dépendances
```bash
npm install socket.io-client
npm install
```

#### c. Démarrez l'application React
```bash
npm start
```

Le frontend sera accessible à l'adresse : `http://localhost:3000`

---

## Utilisation

1. Ouvrez deux terminaux : un pour le backend et un pour le frontend.
2. Lancez les deux serveurs comme indiqué ci-dessus.
3. Accédez à l'application depuis votre navigateur à l'adresse : `http://localhost:3000`

---

## Fonctionnement des fonctionnalités

### 1. Gestion des parties
- **Créer une partie** : Un ID unique est généré et partagé avec les autres joueurs.
- **Rejoindre une partie** : Saisissez l'ID pour rejoindre une partie existante.

### 2. Feedback des réponses
- Les réponses des joueurs sont comparées au nombre mystère, et un indicateur est renvoyé :
  - 🎉 Exact!
  - 🔥 Proche!
  - ❄️ Loin!

### 3. Leaderboard
- Classement en temps réel des joueurs basé sur le nombre de tentatives et leur précision.

### 4. Collaboration
- Les joueurs peuvent inviter d'autres joueurs pour former une équipe.
- Les réponses des membres de l'équipe sont visibles entre eux.

---

## Développement
- **Backend** : Node.js, Express
- **Frontend** : React, Axios pour les appels API

---

## Améliorations futures
- Ajouter des notifications en temps réel avec WebSocket.
- Ajouter un mode solo pour pratiquer.
- Améliorer l'interface utilisateur avec des animations et des thèmes.

---

## Aide
Si vous rencontrez des problèmes, veuillez ouvrir une issue sur le dépôt GitHub.

