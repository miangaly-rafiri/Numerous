const games = {};
const leaderboard = [];

function createGame(req, res) {
  const gameId = Math.random().toString(36).substring(2, 8);
  const mysteryNumber = Math.floor(Math.random() * 900000) + 100000;

  // Crée un jeu avec mysteryNumber, players et teams
  games[gameId] = { 
    mysteryNumber, 
    players: [], 
    teams: {},  // Ajoute l'objet teams pour gérer les équipes
  };

  res.status(201).json({ gameId });
}

function joinGame(req, res) {
  const { gameId, playerName, teamName } = req.body; 
  if (!games[gameId]) return res.status(404).json({ message: 'Jeu n\'est pas trouvé' });

  // Vérification de l'équip si ça existe déjà, sinon on l'a créé
  if (teamName && !games[gameId].teams[teamName]) {
    games[gameId].teams[teamName] = []; 
  }

  // Vérifier si le joueur/euse est déjà dans une équipe
  if (teamName && games[gameId].teams[teamName]) {
    games[gameId].teams[teamName].push(playerName);
  }

  games[gameId].players.push({ name: playerName, guesses: [], team: teamName });
  res.status(200).json({ message: `Vous avez rejoint le jeu ${teamName ? 'en tant que membre de l\'équipe ' + teamName : ''}` });
}


function submitGuess(req, res) {
  const { gameId, playerName, guess } = req.body;
  const game = games[gameId];
  if (!game) return res.status(404).json({ message: 'Erreur pour trouver le jeu' });

  const proximity = Math.abs(game.mysteryNumber - guess);
  const feedback = proximity === 0 ? '🏆 Exact!' : proximity < 1000 ? '🔥 Proche!' : '🚀 Loin!';

  const player = game.players.find(p => p.name === playerName);
  if (player) player.guesses.push({ guess, feedback });

  leaderboard.push({ playerName, attempts: player.guesses.length });

  // Envoyer le feedback à tous les membres de l'équipe
  if (player.team) {
    const teamMembers = game.teams[player.team] || [];
    teamMembers.forEach(member => {
      // Vous pouvez utiliser Socket.io pour envoyer les résultats à chaque membre de l'équipe
      socket.emit('teamFeedback', { playerName, feedback, team: player.team });
    });
  }

  res.status(200).json({ feedback });
}

function getLeaderboard(req, res) {
  leaderboard.sort((a, b) => a.attempts - b.attempts);
  res.status(200).json(leaderboard);
}


module.exports = { createGame, joinGame, submitGuess, getLeaderboard };
