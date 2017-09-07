// jquery using the $ function 

var socket = io(); // loads the socket.io client, which exposese a 
// global and then connect 

$('form').submit(function () {
  var orttext = $('#message').val();	
  var text = $('#initials').val() + ' says: ' + orttext;
  socket.emit('message', text);
  $('#message').val('');
  return false;
});

socket.on('message', function (msg) {
  $('<li>').text(msg).appendTo('#history');
});




