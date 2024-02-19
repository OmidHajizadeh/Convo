/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope;

//! Insall Event:
sw.addEventListener("install", (event) => {
  event.waitUntil(sw.skipWaiting());
  console.log("[ServiceWorker]: Installed");
});

//! Activate Event:
sw.addEventListener("activate", function (event) {
  console.log("[ServiceWorker]: Activated");

  return sw.clients.claim();
});

//! Push Event:
type PushMessage = {
  title: string;
  body: string;
  tag: "system-notification" | "new-message";
  image?: string;
  url: string;
};

sw.addEventListener("push", async (event) => {
  if (!event.data) return;
  const message: PushMessage = JSON.parse(event.data.text());
  const isWindowOpen = await checkClientIsVisible();

  if (!isWindowOpen) {
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
  }
});

//! Notification Click Handler Event:
sw.addEventListener("notificationclick", (event) => {
  sw.clients.openWindow(event.notification.data.url);
});

//! Utility Functions:
async function checkClientIsVisible(): Promise<boolean> {
  const windowClients = await sw.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  for (var i = 0; i < windowClients.length; i++) {
    if (windowClients[i].visibilityState === "visible") {
      return true;
    }
  }

  return false;
}
