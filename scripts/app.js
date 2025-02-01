const btn = document.createElement('button');
btn.textContent = 'Clear cache: set up v1.3';
app.append(btn);

btn.addEventListener('click', function (e) {
    caches.keys().then(function(names) {
        for (let name of names) {
            console.log('Removed: ', name, ' of ', names);
            caches.delete(name);
        }
    });

    // Unregister Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => registration.unregister());
        });
    }

    // Reload the page
    setTimeout(() => {
        window.location.reload(true);
    }, 1000);
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