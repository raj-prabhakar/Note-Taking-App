// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const noteRoutes = require('./Routes/noteRoutes');
const audioRoute = require('./Routes/audioRoute');
const authenticate = require('./Middleware/authenticate');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/notes', authenticate, noteRoutes);
app.use('/api/audio', authenticate, audioRoute);

app.listen(5000, () => console.log('Server running on port 5000'));