import React, { useState, useEffect } from 'react';
import { createGame, joinGame, submitGuess } from '../api/gameAPI';
import socket from '../api/socket';

function Game() {
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on('playerJoined', (data) => {
      alert(`${data.playerName} joined the game!`);
      setPlayers((prev) => [...prev, data.playerName]);
    });

    socket.on('guessUpdate', (data) => {
      alert(`New guess from ${data.playerName}: ${data.guess}`);
    });

    return () => {
      socket.off('playerJoined');
      socket.off('guessUpdate');
    };
  }, []);

  const handleCreateGame = async () => {
    const response = await createGame();
    setGameId(response.gameId);
    alert(`Game created! ID: ${response.gameId}`);
  };

  const handleJoinGame = async () => {
    await joinGame(gameId, playerName);
    socket.emit('joinGame', { gameId, playerName });
    alert('Joined game successfully!');
  };

  const handleGuess = async () => {
    const response = await submitGuess(gameId, playerName, guess);
    setFeedback(response.feedback);
    socket.emit('newGuess', { gameId, playerName, guess });
  };

  return (
    <div>
      <h1>Numerous</h1>
      <button onClick={handleCreateGame}>Crée le jeu</button>
      <input placeholder="Game ID" value={gameId} onChange={(e) => setGameId(e.target.value)} />
      <input placeholder="Your Name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
      <button onClick={handleJoinGame}>Rejoindre le jeu</button>
      <input placeholder="Your Guess" value={guess} onChange={(e) => setGuess(e.target.value)} />
      <button onClick={handleGuess}>Supposer</button>
      {feedback && <p>{feedback}</p>}

      <h3>Joueur </h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
}

export default Game;
