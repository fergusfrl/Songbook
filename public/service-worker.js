if (workbox) {
    console.log('Yay! Workbox is loaded 🎉');

    workbox.routing.registerRoute(
        'https://songbookclient.herokuapp.com/',
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        /\.(?:js|css|html)$/,
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        /^https:\/\/songbookserver.herokuapp.com\/graphql\/.*$/,
        workbox.strategies.networkFirst()
    );

} else {
    console.log('Boo! Workbox didn\'t load 😬');
}