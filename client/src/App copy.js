import logo from "./logo.svg";
import "./App.css";

import { Button, Row, Col, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyA0a9lpR53oUWASZj5ILIbQdo6BoTglSH0",
    authDomain: "expensify-e6d16.firebaseapp.com",
    databaseURL: "https://expensify-e6d16.firebaseio.com",
    projectId: "expensify-e6d16",
    storageBucket: "expensify-e6d16.appspot.com",
    messagingSenderId: "372350727203",
    appId: "1:372350727203:web:7d3fb47af8c37da936ad96",
  };
  const firebaseApp = initializeApp(firebaseConfig);
  // Get the messaging instance

  const messaging = getMessaging(firebaseApp);

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      getToken(messaging, {
        vapidKey:
          "fdMkLcQQxFZe7XVwuJ9AFD:APA91bGAfjeAd1dhhfWwhsx6j4Ik_lGXGGepmypm4t6fTTXLt7Tnb2rMkixUVXzxnd85_OuH1urGP6IRlIn-FpmxXAnO1Q_Q_cF2mYlLtmvzHiX0_u4mV7o_vnwhxtWaWe3aaW5VzEv9",
      })
        .then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            console.log("currentToken", currentToken);
            setTokenFound(currentToken);
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
    }
  });

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    setShow(true);
    setNotification({
      title: payload.notification.title,
      body: payload.notification.body,
    });
    console.log(payload);
  });

  useEffect(() => {
    if (notification?.title) {
      console.log(notification);
    }
  }, [notification]);

  return (
    <div className="App">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          minWidth: 200,
        }}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </header>
    </div>
  );
}

export default App;

