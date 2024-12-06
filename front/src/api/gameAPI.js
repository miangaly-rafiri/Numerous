const API_URL = 'http://localhost:5001/api/game';

// Créé le jeu
export const createGame = async () => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Erreur de création du jeu: ${response.statusText}`);
  }
  return response.json();
};

// Rejoindre le jeu
export const joinGame = async (gameId, playerName, teamName) => {
  const response = await fetch(`${API_URL}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId, playerName, teamName }),
  });

  if (!response.ok) {
    throw new Error(`Erreur pour rejoindre le jeu : ${response.statusText}`);
  }
  return response.json();
};

// Soumettre une supposition 
export const submitGuess = async (gameId, playerName, guess) => {
  try {
    const response = await fetch(`${API_URL}/guess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, playerName, guess }),
    });

    if (!response.ok) {
      throw new Error(`Échec de l'ajout de la supposition : ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la supposition :", error);
    throw error; 
  }
};

// Récupérer le classement des scores
export const fetchLeaderboard = async () => {
  try {
    const response = await fetch(`${API_URL}/leaderboard`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Échec de la récupération du score : ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération du score :", error);
    throw error; 
  }
};

// Fonction pour créer une équipe 
export const createTeam = async (gameId, playerName, teamName) => {
  const response = await fetch(`${API_URL}/team/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId, playerName, teamName }),
  });

  if (!response.ok) {
    throw new Error(`Erreur de création d'équipe : ${response.statusText}`);
  }
  return response.json();
};

// Fonction pour rejoindre une équipe
export const joinTeam = async (gameId, playerName, teamName) => {
  const response = await fetch(`${API_URL}/team/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId, playerName, teamName }),
  });

  if (!response.ok) {
    throw new Error(`Erreur pour rejoindre l'équipe : ${response.statusText}`);
  }
  return response.json();
};
