import React from "react";

import firebase from "firebase";
import { firebaseConfig } from "./components/config.js";
import { Navigator } from "./routes/Navigator";

export default function App() {
  return <Navigator />;
}
