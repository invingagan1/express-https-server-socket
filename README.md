# Example of express http/s server with socket.io

## Create SSH certificate and key files for https
Run following command to create openssl cert and key files.

```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

## Setup https server
```
const secureServer = https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
}, expressApp);
```

## Setup socket.io at Server
```
const ios = require('socket.io')(secureServer);
ios.on("connection", (socket) => {
    // socket handling will go here.
});
```