import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { submitGuess } from '../api/gameAPI';

function GamePage() {
  const { gameId } = useParams();  
  const location = useLocation();
  const { playerName } = location.state || {};  
  const [guess, setGuess] = useState('');  
  const [feedback, setFeedback] = useState(''); 

  const handleGuessSubmit = async () => {
    if (!guess || isNaN(guess) || guess.length !== 6) {
      alert('Veuillez entrer un nombre à 6 chiffres');
      return;
    }
    try {
      const response = await submitGuess(gameId, playerName, parseInt(guess, 10)); 
      const { feedback } = response.data;

      setFeedback(feedback);  
      setGuess('');  
    } catch (error) {
      alert(`Erreur lors de la soumission de la supposition: ${error.message}`);
    }
  };

  return (
    <div className="game-page">
      <div className="navbar">
        <p>ID du Jeu: {gameId}</p>
        <p>Joueur: {playerName}</p>
      </div>

      <div className="game-content">
        <h3>Devinez le numéro à 6 chiffres</h3>
        
        <div className="guess-input-container">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Entrez votre supposition"
            min="100000"
            max="999999"
          />
          <button onClick={handleGuessSubmit}>Supposer les chiffres</button>
        </div>

        {feedback && <h3>Feedback: {feedback}</h3>}
      </div>
    </div>
  );
}

export default GamePage;
