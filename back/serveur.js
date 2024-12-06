// 2e essaie avec les sockets
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const gameRoutes = require('./routes/gameRo');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/game', gameRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // l' URL du front
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinGame', (data) => {
    socket.join(data.gameId);
    io.to(data.gameId).emit('playerJoined', { playerName: data.playerName });
  });

  socket.on('newGuess', (data) => {
    io.to(data.gameId).emit('guessUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = 5001;
server.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
