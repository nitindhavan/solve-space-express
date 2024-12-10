const express = require('express');
const { writeAnswer, upvoteAnswer, downvoteAnswer } = require('../controllers/answerController');


const router = express.Router();

router.post('/answer', writeAnswer);
router.post('/answers/upvote', upvoteAnswer);
router.post('/answers/downvote', downvoteAnswer);

module.exports = router;
