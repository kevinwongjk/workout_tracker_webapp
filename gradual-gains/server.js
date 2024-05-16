// import express library
const express = require('express')
// initialize express app
const app = express()

// routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})

// listen for requests
app.listen(4000, () => {
    console.log('Listening on port 4000!')
})