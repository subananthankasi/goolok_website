importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDfz5LU7sQ_TdgU4lRmJxI-jyF19TYAafc", 
  authDomain: "goolok-a46f8.firebaseapp.com",
  projectId: "goolok-a46f8",
  storageBucket: "goolok-a46f8.firebasestorage.app",
  messagingSenderId: "764743799011",
  appId: "1:764743799011:web:d9c9b6c7e9f754cd9bf5d6",
  measurementId: "G-ZMKXC843SG",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "New Message";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new notification!",
    icon: "/firebase-logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
