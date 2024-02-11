"use client";

import { urlBase64ToUint8Array } from "@/utils/helpers";

const PushNotification = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.error("Error registering service worker:", error);
    });
  }

  if ("Notification" in window && "serviceWorker" in navigator) {
    let reg: ServiceWorkerRegistration;
    Notification.requestPermission((result) => {
      if (result !== "granted") return;

      navigator.serviceWorker.ready
        .then((swreg) => {
          reg = swreg;
          return swreg.pushManager.getSubscription();
        })
        .then((sub) => {
          if (sub !== null) return;

          // Creating a push subscription
          const covertedPublicVapidKey = urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_PUBLIC_VAPID_KEY as string
          );

          return reg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: covertedPublicVapidKey,
            })
            .then((newSub) => {
              return fetch("/api/push", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify(newSub),
              });
            })
            .catch((err) => {
              console.log("err", err);
            });
        });

      //
    });
  }

  return null;
};

export default PushNotification;