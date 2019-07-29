if (workbox) {
    console.log('Yay! Workbox is loaded 🎉');

    workbox.routing.registerRoute(
        /^https:\/\/songbookclient-dev.herokuapp.com\/.*$/,
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        /\.(?:js|css|html)$/,
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        /^https:\/\/songbookserver-dev.herokuapp.com\/.*$/,
        workbox.strategies.StaleWhileRevalidate()
    );

} else {
    console.log('Boo! Workbox didn\'t load 😬');
}