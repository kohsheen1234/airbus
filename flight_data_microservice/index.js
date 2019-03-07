// Database setup and config
const db = require('./config');

const grpc = require('grpc');
const server = new grpc.Server();
const protoPath = require('path').join(__dirname, './', 'proto');
console.log(protoPath);
const proto = grpc.load({
    root: protoPath,
    file: 'rpcProcedures.proto'
});

const flightData = require('./controllers/FlightDataController');

//define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.airbus.FlightDataService.service, {
    /**
      Add a new flightData to the database and return  
    */
    addFlightData(call, callback) {
        flightData.addFlightData(call.request,function(err, result){
            console.log("In FlightDataService Mapping");
            
            if(err){
                console.log(err);
                callback(err)
            }else{
                console.log(result);
                callback(null,JSON.stringify(result))
            }
        })
    },

    removeflightData(call, callback) {

        flightData.removeFlightData(call.request.flightDataname, callback)
    },

    checkflightData(call, callback) {

        flightData.checkFlightData(call.request.flightDataname,callback)
    },

    getAllFlightData(call, callback) {

        flightData.getAllFlightData(callback)
    }
});

//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('grpc server running on port:', '0.0.0.0:50050');