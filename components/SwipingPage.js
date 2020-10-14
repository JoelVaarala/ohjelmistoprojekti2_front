import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import SwipeCards from "./SwipeCards";
import * as Location from 'expo-location';
import styles from '../styles';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function SwipingPage({ navigation, route }) {

  [swipettavat, setSwipettavat] = React.useState([]);

  //ratkaistava vielä se että swipettavat ei päivity swipecardsiin.

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      //console.log(firebase.auth().currentUser)
      HaeSwipettaviaBackista();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  function HaeSwipettaviaBackista() {
    //Connectaa endpointiin, lähettää parametrinä omat hakutoiveet. Vaihtoehtona että bäkki itse noutas firebasesta mutta ei kai tarpeen?
    console.log("Hae swipettäviä")
    console.log(global.url + "findSwipeables")
    let bodii =  {
      "uid" : "qREmoPw72NRHB2JA6uBCKJyuWhY2",
      "tags" : ["perunat"]
  }
    fetch(global.url + "findSwipeables", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodii)
    })
      .then(response => response.json())
      // .then(response => console.log(response))
      .then(data => {
        console.log(data)
        setSwipettavat(data.result)
        console.log(data.result)
      })
      .catch(err => console.error(err))
    //palauttaa asynscista arrayn, sijoitetaan swipettaviin.
  }

  function LuoSwipecardi() {
    //Tällä saadaan päiviettyä nää shitit oikeasti statesta.
    return (
      <SwipeCards vaihtoehdot={swipettavat} />
    )
  }

  return (
    <View style={styles.container, styles.containerMarginLeft, styles.containerBackground, styles.containerPaddingTop}>
      <View style={styles.iconLocation}>
        {/* <SwipeCards vaihtoehdot={swipettavat} /> */}
        <LuoSwipecardi />
      </View>
      <View style={styles.iconSpacebetween}>
        <View style={styles.iconPadding}>
          <Icon size={27} reverse name="cancel" />
        </View>
        <View style={styles.iconPadding}>
          <Icon size={27} reverse name="info" />
        </View>
        <View style={styles.iconPadding}>
          <Icon size={27} reverse name="favorite" />
        </View>
      </View>
    </View>
  );
}

