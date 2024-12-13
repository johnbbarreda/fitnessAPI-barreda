const express = require('express');
const {
    addWorkout,
    getMyWorkouts,
    updateWorkout,
    deleteWorkout,
    completeWorkoutStatus,
} = require('../controllers/WorkoutController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Workout Routes
router.post('/addWorkout', authenticateToken, addWorkout);
router.get('/getMyWorkouts', authenticateToken, getMyWorkouts);
router.patch('/updateWorkout/:id', authenticateToken, updateWorkout);
router.delete('/deleteWorkout/:id', authenticateToken, deleteWorkout);
router.patch('/completeWorkoutStatus/:id', authenticateToken, completeWorkoutStatus);

module.exports = router;
