import 'react-native-gesture-handler';
import React from "react";

import { Navigator } from "./routes/Navigator";

import firebase from "firebase";

import { firebaseConfig } from "./components/config";
firebase.initializeApp(firebaseConfig);

export default function App() {
  return <Navigator />;
}
