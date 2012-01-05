var socket = io.connect();

helpMe = function() {
  $('#contact').attr('href', '#');
  $('#latest').hide();
  $('#search').val('Enter Search');
}

$(document).ready(function() {
  // ON
  socket.on('broadcast', function(data) {
    console.log(data.message);
  });
  // Later this should be used for showing availability
  socket.on('welcome', function(data) {
    console.log(data.message);
  });

  $('#enter-chat').keydown(function(e) {
    if (e.keyCode == '13') {
      socket.emit('message', {message: $('#enter-chat').val() });
    }
  });

  // This is to clear the placeholder text
  $('#search').click(function() {
    $(this).val('');
  });

  $('#contact').click(function() {
    if($('#search').val() === 'facebook') {
      // Open up the hidden chat box
      $('#contact').attr('href', '#latest');
      $('#latest').show();
      $('#search').val('');
    } else {
      helpMe();
    }
  });

  $('.rescue').click(function() {
    helpMe();
  });

  $('.modal-footer a').click(function() {
   $('#learn-more-modal').modal('hide');
  }); 
});