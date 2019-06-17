const express = require("express");
const http = require('http');
const https = require('https');
const fs = require('fs');

const expressApp = express();
// HTTP server
const server = http.createServer(expressApp);

//HTTPS server
const secureServer = https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
}, expressApp);

const io = require('socket.io')(server);
const ios = require('socket.io')(secureServer);

//Setup public file
expressApp.use(express.static('public'))


const HTTP_PORT = 80;
const HTTPS_PORT = 443;

io.on("connection", (socket) => {
    new Socket(socket);
})
ios.on("connection", (socket) => {
    new Socket(socket)
});

class Socket {
    constructor(socket) {
        console.log("connection from client");
        this.socket = socket;
        this.socket.on('message', this.onMessage.bind(this));
    }
}
Socket.prototype.onMessage = function (msg) {
    console.log("client: " + msg)
    const fromServer = "Server: " + msg
    console.log(fromServer);
    this.socket.emit("message", fromServer);
}


server.listen(HTTP_PORT, () => {
    console.log('server started at 80');
});

secureServer.listen(HTTPS_PORT, () => {
    console.log("secure server started at 443");
})