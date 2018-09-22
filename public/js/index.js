let socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    let li = jQuery('<li></li>');
    let a = jQuery('<a traget:"_blank">My current Location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.appned(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(data) {
        console.log('Got it!', data);
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location');
    });
})