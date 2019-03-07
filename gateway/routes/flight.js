const routes = require('express').Router();

// GRPC config for the API Gateway
const grpc = require('grpc');
const protoPath = require('path').join(__dirname, './..', 'proto');
console.log(protoPath);
const proto = grpc.load({
    root: protoPath,
    file: 'rpcProcedures.proto'
});

//Create a new client instance that binds to the IP and port of the grpc server.
const flightDataMicroserviceClient = new proto.airbus.FlightDataService('flight_data_microservice:50050', grpc.credentials.createInsecure());


routes.post('/addFlightData', (request, response) => {
    console.log("API Gateway : Add FlightData");
    var flightData = request.body;
    console.log(flightData);
    
    // RPC Call to the add user function
    flightDataMicroserviceClient.addFlightData(flightData, function (err, result) {
        if (err) {
            if (err.name === 'MongoError' || err.code === 11000) {
                // Duplicate username
                response.status(400).send(err);
            }else{
                response.status(400).send(err)
            }
        } else {
            console.log("In Gateway API back");
            response.status(201);
            response.json(JSON.parse(result.response));
        }
    });
});


routes.post('/search/:aircraftModel', (request, response) => {
    console.log("API Gateway : Search Flight Data");

    var aircraftModel = request.params.aircraftModel;
    var query = request.body;
    query['aircraftModel'] = aircraftModel;
    var query = JSON.stringify(query)
    userMicroserviceClient.search(query, function (err, result) {
        if (err){
            response.status(400);
            response.send(err)
        }
        else {
            response.status(200);
            response.json(JSON.parse(result.response));
        }
        
    })

});


routes.get('/getFlightData', (request, response) => {
    console.log("API Gateway : Get All Flight Data");

    flightDataMicroserviceClient.getAllFlightData({}, function (err, result) {
        if (err){
            response.status(400);
            response.send(err)
        }
        else {
            response.status(200);
            response.json(JSON.parse(result.response));
        }
    })

});

module.exports = routes;
