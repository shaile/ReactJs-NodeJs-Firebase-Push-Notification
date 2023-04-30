const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const googleAuth = require("google-auth-library");
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

const jsonParser = bodyParser.json();
// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://expensify-e6d16.firebaseio.com",
});

app.post("/firebase/sendNotification", jsonParser, async (req, res) => {
  const registrationToken = req.body.registrationToken;
  console.log("registrationToken", registrationToken);
  const message = {
    notification: {
      title: req.body.title,
      body: req.body.message,
    },
    token: registrationToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", admin.messaging());
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(200).send(error?.response?.data?.error);
  }
});

app.post("/sendNotification", jsonParser, async (req, res) => {
  const projectId = "expensify-e6d16";
  const registrationToken = req.body.registrationToken;

  const jwt = new googleAuth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    ["https://www.googleapis.com/auth/firebase.messaging"],
    null
  );
  const tokens = await jwt.authorize();
  const authorizationHeader = `Bearer ${tokens.access_token}`;

  try {
    const response = await axios.post(
      `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
      {
        message: {
          notification: {
            title: req.body.title,
            body: req.body.message,
          },
          webpush: {
            fcmOptions: {
              link: "http://localhost:8000",
            },
            notification: {
              icon: "https://picsum.photos/200",
            },
          },
          token: registrationToken,
        },
      },
      {
        headers: {
          Authorization: authorizationHeader,
        },
      }
    );
    console.log("Notification sent");
    response.data.message = "Notification sent";
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Notification sent error!");
    res.status(200).send(error?.response?.data?.error);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
