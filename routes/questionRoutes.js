const express = require('express');
const { askQuestion, getAllQuestions } = require('../controllers/questionController');
// const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/ask', askQuestion);
router.get('/getQuestions', getAllQuestions);

module.exports = router;
