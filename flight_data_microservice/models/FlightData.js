var mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

var flightDataSchema = mongoose.Schema({
   MSN : { type : String,
            index: { unique: true },
            dropDups : true
        },
        harnessLength : String,
        flightNumber : String,
        grossWeight : String,
        atmosphericPressure : String,
        roomTemperature : String,
        originAirport : String,
        fuelCapacityLeft : String,
        fuelCapacityRight : String,
        fuelQuantityLeft : String,
        fuelQuantityRight : String,
        targetMaxAltitude : String,
        destinationAirport : String,
        date : String,
        time :String
        

    },  
    { collection: 'flightData' }, 
    { versionKey : false })

var FlightData = module.exports =  mongoose.model('flightData', flightDataSchema);

