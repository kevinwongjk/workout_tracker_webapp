const express = require('express')
const {
    getAllMeasurements,
    getSpecificMeasurements,
    getLastSpecificMeasurement,
    createNewMeasurement,
    updateMeasurement,
    deleteAllMeasurements,
    deleteSpecificMeasurement,
    deleteSpecificMeasurementEntry
} = require('../controllers/measurementController')

const router = express.Router()

// GET all measurements
router.get('/:userId', getAllMeasurements)

// GET all entries of specific measurement
router.get('/:userId/:type', getSpecificMeasurements)

// GET the last entry of specific measurement
router.get('/:userId/:type/last', getLastSpecificMeasurement)

// POST a new measurement
router.post('/:userId', createNewMeasurement)

// UPDATE a measurement
router.patch('/:userId/:measurementId', updateMeasurement)

// DELETE all measurements
router.delete('/:userId', deleteAllMeasurements)

// DELETE all of a specific measurement
router.delete('/:userId/:type', deleteSpecificMeasurement)

// Delete a specific measurement
router.delete('/:userId/:type/:measurementId', deleteSpecificMeasurementEntry)

module.exports = router