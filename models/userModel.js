const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    //basic details
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    organisation: { type: String, required: true},
    position: { type: String, required: true},

    profilePicture: { type: String },


    //stats
    reputation: { type: Number, default: 0 },
    domain: { type: String },
    questionsAsked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    questionsAnswered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    upvoteCount: { type: Number, default: 0 },
    downvoteCount: { type: Number, default: 0 },
    reportCount: { type: Number, default: 0 },
    

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
