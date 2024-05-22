const UserMeasurements = require('../models/measurementModel')
const mongoose = require('mongoose')

// get all measurements
const getAllMeasurements = async (req, res) => {
    const { userId } = req.params

    try {
        const userMeasurements = await UserMeasurements.findOne({ userId })
        if (!userMeasurements) {
            return res.status(404).json({ message: 'No measurements found for this user' })
        }
        res.status(200).json(userMeasurements.measurements)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get all entries of specific measurement
const getSpecificMeasurements = async (req, res) => {
    const { userId, type } = req.params

    const validTypes = [
        'weight', 'bodyfat', 'neck', 'shoulders', 'chest', 'leftBicep', 'rightBicep',
        'leftForearm', 'rightForearm', 'upperAbs', 'waist', 'lowerAbs', 'hips',
        'leftThigh', 'rightThigh', 'leftCalf', 'rightCalf'
    ]

    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid measurement type' })
    }

    try {
        const userMeasurements = await UserMeasurements.findOne({ userId })
        if (!userMeasurements) {
            return res.status(404).json({ message: 'No measurements found for this user' })
        }

        const measurementsOfType = userMeasurements.measurements[type]
        if (!measurementsOfType || measurementsOfType.length === 0) {
            return res.status(404).json({ message: `No ${type} measurements found for this user` })
        }

        res.status(200).json(measurementsOfType)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get the last entry of specific measurement
const getLastSpecificMeasurement = async (req, res) => {
    const { userId, type } = req.params

    const validTypes = [
        'weight', 'bodyfat', 'neck', 'shoulders', 'chest', 'leftBicep', 'rightBicep',
        'leftForearm', 'rightForearm', 'upperAbs', 'waist', 'lowerAbs', 'hips',
        'leftThigh', 'rightThigh', 'leftCalf', 'rightCalf'
    ]

    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid measurement type' })
    }

    try {
        const userMeasurements = await UserMeasurements.findOne({ userId })
        if (!userMeasurements) {
            return res.status(404).json({ message: 'No measurements found for this user' })
        }

        const measurementsOfType = userMeasurements.measurements[type]
        if (!measurementsOfType || measurementsOfType.length === 0) {
            return res.status(404).json({ message: `No ${type} measurements found for this user` })
        }

        const lastMeasurement = measurementsOfType[measurementsOfType.length - 1]
        res.status(200).json(lastMeasurement)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update a new measurement
const createNewMeasurement = async (req, res) => {
    const { userId } = req.params
    const { type, value } = req.body // type could be 'weight', 'bodyfat', 'neck', etc.

    const validTypes = [
        'weight', 'bodyfat', 'neck', 'shoulders', 'chest', 'leftBicep', 'rightBicep',
        'leftForearm', 'rightForearm', 'upperAbs', 'waist', 'lowerAbs', 'hips',
        'leftThigh', 'rightThigh', 'leftCalf', 'rightCalf'
    ]

    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid measurement type' })
    }

    try {
        let userMeasurements = await UserMeasurements.findOne({ userId })

        if (!userMeasurements) {
            userMeasurements = new UserMeasurements({ userId, measurements: {} })
        }

        const newEntry = { value, date: new Date() }

        if (!userMeasurements.measurements[type]) {
            userMeasurements.measurements[type] = []
        }

        userMeasurements.measurements[type].push(newEntry)

        await userMeasurements.save()
        res.status(201).json(userMeasurements)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update a measurement
const updateMeasurement = async (req, res) => {
    const { userId, measurementId } = req.params
    const { type, value } = req.body // type could be 'weight', 'bodyfat', 'neck', etc.

    const validTypes = [
        'weight', 'bodyfat', 'neck', 'shoulders', 'chest', 'leftBicep', 'rightBicep',
        'leftForearm', 'rightForearm', 'upperAbs', 'waist', 'lowerAbs', 'hips',
        'leftThigh', 'rightThigh', 'leftCalf', 'rightCalf'
    ]

    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid measurement type' })
    }

    try {
        const userMeasurements = await UserMeasurements.findOne({ userId })

        if (!userMeasurements) {
            return res.status(404).json({ message: 'No measurements found for this user' })
        }

        const measurement = userMeasurements.measurements[type].id(measurementId)

        if (!measurement) {
            return res.status(404).json({ message: 'Measurement not found' })
        }

        measurement.value = value
        measurement.date = new Date()

        await userMeasurements.save()
        res.status(200).json(userMeasurements)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete all measurements
const deleteAllMeasurements = async (req, res) => {
    const { userId } = req.params

    try {
        const userMeasurements = await UserMeasurements.findOne({ userId })
        if (!userMeasurements) {
            return res.status(404).json({ message: 'No measurements found for this user' })
        }

        userMeasurements.measurements = {}
        await userMeasurements.save()
        res.status(200).json({ message: 'All measurements deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete all of a specific measurement
const deleteSpecificMeasurement = async (req, res) => {
    const { userId, type } = req.params

    const validTypes = [
        'weight', 'bodyfat', 'neck', 'shoulders', 'chest', 'leftBicep', 'rightBicep',
        'leftForearm', 'rightForearm', 'upperAbs', 'waist', 'lowerAbs', 'hips',
        'leftThigh', 'rightThigh', 'leftCalf', 'rightCalf'
    ]

    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid measurement type' })
    }

    try {
        const userMeasurements = await UserMeasurements.findOne({ userId })
        if (!userMeasurements) {
            return res.status(404).json({ message: 'No measurements found for this user' })
        }

        userMeasurements.measurements[type] = []
        await userMeasurements.save()
        res.status(200).json({ message: `All measurements of type ${type} deleted successfully` })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a specific measurement
const deleteSpecificMeasurementEntry = async (req, res) => {
    const { userId, type, measurementId } = req.params

    const validTypes = [
        'weight', 'bodyfat', 'neck', 'shoulders', 'chest', 'leftBicep', 'rightBicep',
        'leftForearm', 'rightForearm', 'upperAbs', 'waist', 'lowerAbs', 'hips',
        'leftThigh', 'rightThigh', 'leftCalf', 'rightCalf'
    ]

    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid measurement type' })
    }

    try {
        const userMeasurements = await UserMeasurements.findOne({ userId })
        if (!userMeasurements) {
            return res.status(404).json({ message: 'No measurements found for this user' })
        }

        const measurementIndex = userMeasurements.measurements[type].findIndex(measurement => measurement._id.toString() === measurementId)
        if (measurementIndex === -1) {
            return res.status(404).json({ message: 'Measurement not found' })
        }

        userMeasurements.measurements[type].splice(measurementIndex, 1)
        await userMeasurements.save()
        res.status(200).json({ message: 'Measurement deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllMeasurements,
    getSpecificMeasurements,
    getLastSpecificMeasurement,
    createNewMeasurement,
    updateMeasurement,
    deleteAllMeasurements,
    deleteSpecificMeasurement,
    deleteSpecificMeasurementEntry
}