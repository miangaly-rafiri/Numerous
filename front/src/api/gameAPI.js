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

// supposé le chifres 
export const submitGuess = async (gameId, playerName, guess) => {
  try {
    const response = await fetch(`${API_URL}${gameId}/guess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  playerName, guess }),  
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


