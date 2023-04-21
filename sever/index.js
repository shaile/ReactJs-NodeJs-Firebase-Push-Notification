const express = require("express");
const admin = require("firebase-admin");
const app = express();
const port = 8080;

// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/sendNotification", async (req, res) => {
  console.log("req", req.body);
  const registrationToken =
    "dp3LI1-Ta4JRVMAyZCmOzq:APA91bG5PBmtUHMFdg3HD50bEgozOrOfX6M-H35xUibhz5b2R-40TuVZ18bhVMWfD-aCqUHHQBzbe5lkh8hPgyyj7nqjLZcNPfpbWj2uM2DkKV7Th5Yq7OnRLjruJuEfE_ZDlCifIPB7"; // req.body.registrationToken;
  const message = {
    notification: {
      title: "Title of the notification",
      body: "Body of the notification",
    },
    token: registrationToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    res.status(200).send("Notification sent");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Error sending notification");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
