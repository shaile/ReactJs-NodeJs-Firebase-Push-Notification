import logo from "./logo.svg";
import "./App.css";

import { getMessaging, onMessage } from "firebase/messaging";
import Notification from "./Notification";

function App() {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });

  return (
    <div className="App">
      <Notification />
    </div>
  );
}

export default App;

