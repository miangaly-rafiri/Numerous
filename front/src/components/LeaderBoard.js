import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../api/gameAPI';
import socket from '../api/socket';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const getLeaderboard = async () => {
      const data = await fetchLeaderboard();
      setLeaderboard(data);
    };
    getLeaderboard();

    socket.on('guessUpdate', async () => {
      const data = await fetchLeaderboard();
      setLeaderboard(data);
    });

    return () => {
      socket.off('guessUpdate');
    };
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((player, index) => (
          <li key={index}>
            {player.playerName}: {player.attempts} attempts
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
