import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { Avatar, ListItem, Overlay, Button, ThemeProvider, ButtonGroup } from "react-native-elements";

import Carousel2 from "./Carousel";
import firebase from "firebase";
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
import styles from "../styles";

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Profile({ navigation, route }, props) {
  const [user, setUser] = React.useState({
    name: "nimi",
    age: "ikä",
    bio: "bio",
  });
  const [event, setEvent] = React.useState({
    name: "nimi",
    bio: "bio",
  });
  const [type, setType] = React.useState("");
  const [pics, setPics] = React.useState([]);
  const [eventInfo, setEventInfo] = React.useState({ participiants: [{ images: ["https://randomuser.me/api/portraits/med/women/1.jpg"] }] });
  // true -> display user __ false -> display event
  const [view, setView] = React.useState(true);
  const buttons = ["Osallistujat", "Jonossa"];

  const [selectedIndex, setSelectedIndex] = React.useState({ main: 2 });

  function updateIndex(name, value) {
    setSelectedIndex({ ...selectedIndex, [name]: value });
    console.log(name + ": " + value);
  }

  const theme = {
    colors: {
      primary: "black",
    },
  };
  let doc = route.params.chet;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //console.log("Listener")
      //console.log(firebase.auth().currentUser)
      //setPics();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    //console.log('useEffect chat.js saatu id : ' , props)

    haeTiedot();
    console.log("käyttäj id ", firebase.auth().currentUser.uid);
    console.log("Profile.js useEffect (route.params.match) = ", route.params.match);
    console.log("Profile.js useEfect (route.params.chet) = ", route.params.chet);
  }, []);

  //haetaan infot firebasesta

  async function haeTiedot() {
    const find = await firebase.firestore().collection("matches").doc(doc);
    find.onSnapshot((query) => {
      let matchType = query.data().matchType;
      setType(matchType);
      let user = "";
      if (matchType == "user") {
        console.log("user löytyi");
        query.data().users.forEach((element) => {
          console.log("forEach ", element);
          if (element != firebase.auth().currentUser.uid) {
            user = element;
          }
        });

        haeUser(user);
      } else if (matchType == "event") {
        console.log("event löytyi");
        haeEvent();
      }
    });
  }

  async function haeUser(user) {
    const ref = await firebase.firestore().collection("users").doc(user);
    ref.onSnapshot((qr) => {
      // tiedot viedään userStateen
      let name_f = qr.data().displayName;
      let age_f = qr.data().age;
      let bio_f = qr.data().bio;
      setUser({ name: name_f, age: age_f, bio: bio_f });
      console.log("id from haeUser : ", qr.id);
      setPics(qr.data().images);
    });
  }

  async function haeEvent() {
    const ref = await firebase.firestore().collection("events").doc(route.params.chet);
    ref.onSnapshot((qr) => {
      // tiedot viedään userStateen
      let name_f = qr.data().displayName;
      let bio_f = qr.data().bio;
      setEvent({ name: name_f, bio: bio_f });
      setView(false);
      console.log("id from haeEvent : ", qr.id);
    });
  }

  {
    /*
    React.useEffect(() => {
          //console.log(firebase.auth().currentUser)
          HaeKayttaja();
        });

        

    function HaeKayttaja() {
        let bodii =  {
            "uid" : "qREmoPw72NRHB2JA6uBCKJyuWhY2",
            "tags" : ["perunat"]
        }
    fetch(global.url + "profileUpdate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodii)
      })
        .then(response => response.json())
        // .then(response => console.log(response))
        .then(data => {
          setUser(
            name = "nimi",
            age = "ikä",
            bio = "bio")
          console.log(data.result)
        })
        .catch(err => console.error(err))
      //palauttaa asynscista arrayn, sijoitetaan swipettaviin.
    } */
  }

  // ScrollView returnnin ympärille mahd mahd
  const renderView = () => {
    return <Text>moi</Text>;
  };

  //ainoastaan eventin omistaja näkee buttonin jolla voi kickata osallistujan
  function Jooh() {
    {
      return eventInfo.participiants.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={{ uri: l.images[0] }} />
          <ListItem.Content>
            <View>
              <ListItem.Title>{l.displayName} Nimi</ListItem.Title>

              <ListItem.Subtitle>ikä</ListItem.Subtitle>
            </View>
          </ListItem.Content>
          <View style={styles.viewLikersItemContent}>
            <Button //tää on kicki button
              type="outline"
              raised={true}
              onPress={() => Accept(false, l.uid)}
              icon={{
                name: "arrow-right",
                size: 30,
                color: "red",
              }}
            />
          </View>
        </ListItem>
      ));
    }
  }

  return (
    <View style={[styles.alignItemsCenter, styles.background]}>
      {view ? (
        <View style={[styles.alignItemsCenter, styles.flexThree]}>
          <Carousel2
            kuvat={pics}
            style={
              styles.flexOne
              //styles.carouselImageSize
            }
          />
        </View>
      ) : (
        <View>{/* Tähän eventille kuva systeemit, kun eventin tiedoista niitä alkaa löytymään*/}</View>
      )}

      <View style={styles.flexThree}>
        {view ? (
          <View>
            <Text style={styles.userTextStyle}>
              {user.name}, {user.age}
            </Text>
            <Text style={styles.tagTextInput}>{user.bio}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.userTextStyle}>{event.name}</Text>
            <Text style={styles.userBioStyle}>{event.bio}</Text>
            <ThemeProvider theme={theme}>
              {/* <ButtonGroup
          onPress={(value) => updateIndex("main", value)}
          selectedIndex={selectedIndex.main}
          buttons={buttons}
          containerStyle={[styles.background, styles.heightForty]}
        /> */}
              <ButtonGroup
                onPress={(value) => updateIndex("main", value)}
                selectedIndex={selectedIndex.main}
                buttons={buttons}
                containerStyle={[styles.background, styles.heightForty]}
              />
            </ThemeProvider>
            <Jooh></Jooh>
          </View>
        )}
      </View>

      {/* <ScrollView>{view ? (<Text>true</Text>) : (<Text>false</Text>)} </ScrollView> */}
    </View>
  );
}
