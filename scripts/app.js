console.log('hello app.js');

const btn = document.createElement('button');
btn.textContent = 'show log';
app.append(btn);

btn.addEventListener('click', function(e) {
    console.log('e', e);
});


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./scripts/service-worker.js')
        .then(reg => console.log("Service Worker Registered", reg))
        .catch(err => console.error("Service Worker Registration Failed", err));
}

// Detect Network Status
window.addEventListener('online', () => console.log("You are online!"));
window.addEventListener('offline', () => console.log("You are offline. Some features may not work."));