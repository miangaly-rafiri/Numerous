# Numerous
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



## Utilisation

1. Ouvrez deux terminaux : un pour le backend et un pour le frontend.
2. Lancez les deux serveurs comme indiqué ci-dessus.
3. Accédez à l'application depuis votre navigateur à l'adresse : `http://localhost:3000`

## TEST API : via Postman