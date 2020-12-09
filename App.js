import "react-native-gesture-handler";
import React from "react";
import firebase from "firebase";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import "./components/Globaalit";
import Navigation from "./components/Navigation";

// connect to firebase
firebase.initializeApp(global.firebaseConfig);

export default function App() {
  
    return (
      // redux
        <Provider store={store}>
          <Navigation/>
        </Provider>
    );

}
