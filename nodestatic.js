
//Import node-static and http libraries from node
var nstatic = require('node-static'), http = require('http'), util = require('util');

var folder = './public', port = 8080, version = "0.2";

var fileServer = new(nstatic.Server)(folder);

console.log('serving at %s , version %s', folder, version);

http.createServer(function(req, res) {
    req.addListener('end', function() {
        fileServer.serve(req, res, function(err, result) {
            
            if(err) {
               
                //Log attempted url and error message
                console.error("URL: %s - ERROR: %s",req.url, err.message);
                
                //Handle 404 and 500 errors by serving the the appropriate file
                if (err.status === 404 || err.status === 500) {
                    fileServer.serveFile(util.format('%d.html', err.status), err.status, {}, req, res);
                }
                else {
                    //Handle any other errors by just writing errors to the header of response
                    res.writeHead(err.status, err.headers);
                    res.end();
                }
            } else {
                //Log method used and url accessed upon a successul request
                console.log("%s : %s", req.method, req.url);
            }
            
        });
    }).resume();
}).listen(port);

console.log('server running: http://localhost:%d', port);