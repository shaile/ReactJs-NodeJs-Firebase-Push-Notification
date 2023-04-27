import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestForToken, onMessageListener } from "./firebase";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    if (notification?.title) {
      console.log("notification", notification);
    }
  }, []);

  requestForToken();

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <>
      {notification.title && (
        <Toast>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{notification?.title}</strong>
          </Toast.Header>
          <Toast.Body>{notification?.body}</Toast.Body>
        </Toast>
      )}
    </>
  );
};

export default Notification;
