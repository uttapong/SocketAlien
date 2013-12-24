var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
 
var server = http.createServer(function(request, response){ 
    console.log('Connection');
    var path = url.parse(request.url).pathname;

 
    switch(path){
        case '/':
            fs.readFile(__dirname + 'socket.html', function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404 ddd");
                }
                else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(path);
                    response.write(data, "utf8");
                }
            });
            break;
        case 'socket.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404 ddd");
                    response.write(error);
                }
                else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(path);
                    response.write(data, "utf8");
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            break;
    }
    response.end(); 
}); 
 
server.listen(8001);
 
 
io.listen(server);