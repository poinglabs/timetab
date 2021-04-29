self.addEventListener('message', function (event) {
    if (event.data.event !== 'notification') return;
    var options = {
        body: "Your timer of "+event.data.time+" minutes ended!",
        icon: "/timetab32.png",
    };
    event.waitUntil(self.registration.showNotification("Timer!", options));
}); 