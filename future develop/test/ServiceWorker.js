// self.registration.showNotification(10);
self.addEventListener('install', (event) => {
    console.log("installed");
});

// let time = 0;

setTimeout(() => {
    self.registration.showNotification("hello notification");
    // time++;
}, 60000);

