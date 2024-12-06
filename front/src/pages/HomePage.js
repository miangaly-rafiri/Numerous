import React, { useState } from 'react';
import { createGame, joinGame } from '../api/gameAPI';  
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [existingGameId, setExistingGameId] = useState('');
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    if (!playerName) {
      alert('Veuillez entrer un pseudo');
      return;
    }

    try {
      const response = await createGame();
      setGameId(response.gameId);
      alert(`ID de jeu crée: ${response.gameId}`);
      navigate(`/${response.gameId}`, { state: { playerName } });
    } catch (error) {
      alert(`Erreur de création: ${error.message}`);
    }
  };

  const handleJoinGame = async () => {
    if (!existingGameId || !playerName) {
      alert('Veuillez entrer un ID de jeu et un pseudo');
      return;
    }

    try {
      await joinGame(existingGameId, playerName);
      alert(`Vous avez rejoint le jeu avec l'ID: ${existingGameId}`);
      navigate(`/${existingGameId}`, { state: { playerName } });
    } catch (error) {
      alert(`Erreur lors de la connexion au jeu: ${error.message}`);
    }
  };

  return (
    <div>
      <div>
        <h2>Votre pseudo</h2>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button onClick={handleCreateGame}>Créer le jeu</button>
      </div>

      <div>
        <h2>Rejoindre un jeu existant</h2>
        <input
          type="text"
          placeholder="Game ID"
          value={existingGameId}
          onChange={(e) => setExistingGameId(e.target.value)}
        />
        <button onClick={handleJoinGame}>Rejoindre le jeu</button>
      </div>

      {gameId && (
        <div>
          <p>Jeu créé avec l'ID: {gameId}</p>
          <button onClick={() => navigate(`/${gameId}`, { state: { playerName } })}>
            Aller dans le jeu
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;

