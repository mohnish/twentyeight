/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    io = require('socket.io'),
    Facebook = require('facebook-node-sdk');;

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
  // app.use(Facebook.middleware({ appId: '166821513417475', secret: '2c3fa00ccfc0a632b761256f4664daa9' }));
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

app.listen(3000);

io.sockets.on('connection', function(socket) {
  socket.emit('welcome', { message: 'You have successfully connected to the server.' });
  socket.on('message', function(data) {
    // Push it to a buffer and then emit a broadcast
    io.sockets.emit('broadcast', {message: data.message});
  });

});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
