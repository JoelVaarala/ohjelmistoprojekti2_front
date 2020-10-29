import React from "react";
import { SafeAreaView, View, FlatList, StatusBar, Image, Text, Picker } from "react-native";
import { Avatar, ListItem, Overlay, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import firestore from "@react-native-firebase/firestore";
import styles from "../styles";

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function ViewLikers({ navigation, route }) {
  const [selectedEvent, setEvent] = React.useState("");
  const [myEvents, setMyEvents] = React.useState([]); //listaa eventit
  const [peoplesWhoWantToJoin, setPeoplesWhoWantToJoin] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //console.log(firebase.auth().currentUser)
      HaeOmatEventit();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  // eventti valittu, haetaan tähän swipetyt events dokumentista ja  vähennetään ne jotka on jo swipetty.
  React.useEffect(() => {
    HaeHakijat();
  }, [selectedEvent]);

  async function HaeHakijat() {
    var peopleWhoLikedMe = await firestore().collection("events").doc(selectedEvent).collection("swipes").doc("usersThatLikedMe").get();
    var lol = peopleWhoLikedMe.data().swipes;
    var peopleInQueue = await firestore().collection("events").doc(selectedEvent).collection("swipes").doc("mySwipes").get();
    peopleInQueue = peopleInQueue.data().swipes;
    var usersAlreadyInEvent = await firestore().collection("matches").doc(selectedEvent).get();
    usersAlreadyInEvent = usersAlreadyInEvent.data().users;
    console.log(usersAlreadyInEvent);
    //console.log(peopleInQueue)
    //console.log(peopleInQueue.data().swipes)

    let temppia = [];
    //miksei vaa
    lol.forEach((element) => {
      temppia.push(element.user);
    });

    console.log(temppia);
    temppia = temppia.filter(function (el) {
      return !usersAlreadyInEvent.includes(el);
    });
    console.log(temppia);
    //nyt pitää  vielä katsoa että ei näytä niitä jotka on jo
    //return;
    var lopulliset = [];
    if (temppia.length !== 0) {
      console.log("Enemmän ku 0");
      var query = await firestore()
        .collection("users")
        .where(firestore.FieldPath.documentId(), "in", temppia)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            var asd = doc.data();
            asd.uid = doc.id;
            lopulliset.push(doc.data());
            //lopulliset[length-1].uid = doc.id;
          });
        });
    }
    console.log("Lopulliset");
    console.log(lopulliset);
    setPeoplesWhoWantToJoin(lopulliset);
    //saadaan nyt kaikki userid:t kivasti, nyt voidaan queryttaa kaikki
    //katsotaan ettei
  }

  async function HaeOmatEventit() {
    console.log("#####################");
    console.log("id: " + global.myUserData.uid);
    let eventtiLista = [];
    //tän listan itemit menee dropdowniin, dropdownia kun päivittää niin hakee eventit listaan.
    var docRef = await firestore()
      .collection("users")
      .doc(global.myUserData.uid)
      .collection("myOwnedEvents")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          eventtiLista.push(doc.id);
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
        setMyEvents(eventtiLista);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    return;
    //Käytetään placeholderina, voidaan
    var query = await firestore()
      .collection("events")
      .where("eventOwners", "array-contains", global.myUserData.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      });
  }
  //

  //Bäkistä tai firebasesta: Hae userit jotka on tykännyt eventistä ja joille eventti ei ole vielä swipennyt

  function PostSwipe(liked, user) {
    //Connectaa endpointiin, lähettää parametrinä omat hakutoiveet. Vaihtoehtona että bäkki itse noutas firebasesta mutta ei kai tarpeen?
    let myData = {
      data: {
        liked: liked,
        target: user, //korjaa findSwipeablesin blabla vanhaan.
        swipeAs: selectedEvent,
      },
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
    };
    console.log("Swiped " + liked + " for " + user);
    console.log(JSON.stringify(myData));
    console.log(user);
    fetch(global.url + "swipe", {
      // fetch("http://192.168.56.1:5001/ohpro2-f30e5/us-central1/swipe" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(body)
      body: JSON.stringify(myData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
    //palauttaa asynscista arrayn, sijoitetaan swipettaviin.
  }

  function Accept(liked, uid) {
    console.log("Accept");
    console.log(uid);
    PostSwipe(liked, uid);
  }

  function Jooh() {
    {
      return peoplesWhoWantToJoin.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={{ uri: l.images[0] }} />
          <ListItem.Content>
            <View>
              <ListItem.Title>
                {l.displayName} {l.age}
              </ListItem.Title>
              <ListItem.Subtitle>{l.tags}</ListItem.Subtitle>
            </View>
            <Text> 4km </Text>
          </ListItem.Content>
          <View style={styles.viewLikersItemContent}>
            <Button
              //style={styles.viewLikersButton}
              type="outline"
              raised={true}
              icon={{
                name: "arrow-right",
                size: 30,
                color: "lightgreen",
              }}
              onPress={() => Accept(true, l.uid)}
            />
            <Button
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
    <View style={[styles.flexOne, styles.background, styles.paddingTopFifty]}>
      <View>
        <View style={styles.alignItemsCenter}>
          <Picker selectedValue={selectedEvent} style={styles.viewLikersPickerSize} onValueChange={(itemValue, itemIndex) => setEvent(itemValue)}>
            {myEvents.map((l, i) => (
              <Picker.Item label={l} value={l} />
            ))}
          </Picker>
        </View>
        <Text style={styles.viewLikersTextColor}> People who swiped for your event!</Text>
        {peoplesWhoWantToJoin.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: l.images[0] }} />
            <ListItem.Content>
              <View>
                <ListItem.Title>
                  {l.displayName} {l.age}
                </ListItem.Title>
                <ListItem.Subtitle>{l.tags}</ListItem.Subtitle>
              </View>
              <Text> 4km </Text>
            </ListItem.Content>
            <View style={styles.viewLikersItemContent}>
              <Button
                //style={styles.viewLikersButton}
                type="outline"
                raised={true}
                icon={{
                  name: "arrow-right",
                  size: 30,
                  color: viewLikersIconButton1,
                }}
                onPress={() => Accept(true, l.uid)}
              />
              <Button
                type="outline"
                raised={true}
                onPress={() => Accept(false, l.uid)}
                icon={{
                  name: "arrow-right",
                  size: 30,
                  color: viewLikersIconButton2,
                }}
              />
            </View>
          </ListItem>
        ))}
      </View>
    </View>
  );
}
