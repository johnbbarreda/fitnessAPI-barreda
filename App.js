const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const { handleError } = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Routes
app.use('/users', userRoutes);
app.use('/workouts', workoutRoutes);

// Global Error Handling Middleware
app.use(handleError);

module.exports = app; // Export the app instance for use in index.js
