import React from "react";
import { Text, View, FlatList, ImageBackground, Image } from "react-native";
import { Avatar, ListItem, Overlay } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import firebase from "react-native-firebase";
import auth from "@react-native-firebase/auth";
import styles from "../styles";
import Logo from "./Logo";
//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Matches({ navigation, route }) {
  const [myMatches, setMyMatches] = React.useState([]);
  //const myUserID = "qREmoPw72NRHB2JA6uBCKJyuWhY2";
  const [overlay, setOverlay] = React.useState(true);

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
    getMyMatches();
    console.log("matches use effect");
    //Haetaan kaikki käyttäjän mätsit ja sortataan kahteen listaan sen perusteella onko näillä chattihistoriassa mitään.
    //jos on niin näytetään vertikaalisessa osiossa, jos ei niin horisontaalisessa.
    //tagi filtteri tälle sivulle myös?
  }, []);

  // FIXME, tämä päivittyy "automaattisesti"
  function getMyMatches_From_MyMatches() {
    let ref = firestore().collection("users").doc(global.myUserData.myUserID).collection("MyMatches");
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
    try {
      // this returns whole result of 'doc'
      //hakee messages/matches collectionista itemit
      let num = 1;
      let temparray = [];
      var query = await firestore()
        .collection("matches")
        .where("users", "array-contains", auth().currentUser.uid)
        .get()
        .then(async function (querySnapshot) {
          querySnapshot.forEach(async function (doc) {
            console.log("MyMatch", doc.id);
            var asd = await doc.data();
            console.log(asd);
            asd.uid = doc.id;

            num = num + 1;
            // asd.users.re
            //temparray.push(doc.data())
            temparray.push({
              matchid: doc.id,
              name: "naimi",
              avatar_url: `https://randomuser.me/api/portraits/med/women/${num}.jpg`,
            });
            //lopulliset[length-1].uid = doc.id;
          });
        });

      setMyMatches(temparray);
    } catch (error) {
      console.log(error);
    }
  };

  // const placeholdertext = "Tag1 , Tag2, Tag3, Tag4"
  const placeholdertext = "Tässä viimeisin viesti käyttäjän kanssa";

  const list = [
    {
      name: "Amy Farha",
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: placeholdertext,
    },
    {
      name: "Chris Jackson",
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: placeholdertext,
    },
    {
      name: "Amy Farha",
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: placeholdertext,
    },
  ];

  //Tämän pitäisi myös pistää linkki chatkomponenttiin johon passataan parametrinä keskustelkun id
  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        console.log("Pressed: " + item.matchid);
        navigation.navigate("Chat", { chatti: item.matchid });
      }}
      containerStyle={styles.matchesBackgroundColor}
    >
      <Avatar rounded source={{ uri: item.avatar_url }} />
    </ListItem>
  );

  return (
    <View style={[styles.flexOne, styles.background]}>
      <View>
        <FlatList horizontal={true} data={myMatches} renderItem={renderItem}></FlatList>
        <Text style={[styles.title, styles.fontRoboto, styles.marginLeftTen]}>Messages</Text>
        {list.map((l, i) => (
          <ListItem key={i} bottomDivider containerStyle={styles.matchesBackgroundColor}>
            <Avatar rounded source={{ uri: l.avatar_url }} backgroundColor={"black"} />
            <ListItem.Content style={styles.opacityOne}>
              <ListItem.Title style={[styles.matchesName, styles.fontRoboto]}>{l.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.textGreyRoboto}>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <Logo />
    </View>
  );
}
