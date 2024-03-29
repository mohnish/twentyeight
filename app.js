/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    io = require('socket.io'),
    password = require(__dirname + '/config/password').password();

var app = module.exports = express.createServer(),
    io = io.listen(app);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'whatcouldmysecretbe' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

// Index
app.get('/', routes.index);

app.listen(80);

// Holds previous messages
var messageBuffer = [];

io.sockets.on('connection', function(socket) {
  socket.emit('welcome', { messages: messageBuffer });
  socket.on('message', function(data) {
    // Push it to a buffer and then emit a broadcast
    if(messageBuffer.length < 50) {
      messageBuffer.push(data.message);
    } else {
      messageBuffer.shift();
      messageBuffer.push(data.message);
    }
    io.sockets.emit('broadcast', {message: data.message});
  });

});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
