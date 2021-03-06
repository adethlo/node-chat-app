let socket = io();

function scrollToBottom () {
    // Selectors
    let messages = jQuery('#messages');
    newMessage = messages.children('li:last-child');
    // Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connected to the server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.created_at).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        created_at: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.created_at).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        created_at: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    
    //navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
})