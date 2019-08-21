var PROTO_PATH= __dirname + "/../protos/server-client.proto";

var grpc = require("grpc");
var protoloader = require("@grpc/proto-loader");
var async = require("async");


var packageDefinition = protoloader.loadSync(
  PROTO_PATH,
  {});


var services = grpc.loadPackageDefinition(packageDefinition);

var client = new services.routeguide.RouteGuide ('localhost:50001', grpc.credentials.createInsecure());

function runGetFeature (callback){
  var point = {"latitude" : 12, "longitude": 13};
  function newCallback(err, feature){
    console.log(err);
    console.log(feature);
    callback();
  }
  client.getFeature(point, newCallback);
}

function main(){
  async.series([runGetFeature]);
}

main();



