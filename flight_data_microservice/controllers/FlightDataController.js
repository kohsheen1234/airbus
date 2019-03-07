const FlightData = require('../models/FlightData');

module.exports.addFlightData = function (flightData, callback) {
    console.log("FlightData Microservice : In addFlightData");
    console.log(flightData);
    FlightData.init().then(() => {
        // assert.ifError(err);
        var newFlightData = new FlightData(flightData);
        newFlightData.save(callback);
    });
}

module.exports.removeFlightData = function (MSN, callback) {
    console.log("FlightData Microservice : In removeFlightData");
    FlightData.deleteOne({
        MSN: MSN
    }, callback);
}


module.exports.searchFlightData = function (searchParams, callback) {
    console.log("FlightData Microservice :In Check FlightData");
    var key = Object.keys(searchParams)[0];
    console.log(`/.*${searchParams[key]}.*/`);

    FlightData.find({
        key : new RegExp(`/.*${searchParams[key]}.*/`)
    }, callback);
}


module.exports.getAllFlightData= function(callback){

    console.log("FlightData Microservice : In get All FlightData");
    const criteria = {};
    const projections = {
         _id: 0,
         __v: 0
      };
    const options = {
         lean: true
      };
    FlightData.find(criteria, projections, options, callback);
    
}