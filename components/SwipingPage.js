import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import SwipeCards from "./SwipeCards";
import * as Location from 'expo-location';

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


  async function HaeSwipettaviaBackista() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await (await Location.getCurrentPositionAsync({})).coords;
    //Connectaa endpointiin, lähettää parametrinä omat hakutoiveet. Vaihtoehtona että bäkki itse noutas firebasesta mutta ei kai tarpeen?
    console.log("Hae swipettäviä")
    console.log(global.myUserData)
    global.myUserData.filters.myLocation.latitude = location.latitude;
    global.myUserData.filters.myLocation.longitude = location.longitude;


    let bodii = {
      "uid": global.myUserData.uid,
      "idToken": global.myUserData.idToken,
      "data": global.myUserData.filters
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
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        {/* <SwipeCards vaihtoehdot={swipettavat} /> */}
        <LuoSwipecardi />
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
        <View style={styles.icons}>
          <Icon size={27} reverse name="cancel" />
        </View>
        <View style={styles.icons}>
          <Icon size={27} reverse name="info" />
        </View>
        <View style={styles.icons}>
          <Icon size={27} reverse name="favorite" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  icons: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
});
