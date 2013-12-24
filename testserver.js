var net = require('net');
var url = require('url');
var libxmljs = require("libxmljs");
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
app.listen(80);
var socketm=null




var server = net.createServer(function(c) {

  console.log('server connected');
  c.on('end', function() {
    console.log('server disconnected');
  });


  io.sockets.on('connection', function (socket) {
 
  //socket.emit('news', { hello: 'world' });
  
    c.on('data', function(data) {
    console.log(data.toString());

    //parse xml
    var receiveData=data.toString();
    
    lines=receiveData.split('\n');

    var alltag=[];

    for(var i=0;i<lines.length;i++){
      line = lines[i];
      if(line=="")break;

      var lineData=line.split(',');
      console.log(lineData);
      console.log('-----line data-------');
      console.log(lineData[0]);
      tags=lineData[0].split(":");
      tag=tags[1];

      
      discs=lineData[1].split(":");
      dis=discs[1];

      counts=lineData[3].split(":");
      count=counts[1];

      ants=lineData[4].split(":");
      ant=ants[1];
      alltag.push(ant);

      

    }
    console.log(alltag.join(','));
    socket.emit('news', alltag.join(','));
    //socketm.emit('news', data.toString());
  });


});


c.write('hello\r\n');
  c.pipe(c);
});


server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});



function inArray(elem,array)
{
var len = array.length;
for(var i = 0 ; i < len;i++)
{
    if(array[i] == elem){return i;}
}
return -1;
}

function handler (req, res) {
  var request = url.parse(req.url, true);
  var action = request.pathname;
 

  if (action == '/js/jquery.min.js') {
     var jsfile = fs.readFileSync('./js/jquery.min.js');
     res.writeHead(200, {'Content-Type': 'application/javascript' });
     res.end(jsfile, "utf-8");
  }

  if (action == '/js/jcanvas.min.js') {
     var jsfile = fs.readFileSync('./js/jcanvas.min.js');
     res.writeHead(200, {'Content-Type': 'application/javascript' });
     res.end(jsfile, "utf-8");
  }
  if (action == '/js/jquery.transit.min.js') {
     var jsfile = fs.readFileSync('./js/jquery.transit.min.js');
     res.writeHead(200, {'Content-Type': 'application/javascript' });
     res.end(jsfile, "utf-8");
  }
  if (action == '/images/map.jpg') {
     var jsfile = fs.readFileSync('./images/map.jpg');
     res.writeHead(200, {'Content-Type': 'image/jpg' });
     res.end(jsfile, "utf-8");
  }
  else
  {
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
  }
}

