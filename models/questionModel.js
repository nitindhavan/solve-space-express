const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionId: { type: Number, required: true },
    mainQuestion: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    urgency: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String }],

    answers: [
        {
            answerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
            comments: [
                {
                    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                    content: { type: String, required: true },
                    createdAt: { type: Date, default: Date.now },
                },
            ],
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', QuestionSchema);
