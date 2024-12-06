const games = {};
const leaderboard = [];

function createGame(req, res) {
  const gameId = Math.random().toString(36).substring(2, 8);  
  const mysteryNumber = Math.floor(Math.random() * 900000) + 100000;

  games[gameId] = { 
    mysteryNumber, 
    players: [], 
  };

  res.status(201).json({ gameId });
}

function joinGame(req, res) {
  const { gameId, playerName } = req.body;  

  if (!games[gameId]) return res.status(404).json({ message: 'Jeu non trouvé' });

  games[gameId].players.push({ name: playerName, guesses: [] });
  
  res.status(200).json({ message: `Vous avez rejoint le jeu : ${playerName}` });
}

function submitGuess(req, res) {
  try {
    const { gameId, playerName, guess } = req.body;

    const game = games[gameId];
    if (!game) {
      return res.status(404).json({ message: 'Jeu non trouvé' });
    }

    if (isNaN(guess)) {
      return res.status(400).json({ message: 'La supposition doit être un nombre valide' });
    }

    const mysteryNumber = game.mysteryNumber; 
    const proximity = Math.abs(mysteryNumber - guess);  
    const feedback = proximity === 0 ? '🏆 Exact!' : proximity < 1000 ? '🔥 Proche!' : '🚀 Loin!';

    const player = game.players.find(p => p.name === playerName);
    if (!player) {
      return res.status(404).json({ message: 'Joueur non trouvé' });
    }

    player.guesses.push({ guess, feedback });

    leaderboard.push({ playerName, attempts: player.guesses.length });

    res.status(200).json({ feedback });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la supposition :", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}


function getLeaderboard(req, res) {
  leaderboard.sort((a, b) => a.attempts - b.attempts);
  res.status(200).json(leaderboard);
}

module.exports = { createGame, joinGame, submitGuess, getLeaderboard };
