console.log("SW loaded")


self.addEventListener('push', e => {
    const data = e.data.json();
    console.log("push received", data)

    self.registration.showNotification(data.title, {
        body: 'Notified by Node.js',
        icon: 'https://ibb.co/WGSZrWb'
    });
})