var mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

var flightDataSchema = mongoose.Schema({
   MSN : { type : String,
            index: { unique: true },
            dropDups : true
        },
        harnessLength : String,
        grossWeight : String,
        atmPressure : String,
        roomTemperature : String,
        airport : String,
        fuelCapacityLeft : String,
        fuelCapacityRight : String,
        fuelQuantityLeft : String,
        fuelQuantityRight : String,
        targetMaxAltitude : String,
        flightNumber : String
    },  
    { collection: 'flightData' }, 
    { versionKey : false })

var FlightData = module.exports =  mongoose.model('flightData', flightDataSchema);

