if (workbox) {
    console.log('Yay! Workbox is loaded 🎉');
    
    workbox.routing.registerRoute(
        /^https:\/\/storage.googleapis.com\/workbox-cdn\/releases\/3.6.3\/workbox-sw.js/,
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        /^\/precache-manifest.*$/,
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        /^https:\/\/songbookclient-dev.herokuapp.com\/.*$/,
        workbox.strategies.cacheFirst()
    );

    // cache static assets
    workbox.routing.registerRoute(
        /\.(?:js|css|html)$/,
        workbox.strategies.cacheFirst()
    );

    // cache dynamic assets
    workbox.routing.registerRoute(
        /^https:\/\/songbookserver-dev.herokuapp.com\/.*$/,
        workbox.strategies.cacheFirst()
    );

} else {
    console.log('Boo! Workbox didn\'t load 😬');
}