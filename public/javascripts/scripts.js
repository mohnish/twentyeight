var socket = io.connect();

helpMe = function() {
  $('#contact').attr('href', '#');
  $('#latest').hide();
  $('#enter-chat').hide();
  $('#search').val('Enter Search');
}

scrollDown = function() {
  $("#latest").scrollTop($("#latest")[0].scrollHeight);
}

$(document).ready(function() {

  // ON
  socket.on('broadcast', function(data) {
    $('#latest').append('<p>' + data.message +'</p>');
    scrollDown();
    console.log(data.message);
  });

  socket.on('welcome', function(data) {
    var i; // initialize
    for(i = 0; i < data.messages.length; i++) {
      $('#latest').append('<p>' + data.messages[i] +'</p>');
    }
    scrollDown();
    console.log(data.messages);
  });

  $('#enter-chat').keydown(function(e) {
    if (e.keyCode == '13') {
      socket.emit('message', {message: $('#enter-chat').val().trim() });
      $(this).val('');
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
      $('#enter-chat').show();
      scrollDown();
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