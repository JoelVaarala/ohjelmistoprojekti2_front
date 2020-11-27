import React from "react";
import { Text, View, FlatList, ImageBackground, Image } from "react-native";
import { Avatar, ListItem, Overlay, ThemeProvider, ButtonGroup } from "react-native-elements";
import firebase from "firebase";
import styles from "../styles";
import Logo from "./Logo";
//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Matches({ navigation, route }) {

  const [myMatches, setMyMatches] = React.useState([]);
  const [myMatchesFilter, setMyMatchesFilter] = React.useState([]);
  const [myEvents, setMyEvents] = React.useState([]);
  const [overlay, setOverlay] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const buttons = ["Users", "Events", "My Events"];

  // function updateIndex(value) {
  //   setSelectedIndex(value);
  // }

  function filterMatchit() {
    let matchilista = [];

    if (selectedIndex == 0) {
      matchilista = myMatches.filter((item) => item.matchType === 'user');
      console.log("users lista");
      console.log(matchilista);
    } else if (selectedIndex == 1) {
      matchilista = myMatches.filter((item) => item.matchType === 'event');
      console.log("events lista");
      console.log(matchilista);
    } else if (selectedIndex == 2) {
      matchilista = myEvents;
      console.log("myEvents lista");
      console.log(matchilista);
    }
    setMyMatchesFilter(matchilista);
  }

  React.useEffect(() => {
    filterMatchit();
  }, [selectedIndex, myMatches]);

  const theme = {
    colors: {
      primary: "black",
    },
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //console.log("Listener")
      //console.log(firebase.auth().currentUser)
      getMyMatches();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    //Pitäs
    // getMyMatches();
    console.log("matches use effect");
    //Haetaan kaikki käyttäjän mätsit ja sortataan kahteen listaan sen perusteella onko näillä chattihistoriassa mitään.
    //jos on niin näytetään vertikaalisessa osiossa, jos ei niin horisontaalisessa.
    //tagi filtteri tälle sivulle myös?
  }, []);

  // FIXME, tämä päivittyy "automaattisesti"
  function getMyMatches_From_MyMatches() {
    let ref = firebase.firestore().collection("users").doc(global.myUserData.myUserID).collection("MyMatches");
    ref.onSnapshot((querySnapshot) => {
      // snapshot == capture sen hetkisestä rakenteesta
      let matchit = []; // voidaan asettaa halutut tiedot taulukkoon
      console.log("number of matches : ", querySnapshot.size); // logi -> tuleeko collectionista "osumia"
      querySnapshot.forEach((doc) => {
        // dokkari kerrallaan läpi, jotta voidaan poimia matchien "id:t"
        matchit.push(doc.data()); // TODO: specify what data myMatch dokkarista haetaan.
      });
    });
  }

  const getMyMatches = async () => {

    let currUser = await firebase.auth().currentUser.uid

    try {
      // this returns whole result of 'doc'
      //hakee messages/matches collectionista itemit
      let num = 1;
      let temparray = [];
      var query = await firebase
        .firestore()
        .collection("matches")
        .where("users", "array-contains", currUser)
        .get()
        .then(async function (querySnapshot) {
          querySnapshot.forEach(async function (doc) {
            console.log("MyMatch", doc.id);
            var asd = await doc.data();
            console.log(asd);
            asd.uid = doc.id;
            let chatname = "";
            num = num + 1;
            // asd.users.re
            if (asd.matchtype == "event") {
              chatname = asd.displayNames[0];
            } else {
              //täällä tulee aina väärä nimi matchille, mikäs tämän tarkoitus on?
              asd.displayNames.forEach((element) => {
                if (element != global.uid) chatname = element;
              });
            }
            //temparray.push(doc.data())
            temparray.push({
              matchid: doc.id,
              bio: asd.bio,
              name: chatname,
              matchType: asd.matchType,
              avatar_url: `https://randomuser.me/api/portraits/med/women/${num}.jpg`,
            });
            //lopulliset[length-1].uid = doc.id;
          });
        });

      setMyMatches(temparray);
    } catch (error) {
      console.log(error);
    }

    try {

      let temparrayMyevents = [];
      var query2 = await firebase
        .firestore()
        .collection("events")
        .where("eventOwners", "array-contains", currUser)
        .get()
        .then(async function (querySnapshot) {
          querySnapshot.forEach(async function (doc) {
            console.log("MyEvents", doc.id);
            var asd = await doc.data();
            console.log(asd);
            asd.uid = doc.id;
            let chatname = asd.displayName;
            let image;
            if (asd.images.length == 0) {
              image = 'https://image.freepik.com/free-vector/hand-with-pen-mark-calendar_1325-126.jpg'
            } else {
              image = asd.images[0];
            }
            temparrayMyevents.push({
              matchid: doc.id,
              bio: asd.bio,
              name: chatname,
              matchType: 'My event',
              avatar_url: image,
            });
          });
        });

      setMyEvents(temparrayMyevents);
    } catch (error) {
      console.log(error);
    }
  };

  //Tämän pitäisi myös pistää linkki chatkomponenttiin johon passataan parametrinä keskustelkun id
  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        console.log("Pressed: " + item.matchid);
        navigation.navigate("Chat", { chatti: item.matchid, photo: item.avatar_url });
      }}
      containerStyle={styles.matchesBackgroundColor}
      bottomDivider
    >
      <Avatar rounded source={{ uri: item.avatar_url }} />
      <ListItem.Content style={styles.opacityOne}>
        <ListItem.Title style={[styles.matchesName, styles.fontRoboto]}> {item.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.textGreyRoboto}> {item.matchType}</ListItem.Subtitle>
        {/* <ListItem.Subtitle style={styles.textGreyRoboto}> Latest message</ListItem.Subtitle> */}
        {/* <ListItem.Subtitle style={styles.textGreyRoboto}> {item.bio}</ListItem.Subtitle> */}
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={[styles.flexOne, styles.background]}>
      <View>
        <ThemeProvider theme={myTheme}>
            <ButtonGroup
              onPress={(value) => setSelectedIndex(value)}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={[styles.background, styles.heightForty]}
              style={styles.paddingBottomFifty}
            />
        </ThemeProvider>
        <FlatList horizontal={false} data={myMatchesFilter} renderItem={renderItem}></FlatList>
        {/* <Text style={[styles.title, styles.fontRoboto, styles.marginLeftTen]}>Messages</Text> */}
        {/* {list.map((l, i) => (
          <ListItem key={i} bottomDivider containerStyle={styles.matchesBackgroundColor}>
            <Avatar rounded source={{ uri: l.avatar_url }} backgroundColor={"black"} />
            <ListItem.Content style={styles.opacityOne}>
              <ListItem.Title style={[styles.matchesName, styles.fontRoboto]}>{l.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.textGreyRoboto}>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))} */}
      </View>
      {/* <Logo /> */}
    </View>
  );
}
