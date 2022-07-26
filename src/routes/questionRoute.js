const router = require('express').Router();
const { privateAuth } = require('../controller/userController');
const { validateData } = require('../middleware/dataValidation');
const { getAllQuestions, addQuestion } = require('../model/questionModel');

router.get('/', async (req, res) => {
  try {
    const resdata = await getAllQuestions();
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/questions GET route error', err);
    res.status(500).json('Something went wrong');
  }
});

router.post('/', privateAuth, validateData, async (req, res) => {
  const questionData = req.body;
  try {
    const resdata = await addQuestion(questionData);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/questions POST route error', err);
    res.status(500).json('Something went wrong');
  }
});

module.exports = { questionRoutes: router };
