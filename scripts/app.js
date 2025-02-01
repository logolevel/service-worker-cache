const btn = document.createElement('button');
btn.textContent = 'Clear cache: in set up v1.2';
app.append(btn);

btn.addEventListener('click', function (e) {
    caches.keys().then(function(names) {
        for (let name of names) {
            console.log('Removed: ', name, ' of ', names);
            caches.delete(name);
        }
    });
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    try {
        const reg = await navigator.serviceWorker.register('./service-worker.js');
        console.log('Service worker register success', reg);
    } catch (e) {
        console.error('Service worker register fail');
    }
}

// Detect Network Status
window.addEventListener('online', () => console.log("You are online!"));
window.addEventListener('offline', () => console.log("You are offline. Some features may not work."));