var socket = io.connect();
var status = 'Not initialized.'
socket.on('welcome', function(data) {
  status = data.message;
});

$(document).ready(function() {
    
});