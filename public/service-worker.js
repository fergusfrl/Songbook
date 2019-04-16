if (workbox) {
    console.log('Yay! Workbox is loaded 🎉');

    workbox.routing.registerRoute(
        'http://localhost:5000/',
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        /\.(?:js|css|html)$/,
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        /^http:\/\/localhost:3001\/.*$/,
        workbox.strategies.cacheFirst()
    );

} else {
    console.log('Boo! Workbox didn\'t load 😬');
}