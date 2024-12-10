require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const answerRoutes = require('./routes/answerRoutes.js')
// const authenticate = require('./middlewares/auth');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/questions', answerRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the StackOverflow-like website!');
});

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

const PORT = 5000;

mongoose.connect('mongodb+srv://ronitrs:ronitrs@cluster0.xhkl0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log('Database connection failed:', err));
