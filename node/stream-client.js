var PROTO_PATH= __dirname + "/../protos/streaming.proto";

var grpc = require("grpc");
var protoloader = require("@grpc/proto-loader");
var fs = require("fs");

var packageDefinition = protoloader.loadSync(
  PROTO_PATH,
  {});


var services = grpc.loadPackageDefinition(packageDefinition);

var client = new services.video.VideoStreaming ('localhost:50001', grpc.credentials.createInsecure());


function runLaunchVideo(){
  var fileName = {fileName : "/home/monad/Downloads/image.jpg"};
  var outputFileStream = fs.createWriteStream("/home/monad/code/output.jpg");
  var clientLocal = client.launchVideo(fileName);
  clientLocal.on('data', function(msg){
    outputFileStream.write(msg.data);
  });
}

runLaunchVideo();
