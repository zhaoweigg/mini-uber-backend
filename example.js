var express = require('ringpop/node_modules/express');
var TChannel = require('ringpop/node_modules/tchannel');
var Ringpop = require('ringpop');

var tchannel = new TChannel();
var subChannel = tchannel.makeSubChannel({
    serviceName: 'ringpop'
});

// The IP addresses should more dynamic
var host = '10.0.0.7';
var port = 3000;

var bootstrapNodes = ['10.0.0.7:3000'];

var ringpop = new Ringpop({
    app: 'dispatch',
    hostPort: host + ':' + port,
    channel: subChannel
});
ringpop.setupChannel();
tchannel.listen(port, host, onListening);

function onListening() {
    ringpop.bootstrap(bootstrapNodes, onBootstrap);
}

function onBootstrap(err) {
    if (err) {
        return;
    }

    // Start listening for application traffic
    createHttpServers();
}

function createHttpServers() {
    var http = express();

    http.get('/', function (req, res) {
        console.log('what am i');
        res.send('hello');
    });

    http.listen(6000, function onListen() {
        console.log('HTTP server is listening on ' + 6000);   
    });
}
