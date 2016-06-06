
//Import node-static and http libraries from node
var nstatic = require('node-static'), http = require('http');

var folder = './public', port = 8080;

var fileServer = new(nstatic.Server)(folder);

console.log('serving at %s , version 0.1', folder);

http.createServer(function(req, res) {
    req.addListener('end', function() {
        fileServer.serve(req, res);
    }).resume();
}).listen(port);

console.log('server running: http://localhost:%d', port);