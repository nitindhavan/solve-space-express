const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');
const User = require('../models/userModel');

const askQuestion = async (req, res) => {
    try {
        const { mainQuestion, description, images, urgency, tags, userId } = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'UserId is required' });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const questionCount = await Question.countDocuments({});
        const questionId = questionCount + 1;

        const newQuestion = new Question({
            questionId,
            mainQuestion,
            description,
            images,
            urgency,
            tags,
            userId,
        });

        await newQuestion.save();

        user.questionsAsked.push(newQuestion._id);
        await user.save();

        res.status(201).json({ message: 'Question asked successfully', question: newQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Error asking question', error });
    }
};

const getAllQuestions = async (req, res) => {
  try {
    // Fetch all questions in descending order of createdAt
    const questions = await Question.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .populate({
        path: 'answers.answerId', // Populate the answer details
        select: 'content userId upvotes downvotes comments', // Select specific fields to return for answers
        populate: {
          path: 'comments.userId', // Populate user details for comments
          select: 'username' // Select only the username of the comment's author
        }
      })
      .populate({
        path: 'upvotes', // Populate users who upvoted the question
        select: 'username' // Select only the username of users who upvoted
      })
      .populate({
        path: 'downvotes', // Populate users who downvoted the question
        select: 'username' // Select only the username of users who downvoted
      })
      .populate({
        path: 'userId', // Populate user details of the question asker
        select: 'username organisation position' // Select specific user details
      });

    res.status(200).json({ message: 'Questions fetched successfully', questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};


module.exports = { askQuestion, getAllQuestions };
