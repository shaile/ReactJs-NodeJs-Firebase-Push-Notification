/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA0a9lpR53oUWASZj5ILIbQdo6BoTglSH0",
  authDomain: "expensify-e6d16.firebaseapp.com",
  databaseURL: "https://expensify-e6d16.firebaseio.com",
  projectId: "expensify-e6d16",
  storageBucket: "expensify-e6d16.appspot.com",
  messagingSenderId: "372350727203",
  appId: "1:372350727203:web:7d3fb47af8c37da936ad96",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

function onMessageListener() {
  console.log("onMessage payload");
  new Promise((resolve) => {
    messaging.onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
}

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message BY BACK ", payload);
  // onMessageListener();
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("notificationclick", (event) => {
  console.log("Received background message BY BACK addEventListener", payload);
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});

messaging.onMessage((payload) => {
  console.log("dddddddd");
  const { title, ...options } = payload.notification;
  navigator.serviceWorker.ready.then((registration) => {
    registration.showNotification(title, options);
    console.log("dddddddd", title);
  });
});
