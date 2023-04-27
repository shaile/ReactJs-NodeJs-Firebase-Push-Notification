const { default: axios } = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const app = express();
const port = 8080;

const registrationToken =
  "crRdd-hbYW7DYA_AUtXAVC:APA91bHX85U-l5Lk7anJiio5WdqshDeJAC4yxxj5Vy-qxaF6pOzjS_Ufohy932w9KPCrqDYVfU-tGlraAjiMZlOqLpU_31ANI-T-Qna7OawxQBmtsUfzuIQQbEVc3K1UBeCVZye-TWan";

app.use(bodyParser.urlencoded({ extended: true }));
// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://expensify-e6d16.firebaseio.com",
});

async function doPostRequest(req, res) {
  // req.body.registrationToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "bearer BMoRJ_9V-gRyCruqkEjcWFgrcNP3ttWEqchciMq-a7s0ps4vR8XPMYgqncVXkY_hpIHF_FKL4ToSPJ1-WL0FJw8",
  };

  const data = {
    message: {
      token: registrationToken,
      notification: {
        title: "Background Message Title",
        body: "Background message body",
      },
      webpush: {
        fcm_options: {
          link: "http://localhost:3002/",
        },
      },
    },
  };
  try {
    const response = await axios.post(
      "https://fcm.googleapis.com/v1/projects/expensify-e6d16/messages:send",
      {
        notification: {
          title: "Background Message Title sound",
          body: "Background message body sound",
          sound: "default",
        },
        token: registrationToken,
        priority: "high",
        // webpush: {
        //   fcm_options: {
        //     link: "http://localhost:3002/",
        //   },
        // },
      },

      {
        headers: headers,
      }
    );
    console.log("Successfully sent message:", response);
    res.status(200).send("Notification sent");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Error sending notification");
  }
}

// app.post("/sendNotification", async (req, res) => {
//   doPostRequest(req, res);
//   // console.log("req", req.body);
//   // const registrationToken =
//   //   "crRdd-hbYW7DYA_AUtXAVC:APA91bHX85U-l5Lk7anJiio5WdqshDeJAC4yxxj5Vy-qxaF6pOzjS_Ufohy932w9KPCrqDYVfU-tGlraAjiMZlOqLpU_31ANI-T-Qna7OawxQBmtsUfzuIQQbEVc3K1UBeCVZye-TWan"; // req.body.registrationToken;
//   // const message = {
//   //   notification: {
//   //     title:
//   //       "Title of the notification GALXY" + Math.floor(Math.random() * 1220),
//   //     body: "Body of the notification GALXY" + Math.floor(Math.random() * 1220),
//   //   },
//   //   token: registrationToken,
//   // };

//   // try {
//   //   const response = await admin.messaging().send(message);
//   //   console.log("Successfully sent message:", admin.messaging());
//   //   res.status(200).send("Notification sent");
//   // } catch (error) {
//   //   console.error("Error sending message:", error);
//   //   res.status(500).send("Error sending notification");
//   // }
// });

// const sendPushNotification = (req, res) => {
//   // console.log("sending....", req.body);
//   // res.status(200).send(JSON.stringify(req));
//   // res.sendStatus(200);
//   const title = "Order Number #nvfg";
//   const body = "New Order for Beer ONE ewew";
//   const token =
//     "crRdd-hbYW7DYA_AUtXAVC:APA91bHX85U-l5Lk7anJiio5WdqshDeJAC4yxxj5Vy-qxaF6pOzjS_Ufohy932w9KPCrqDYVfU-tGlraAjiMZlOqLpU_31ANI-T-Qna7OawxQBmtsUfzuIQQbEVc3K1UBeCVZye-TWan"; // req.body.registrationToken;

//   // console.log("sending....", req);
//   let data = {
//     notification: {
//       title: title,
//       body: body,
//       // icon: icon,
//       priority: "high",
//     },
//     to: token,
//     direct_boot_ok: true,
//   };
//   const serverKey =
//     "AAAAVrHVNCM:APA91bE_Hy5aBvqTxe9ZLK0NS3XUdAhVaL5Ox-lj5YfUitavsJ399V0VUr1wajZaxl_xQ_ntEHaNKvMMnkV6EXm_xtNpIm1nTWibJmqppbcdVoGfMBwLPHfa-BX9ixLRNwaMPPH54E3YdOn-L-Z9PM6BNEWM9ltAXg";

//   axios.defaults.baseURL = "https://fcm.googleapis.com";
//   axios.defaults.headers.common["Authorization"] = "key=" + serverKey;
//   axios.defaults.headers.post["Content-Type"] = "application/json";

//   axios({
//     method: "post",
//     url: "/fcm/send",
//     data: data,
//   })
//     .then(function (response) {
//       console.log(response);
//       res.status(200).send("Notification sent");
//     })
//     .catch(function (error) {
//       console.log(error);
//       res.status(500).send("Notification Error");
//     });
// };

function sendNotificationTopic(req, res) {
  const messages = [];
  messages.push({
    notification: { title: "Price drop", body: "5% off all electronics" },
    token: registrationToken,
  });
  messages.push({
    notification: { title: "Price drop", body: "2% off all books" },
    topic: "readers-club",
  });

  getMessaging()
    .sendAll(messages)
    .then((response) => {
      console.log(response.successCount + " messages were sent successfully");
      res.status(200).send(`${response.successCount}    -- Notification sent`);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Notification Error");
    });
}
app.post("/sendNotification", async (req, res) => {
  sendPushNotification(req, res);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
