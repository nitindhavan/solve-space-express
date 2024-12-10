const Answer = require('../models/answerModel');
const Question = require('../models/questionModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const writeAnswer = async (req, res) => {
  try {
    const { content, questionId, userId } = req.body;  // Extract userId from the request body

    if (!userId) return res.status(400).json({ message: 'User ID is required' });  // Check if userId is provided

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const newAnswer = new Answer({
      content,
      questionId,
      userId,
    });

    await newAnswer.save();

    question.answers.push({ answerId: newAnswer._id });
    await question.save();

    user.questionsAnswered.push(newAnswer._id);
    await user.save();

    res.status(201).json({ message: 'Answer posted successfully', answer: newAnswer });
  } catch (error) {
    console.error("Error in posting answer: ", error);  // Log the error
    res.status(500).json({ message: 'Error posting answer', error: error.message || error });
  }
};

const upvoteAnswer = async (req, res) => {
  try {
    const { answerId, userId } = req.body; // Take userId from request body

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Check if answerId is valid
    if (!answerId || !mongoose.Types.ObjectId.isValid(answerId)) {
      return res.status(400).json({ message: 'Invalid answerId' });
    }

    // Find the answer
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    // If the user has already upvoted, remove the upvote
    if (answer.upvotes.includes(userId)) {
      answer.upvotes = answer.upvotes.filter(id => id.toString() !== userId.toString());
      await answer.save();
      return res.status(200).json({ message: 'Upvote removed', answer });
    }

    // If the user has already downvoted, remove the downvote
    if (answer.downvotes.includes(userId)) {
      answer.downvotes = answer.downvotes.filter(id => id.toString() !== userId.toString());
    }

    // Add the upvote
    answer.upvotes.push(userId);
    await answer.save();

    res.status(200).json({ message: 'Answer upvoted successfully', answer });
  } catch (error) {
    console.error('Error upvoting answer:', error);
    res.status(500).json({ message: 'Error upvoting answer', error: error.message });
  }
};


const downvoteAnswer = async (req, res) => {
  try {
    const { answerId, userId } = req.body; // Take userId from request body

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Check if answerId is valid
    if (!answerId || !mongoose.Types.ObjectId.isValid(answerId)) {
      return res.status(400).json({ message: 'Invalid answerId' });
    }

    // Find the answer
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    // If the user has already downvoted, remove the downvote
    if (answer.downvotes.includes(userId)) {
      answer.downvotes = answer.downvotes.filter(id => id.toString() !== userId.toString());
      await answer.save();
      return res.status(200).json({ message: 'Downvote removed', answer });
    }

    // If the user has already upvoted, remove the upvote
    if (answer.upvotes.includes(userId)) {
      answer.upvotes = answer.upvotes.filter(id => id.toString() !== userId.toString());
    }

    // Add the downvote
    answer.downvotes.push(userId);
    await answer.save();

    res.status(200).json({ message: 'Answer downvoted successfully', answer });
  } catch (error) {
    console.error('Error downvoting answer:', error);
    res.status(500).json({ message: 'Error downvoting answer', error: error.message });
  }
};


module.exports = { writeAnswer, upvoteAnswer, downvoteAnswer };
