const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Answer', AnswerSchema);
