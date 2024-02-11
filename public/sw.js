/// <reference lib="webworker" />
var sw = self;
//! Insall Event:
sw.addEventListener("install", function (event) {
    sw.skipWaiting();
    console.log("[ServiceWorker]: Installed");
});
//! Activate Event:
sw.addEventListener("activate", function (event) {
    console.log("[ServiceWorker]: Activated");
    return sw.clients.claim();
});
sw.addEventListener("push", function (event) {
    if (!event.data)
        return;
    var message = JSON.parse(event.data.text());
    sw.registration.showNotification(message.title, {
        icon: message.image || "/manifest-assets/icon-192x192.png",
        badge: "/manifest-assets/icon-96x96.png",
        dir: "rtl",
        tag: message.tag,
        body: message.body,
        data: {
            url: message.url,
        },
    });
});
sw.addEventListener("notificationclick", function (event) {
    var notification = event.notification;
    // event.waitUntil(
    //   clients.matchAll().then((clients) => {
    //     const client = clients.find(
    //       (client) => client.visisbilityState === "visible"
    //     );
    //     if (client !== undefined) {
    //       client.navigate(notification.data.url);
    //     } else {
    //       client.openWindow(notification.data.url);
    //     }
    //     notification.close();
    //   })
    // );
    //
});
