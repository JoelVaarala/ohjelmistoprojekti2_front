//import { auth } from 'firebase-admin';
import React from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
//import firebase from
import './Globaalit';
import firebase from 'react-native-firebase';
import firestore from '@react-native-firebase/firestore';
import * as Location from 'expo-location';
import functions from '@react-native-firebase/functions';
import styles from '../styles';

// import  'firebaseconfig';
//import { firebaseConfig } from 'firebase-functions';
var firebaseConfig = {
  apiKey: 'AIzaSyCSaMZ5QC9BM8UGMssDrasyfVz7ZQuJ9jk',
  authDomain: 'ohpro2-f30e5.firebaseapp.com',
  databaseURL: 'https://ohpro2-f30e5.firebaseio.com',
  projectId: 'ohpro2-f30e5',
  storageBucket: 'ohpro2-f30e5.appspot.com',
  messagingSenderId: '670372768079',
  appId: '1:670372768079:web:1ed4eb81ee4c5e6b67bd3a',
  measurementId: 'G-D5W1V0RGK8'
};

export default function Startup({ navigation }) {
  // console.log('navigation: ')
  // console.log(navigation)
  const [kayttaja, setKayttaja] = React.useState('user@example.com');
  const [salasana, setSalasana] = React.useState('secretPassword');
  const [msg, setMsg] = React.useState('');
  const [isRegisterScreen, setIsRegisterScreen] = React.useState(true);
  const [vaihto, setVaihto] = React.useState(true);

  global.fbtoken = '';

  React.useEffect(() => {
    //firebase.initializeApp()
    firebase.initializeApp(firebaseConfig);
    // firestore().settings({ host: 'localhost:8080',  ssl: false });

    login();
  }, []);

  function UpdateLocation() {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await (await Location.getCurrentPositionAsync({})).coords;
      UpdateFirebase(location);
    })();
  }

  //tää menee endpointin kautta.
  function UpdateFirebase(newloc) {
    let bodii = {
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
      data: {
        latitude: newloc.latitude,
        longitude: newloc.longitude
      }
    };

    // return;
    fetch(global.url + 'updateLocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodii)
    })
      .then((response) => response.json())
      // .then(response => console.log(response))
      .then((data) => {
        console.log('Updated location');
      })
      .catch((err) => console.error(err));
    //palauttaa asynscista arrayn, sijoitetaan swipettaviin.
  }

  const login = () => {
    auth()
      .signInWithEmailAndPassword(kayttaja, salasana)
      .then(() => {
        console.log('User logged in');
        // console.log(auth().currentUser)
        global.myUserData.uid = auth().currentUser.uid;
        auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            global.myUserData.idToken = idToken;
          })
          .catch(function (error) {
            // Handle error
          });
        UpdateLocation();
        //Debugin takia tässä, poistettu 28.9.2020
        //LahetaViestiFirebaseen();
      })

      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    //auth().
    // console.log(url);
  };

  const yritaKirjautua = async () => {
    try {
      let value = await AsyncStorage.getItem('kirjautumisTiedot');
      console.log('asyncista tullut:' + value);
      if (value != null) {
        global.fbtoken = value;
        setIsRegisterScreen(false);
        // setVaihto(false);
        // onkoTokenVanhentunut(value);
      } else {
        //setVaihto(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tallennaToken = async (data) => {
    try {
      await AsyncStorage.setItem('tokenKey', data);
      props.onkoToken();
    } catch (error) {
      console.log('Async error: ' + error);
    }
  };

  //https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
  //hakee käyttäjän webbtokenin jota tarvitaan kun lähetetään viestejä, swipejä tms backendpalvelimelle.
  function testausta() {
    auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        // ...
        tallennaToken(idToken); //tallennetaan asyncciin, voitas kyl tallentaa vaikka globaliin myös?
      })
      .catch(function (error) {
        // Handle error
      });
  }

  return (
    <View>
      <Input
        containerStyle={styles.paddingTopHundred}
        lable="Käyttäjätunnus"
        placeholder="Käyttäjätunnus"
        onChangeText={(kayttaja) => setKayttaja(kayttaja)}
        value={kayttaja}
      />
      <Input
        lable="Salasana"
        placeholder="Salasana"
        secureTextEntry={true}
        onChangeText={(salasana) => setSalasana(salasana)}
        value={salasana}
      />
      <Button
        buttonStyle={{ backgroundColor: 'black' }}
        onPress={login}
        title="Login"
        containerStyle={styles.paddingHorizontalTen}
      />
      <Text>{msg}</Text>

      <Button
        buttonStyle={{ backgroundColor: 'black' }}
        onPress={() => navigation.navigate('Rekisteröidy')}
        title="REKISTERÖIDYaaaaaaa"
        containerStyle={styles.paddingHorizontalTen}
      />
    </View>
  );
}
