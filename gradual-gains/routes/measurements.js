const express = require('express')
const UserMeasurements = require('../models/measurementModel')
// const {
//     createWorkout,
//     getWorkouts,
//     getWorkout,
//     deleteWorkout,
//     updateWorkout
// } = require('../controllers/workoutController')
// const {
//     getMeasurements,
//     createWeightMeasurement,
//     getWeightMeasurement,
//     deleteWeightMeasurement
// } = require('../controllers/measurementController')

const router = express.Router()

// GET all measurements
// router.get('/', (req, res) => {
//     res.json({"mssg": "hello"})
// })
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const userMeasurements = await UserMeasurements.findOne({ userId });
        if (!userMeasurements) {
            return res.status(404).json({ error: 'No measurements found for this usser' })
        }
        res.status(200).json(userMeasurements.measurements)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// POST a new weight measurement
// router.post('/weight', (req, res) => {
//     res.json({"mssg": "post a new weight measurement"})
// })
router.post('/weight', (req, res) => {
    res.json({"mssg": "post a new weight measurement"})
})

// GET a weight measurement
router.get('/weight/:id', (req, res) => {
    res.json({"mssg": "get a weight measurement"})
})

// // DELETE a weight measurement
router.delete('/weight/:id', (req, res) => {
    res.json({"mssg": "delete a weight measurement"})
})

// POST a new body fat measurement

// Post a new neck measurement

// Post a new shoulders measurement
// Post a new chest measurement
// Post a new left bicep measurement
// Post a new right bicep measurement
// Post a new left forearm measurement
// Post a new right forearm measurement
// Post a new upper abs measurement
// Post a new waist measurement
// Post a new lower abs measurement
// Post a new hips measurement
// Post a new left thigh measurement
// Post a new right thigh measurement
// Post a new left calf measurement
// Post a new right calf measurement


// // GET all workouts
// router.get('/', getWorkouts)

// // GET a single workout
// router.get('/:id', getWorkout)

// // POST a new workout
// router.post('/', createWorkout)

// // DELETE a workout
// router.delete('/:id', deleteWorkout)

// // UPDATE a workout
// router.patch('/:id', updateWorkout)

module.exports = router