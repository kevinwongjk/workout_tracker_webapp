// import env variables
require('dotenv').config()

// import express library
const express = require('express')
// import routes
const workoutRoutes = require('./routes/workouts')

// initialize express app
const app = express()

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()  
})

// routes
app.use('/api/workouts', workoutRoutes)

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})

