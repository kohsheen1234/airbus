const express = require('express');
const app = express();

//Middle-ware to parse the incoming request body into a json object
const bodyParser = require('body-parser');

const cors = require('cors');
// All the api endpoints
const flightDataRoutes = require('./routes/flight.js');

// We need to enable CORS to send and receive images
app.use(cors())

// To parse the request body to JSON objects automatically
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));


app.use('/api', flightDataRoutes);


const PORT_NO = process.env.PORT || 4140
app.listen(PORT_NO, function (err) {
    console.log("App running on port " + PORT_NO);
});