const Workout = require('../models/Workout');

// Add Workout
exports.addWorkout = async (req, res) => {
    const { name, duration } = req.body;
    
    const workout = new Workout({ name, duration, userId: req.userId });
    
    try {
        await workout.save();
        res.status(201).json({
            userId: workout.userId,
            name: workout.name,
            duration: `${workout.duration} mins`,
            status: workout.status,
            _id: workout._id,           
            dateAdded: workout.dateAdded,     
        });
    } catch (error) {
        res.status(400).json({ error: 'Error adding workout.' });
    }
};


// Get My Workouts
exports.getMyWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.userId });

        const formattedWorkouts = workouts.map(workout => ({
            _id: workout._id,
            userId: workout.userId,
            name: workout.name,
            duration: `${workout.duration} mins`, 
            status: workout.status,
            dateAdded: workout.dateAdded,
            __v: workout.__v 
        }));

        res.json({ workouts: formattedWorkouts }); 
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching workouts.' });
    }
};


/// Update Workout
exports.updateWorkout = async (req, res) => {
    const { id } = req.params; 
    const { name, duration } = req.body; 

    try {
        const updatedWorkout = await Workout.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { name, duration },
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({ error: 'Workout not found or not authorized.' });
        }

        res.json({
            message: "workout updated successfully",
            updatedWorkout 
        });
    } catch (error) {
        res.status(400).json({ error: 'Error updating workout.' });
    }
};




// Delete Workout
exports.deleteWorkout = async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedWorkout = await Workout.findOneAndDelete({ _id: id, userId: req.userId });

        if (!deletedWorkout) {
            return res.status(404).json({ error: 'Workout not found or not authorized.' });
        }

        res.json({ message: "Workout deleted successfully" }); 
    } catch (error) {
        res.status(500).json({ error: 'Error deleting workout.' });
    }
};



// Complete Workout Status
exports.completeWorkoutStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedWorkout = await Workout.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { status: "completed" }, 
            { new: true } 
        );

        if (!updatedWorkout) {
            return res.status(404).json({ error: 'Workout not found or not authorized.' });
        }

        const formattedWorkout = {
            _id: updatedWorkout._id,
            userId: updatedWorkout.userId,
            name: updatedWorkout.name,
            duration: `${updatedWorkout.duration} mins`, 
            status: updatedWorkout.status,
            dateAdded: updatedWorkout.dateAdded,
            __v: updatedWorkout.__v 
        };

        res.json({
            message: "workout status updated successfully",
            updatedWorkout: formattedWorkout 
        });
    } catch (error) {
        res.status(400).json({ error: 'Error updating workout status.' });
    }
};

