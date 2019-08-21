var PROTO_PATH = __dirname + "/../protos/server-client.proto";


var grpc = require("grpc");
var loader = require("@grpc/proto-loader");

var packageDefinition = loader.loadSync(PROTO_PATH, {});

var services = grpc.loadPackageDefinition(packageDefinition);


var server = new grpc.Server();
server.addProtoService(services.routeguide.RouteGuide.service, {
  getFeature: getFeature
});

server.bind('0.0.0.0:50001', grpc.ServerCredentials.createInsecure());
server.start();

function getFeature(call, callback){
  var feature = { name: "first", point: call.request};
  callback(null, feature);
}

