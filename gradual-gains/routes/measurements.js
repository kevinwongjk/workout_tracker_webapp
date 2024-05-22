const express = require('express')
const UserMeasurements = require('../models/measurementModel')
// const {
//     getMeasurements,
//     createWeightMeasurement,
//     getWeightMeasurement,
//     deleteWeightMeasurement
// } = require('../controllers/measurementController')

const router = express.Router()

// GET all measurements
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const userMeasurements = await UserMeasurements.findOne({ userId });
      if (!userMeasurements) {
        return res.status(404).json({ message: 'No measurements found for this user' });
      }
      res.status(200).json(userMeasurements.measurements);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })

// GET a single measurement


// POST a new weight measurement
router.post('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { type, value } = req.body; // type could be 'weight', 'bodyfat', 'neck', etc.
  
    const validTypes = [
      'weight', 'bodyfat', 'neck', 'shoulders', 'chest', 'leftBicep', 'rightBicep',
      'leftForearm', 'rightForearm', 'upperAbs', 'waist', 'lowerAbs', 'hips',
      'leftThigh', 'rightThigh', 'leftCalf', 'rightCalf'
    ];
  
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid measurement type' });
    }
  
    try {
      let userMeasurements = await UserMeasurements.findOne({ userId });
  
      if (!userMeasurements) {
        userMeasurements = new UserMeasurements({ userId, measurements: {} });
      }
  
      const newEntry = { value, date: new Date() };
  
      if (!userMeasurements.measurements[type]) {
        userMeasurements.measurements[type] = [];
      }
  
      userMeasurements.measurements[type].push(newEntry);
  
      await userMeasurements.save();
      res.status(201).json(userMeasurements);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })


// UPDATE a measurement
router.patch('/:userId/:measurementId', async (req, res) => {
    const { userId, measurementId } = req.params;
    const { type, value } = req.body; // type could be 'weight', 'bodyfat', 'neck', etc.
  
    const validTypes = [
      'weight', 'bodyfat', 'neck', 'shoulders', 'chest', 'leftBicep', 'rightBicep',
      'leftForearm', 'rightForearm', 'upperAbs', 'waist', 'lowerAbs', 'hips',
      'leftThigh', 'rightThigh', 'leftCalf', 'rightCalf'
    ];
  
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid measurement type' });
    }
  
    try {
      const userMeasurements = await UserMeasurements.findOne({ userId });
  
      if (!userMeasurements) {
        return res.status(404).json({ message: 'No measurements found for this user' });
      }
  
      const measurement = userMeasurements.measurements[type].id(measurementId);
  
      if (!measurement) {
        return res.status(404).json({ message: 'Measurement not found' });
      }
  
      measurement.value = value;
      measurement.date = new Date();
  
      await userMeasurements.save();
      res.status(200).json(userMeasurements);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
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