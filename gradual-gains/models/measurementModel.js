const mongoose = require('mongoose')

const measurementEntrySchema = new mongoose.Schema({
  value: Number,
  date: { type: Date, required: true }
})

const userMeasurementsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  measurements: {
    weight: [measurementEntrySchema],
    bodyfat: [measurementEntrySchema],
    neck: [measurementEntrySchema],
    shoulders: [measurementEntrySchema],
    chest: [measurementEntrySchema],
    leftBicep: [measurementEntrySchema],
    rightBicep: [measurementEntrySchema],
    leftForearm: [measurementEntrySchema],
    rightForearm: [measurementEntrySchema],
    upperAbs: [measurementEntrySchema],
    waist: [measurementEntrySchema],
    lowerAbs: [measurementEntrySchema],
    hips: [measurementEntrySchema],
    leftThigh: [measurementEntrySchema],
    rightThigh: [measurementEntrySchema],
    leftCalf: [measurementEntrySchema],
    rightCalf: [measurementEntrySchema]
  }
})

module.exports = mongoose.model('UserMeasurements', userMeasurementsSchema)