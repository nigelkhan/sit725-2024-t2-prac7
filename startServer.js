var express = require("express");
var app = express();
const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);
io.on('connection', (socket) => {
  console.log('a client is connected');
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
  setInterval(()=>{
      x=parseInt(Math.random()*10);
      socket.emit('number', x);
      console.log('Emmiting Number '+x);
   }, 1000);
});
var port = 3040;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to the database
require('./database')();

// Attach the router
require('./routers/router')(app);

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Send the HTML file when accessing the root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
http.listen(port, () => {
    console.log("App listening on port: " + port);
});
