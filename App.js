import "react-native-gesture-handler"; //Tää pitää olla päälimmäisenä koska syyt?
import React from "react";
import firebase from "firebase";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import "./components/Globaalit";
import Navigation from "./components/Navigation";

firebase.initializeApp(global.firebaseConfig);

export default function App() {
  
    return (
        <Provider store={store}>
          <Navigation/>
        </Provider>
    );

}
