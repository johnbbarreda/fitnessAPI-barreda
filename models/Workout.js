const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    duration: { type: Number, required: true }, 
    status: { type: String, enum: ['completed', 'pending'], default: 'pending' },
    dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', workoutSchema);
