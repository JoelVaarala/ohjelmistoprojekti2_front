import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon, ButtonGroup, ThemeProvider } from "react-native-elements";
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
    global.myUserData.filters.myLocation.latitude = location.latitude;
    global.myUserData.filters.myLocation.longitude = location.longitude;


    let bodii = {
      "uid": global.myUserData.uid,
      "idToken": global.myUserData.idToken,
      "data": global.myUserData.filters
    }

    console.log(bodii)
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
        console.log("Find results:")
        //console.log(data)
        console.log(data.result)
        setSwipettavat(data.result)
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

  //Nämä ovat ButtonGroupille
  function updateIndex(name, value) {
    setSelectedIndex({ ...selectedIndex, [name]: value })
    console.log(name + ': ' + value)
  }

  const buttons = ['Users', 'Events', 'Both']
  const subButtons = ['Open', 'Public', 'Private']
  const [selectedIndex, setSelectedIndex] = React.useState({ main: 2, sub: [1] });


  const theme = {
    colors: {
      primary: 'orange'
    }
    
  }

  return (
    <View style={styles.container}>
      <ThemeProvider theme={theme}>

        <ButtonGroup
          onPress={value => updateIndex('main', value)}
          selectedIndex={selectedIndex.main}
          buttons={buttons}
          containerStyle={{ height: 40 }}

        />
        {selectedIndex.main != 0 ? (
          <ButtonGroup
            onPress={value => updateIndex('sub', value)}
            selectMultiple={true}
            selectedIndexes={selectedIndex.sub}
            buttons={subButtons}
            containerStyle={{ height: 40 }}
            style={{ paddingBottom: 50 }}
          />
        ) : (null)}
      </ThemeProvider>

      <View style={{ flex: 1, justifyContent: "flex-start", paddingTop: 50 }}>
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
    paddingTop: 0,
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
