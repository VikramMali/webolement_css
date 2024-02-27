// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-sw.js";


// const firebaseConfig = {
//     apiKey: "AIzaSyAWw2lHIExmwY6rxcO0cSvRbyZzqQ20gJ0",
//     authDomain: "webolementio.firebaseapp.com",
//     projectId: "webolementio",
//     storageBucket: "webolementio.appspot.com",
//     messagingSenderId: "575905089667",
//     appId: "1:575905089667:web:7735b23929b7e4473673b6",
//     measurementId: "G-9D4N0GYB10"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
// onBackgroundMessage(messaging, (payload) => {
//     self.payload = payload
//     if (payload.data) {
//         var actions = []
//         var vibration = [200, 100, 200]
//         if (payload.data.messagetype == "call") {
//             vibration = [500, 250, 500, 250, 500, 250, 500, 250, 500, 250, 500]
//             actions = [
//                 {
//                     action: 'accept',
//                     title: 'Accept',
//                     icon: '/img/accept.png',
//                 },
//                 {
//                     action: 'reject',
//                     title: 'Reject',
//                     icon: '/img/reject.png',
//                 }
//             ]
//         }
//         return self.registration.showNotification(payload.data.title,
//             {
//                 body: payload.data.message,
//                 icon: payload.data.image,
//                 image: payload.data.image,
//                 data: payload.data.url,
//                 actions: actions,
//                 vibration: vibration
//             });
//     }
// });

// self.addEventListener('notificationclick', (event) => {
//     event.notification.close();
//     if (event.action === 'accept') {
//         event.notification.data = event.notification.data + "?accept"
//     }
//     if (event.action === 'reject') {
//         event.notification.data = event.notification.data + "?reject"
//     }
//     const link = event.notification.data
//     event.waitUntil(
//         clients.matchAll({ includeUncontrolled: true, type: 'window' }).then((clientList) => {
//             for (const client of clientList) {
//                 if (client.url.includes("device.webolement.io") && "focus" in client) {
//                     if (!client.url.includes(link)) {
//                         client.navigate(link)
//                     }
//                     return client.focus();
//                 }
//             }
//             if (clients.openWindow) return clients.openWindow(link);
//         })
//     );
// }, false);

const cache_name = "webolement_cache"

self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener("install", (event) => {
    self.skipWaiting();
    cacheFirstHomePage();
});

self.addEventListener("fetch", (event) => {
    if ((event.request.url.includes(location.origin + "googleapis"))) {
        return
    } else if ((event.request.url == location.origin + "/test") ||
        (event.request.url == location.origin + "/login") ||
        (event.request.url == location.origin + "/verify") ||
        (event.request.url == location.origin + "/employees") ||
        (event.request.url == location.origin + "/photo") ||
        (event.request.url == location.origin + "/account_settings") ||
        (event.request.url == location.origin + "/organizations") ||
        (event.request.url == location.origin + "/branches") ||
        (event.request.url == location.origin + "/departments") ||
        (event.request.url == location.origin + "/positions") ||
        (event.request.url == location.origin + "/holidays") ||
        (event.request.url == location.origin + "/attendance_settings") ||
        (event.request.url == location.origin + "/account") ||
        (event.request.url == location.origin + "/add_employee") ||
        (event.request.url.includes(location.origin + "/employee")) ||
        (event.request.url.includes(location.origin + "/organization")) ||
        (event.request.url.includes(location.origin + "/branch")) ||
        (event.request.url.includes(location.origin + "/department")) ||
        (event.request.url.includes(location.origin + "/position")) ||
        (event.request.url.includes(location.origin + "/holiday"))
    ) {
        event.respondWith(cacheFirstHomePage());
    } else if (event.request.url.includes("/updatecache__")) {
        event.respondWith(updatecache(event));
    } else if (event.request.method != "POST" && event.request.method != "PUT" && event.request.method != "DELETE" && event.request.url.includes("webolement.com") && !event.request.url.includes("/api/")) {
        event.respondWith(cacheFirst(event));
    }
});

const updatecache = async (event) => {
    const data = await event.request.json();
    try {
        removeFromCache(data.url)
        const update_sufix = "?time=" + Date.now()
        const responseFromNetwork = await fetch(data.url + update_sufix);
        const newResponce = new Response(responseFromNetwork.body, {
            "bodyUsed": responseFromNetwork.bodyUsed,
            "status": responseFromNetwork.status,
            "headers": responseFromNetwork.headers,
            "ok": responseFromNetwork.ok,
            "statusText": responseFromNetwork.statusText,
            "type": responseFromNetwork.type,
            "url": data.url,
        })
        await putInCache(data.url, newResponce);
        return new Response(JSON.stringify({ "Status": 2, "Result": {} }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        // when even the fallback response is not available,
        // there is nothing we can do, but we must always
        // return a Response object
        return new Response(JSON.stringify({ "Status": 1, "Message": 'Network error happened :' + error.message, "Result": {} }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}

const cacheFirstHomePage = async () => {
    const responseFromCache = await caches.match("/");
    if (responseFromCache) {
        return responseFromCache;
    }
    var response = false
    if (!response) {
        response = await fetch("/");
    }
    if (response) {
        putInCache("/", response.clone());
        return response;
    }
};

const cacheFirst = async (event) => {
    const responseFromCache = await caches.match(event.request);
    if (responseFromCache) {
        return responseFromCache;
    }
    try {
        var response = false
        if (event.preloadResponse) {
            response = await event.preloadResponse;
        }
        if (!response) {
            response = await fetch(event.request);
        }
        if (response) {
            putInCache(event.request, response.clone());
            return response;
        }
    } catch (error) {
        return new Response(JSON.stringify({ "Status": 1, "Message": 'Network error happened :' + error.message, "Result": {} }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
    const rollbackResponseFromCache = await caches.match("/");
    if (responseFromCache) {
        return responseFromCache;
    }
};

const putInCache = async (request, response) => {
    if (response.status == 206) {
        return
    }
    const cache = await caches.open(cache_name);
    await cache.put(request, response);
};

const removeFromCache = async (request) => {
    const cache = await caches.open(cache_name);
    await cache.delete(request);
};

// Enable navigation preload
const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
    }
};

// Disable navigation preload
const disableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.disable();
    }
    const keyList = await caches.keys()
    keyList.map((key) => {
        if (key != cache_name) {
            caches.delete(key);
        }
    })
};