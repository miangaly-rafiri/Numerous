const express = require('express');
const { createGame, joinGame, submitGuess } = require('../controllers/gameCo');
const router = express.Router();

router.post('/create', createGame);
router.post('/join', joinGame);
router.post('/guess', submitGuess);

module.exports = router;