const http = require('http');
const port=process.env.PORT || 3000

var url = require('url')
var fs = require('fs')

var server = http.createServer(function(request, response){   
  var parsedUrl = url.parse(request.url, true)
  var path = request.url
  // console.log("path: " + path)
  var method = request.method

  console.log('HTTP PATH: ' + path)

  if (path == '/home'){
    response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Headers': 'Accept',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });
    response.write('home page')
    response.end()

  }else if(path == '/page1'){
    response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Accept, Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });
    response.write('page 1')
    response.end()

  }else{
    response.statusCode = 404
    response.end()
  }
})

server.listen(port)