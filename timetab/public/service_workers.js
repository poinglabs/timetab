self.addEventListener('message', function (event) {
    if (event.data.event !== 'notification') return;
    var options = {
        body: event.data.message,
        icon: "/timetab32.png"
    };
    console.log(event.data.message)
    event.waitUntil(self.registration.showNotification(event.data.title, options));
}); 