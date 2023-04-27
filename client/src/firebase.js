// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0a9lpR53oUWASZj5ILIbQdo6BoTglSH0",
  authDomain: "expensify-e6d16.firebaseapp.com",
  databaseURL: "https://expensify-e6d16.firebaseio.com",
  projectId: "expensify-e6d16",
  storageBucket: "expensify-e6d16.appspot.com",
  messagingSenderId: "372350727203",
  appId: "1:372350727203:web:7d3fb47af8c37da936ad96",
};

// Initialize Firebase
const appmessage = initializeApp(firebaseConfig);

const messaging = getMessaging(appmessage);

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BMoRJ_9V-gRyCruqkEjcWFgrcNP3ttWEqchciMq-a7s0ps4vR8XPMYgqncVXkY_hpIHF_FKL4ToSPJ1-WL0FJw8",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
