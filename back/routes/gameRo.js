const express = require('express');
const { createGame, joinGame, submitGuess, getLeaderboard } = require('../controllers/gameCo');
const router = express.Router();

router.post('/create', createGame);
router.post('/join', joinGame);
router.post('/guess', submitGuess);
router.get('/leaderboard', getLeaderboard);

module.exports = router;