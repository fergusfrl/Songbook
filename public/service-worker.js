if (workbox) {
    console.log('Yay! Workbox is loaded 🎉');

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