var PROTO_PATH = __dirname + "/../protos/streaming.proto";


var grpc = require("grpc");
var loader = require("@grpc/proto-loader");
var fs = require("fs");

var packageDefinition = loader.loadSync(PROTO_PATH, {});

var services = grpc.loadPackageDefinition(packageDefinition);


var server = new grpc.Server();
server.addProtoService(services.video.VideoStreaming.service, {
  launchVideo: launchVideo
});

function launchVideo(call, callback){
  var fileName = call.request.fileName;
  var streamF = fs.createReadStream(fileName);

  streamF.on('data', function(msg){
    call.write({data: msg});
  });

  streamF.on('end', function(msg){
    call.end();
  });
}

server.bind('0.0.0.0:50001', grpc.ServerCredentials.createInsecure());
server.start();
