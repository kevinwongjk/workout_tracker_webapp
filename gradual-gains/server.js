// import env variables
require('dotenv').config()

// import libraries and routes
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const measurementRoutes = require('./routes/measurements')

// initialize express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()  
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/measurements', measurementRoutes)

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db * Listening on port', process.env.PORT)
        })     
    })
    .catch((error) => {
        console.log(error)
    })

