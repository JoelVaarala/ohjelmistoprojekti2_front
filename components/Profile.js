import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import Carousel2 from "./Carousel";
import firestore from "@react-native-firebase/firestore";
import styles from "../styles";
import auth from "@react-native-firebase/auth";

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
  const [type, setType] = React.useState('');
  const [pics, setPics] = React.useState([]);
  // true -> display user __ false -> display event
  const [view, setView] = React.useState(true);
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
    console.log('käyttäj id ', auth().currentUser.uid)
    console.log('Profile.js useEffect (route.params.match) = ', route.params.match)
    console.log('Profile.js useEfect (route.params.chet) = ' , route.params.chet)
  }, []);

  //haetaan infot firebasesta

  async function haeTiedot() {

    const find = await firestore().collection("matches").doc(doc);
    find.onSnapshot((query) => {
      let matchType = query.data().matchType;
      setType(matchType);
      let user = '';
      if(matchType == "user"){
        console.log('user löytyi')
        query.data().users.forEach(element => {
          console.log('forEach ',element)
          if(element != auth().currentUser.uid){
            user = element;
          }
        });
        
        haeUser(user);
      }
      else if(matchType == "event"){
        console.log('event löytyi')
        haeEvent();
      }
    })  
  }

  async function haeUser(user) {
    const ref = await firestore().collection("users").doc(user);
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
    const ref = await firestore().collection("events").doc(route.params.chet);
    ref.onSnapshot((qr) => {
      // tiedot viedään userStateen
      let name_f = qr.data().displayName;
      let bio_f = qr.data().bio;
      setEvent({ name: name_f, bio: bio_f });
      setView(false)
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
    return(
    <Text>moi</Text>
    );
  }

  return (
  
    <View style={styles.alignItemsCenter}>
       {view ? 
      <View style={[styles.alignItemsCenter, styles.flexThree]}>
        <Carousel2
          kuvat={pics}
          style={
            styles.flexOne
            //height: '50%', width: '50%'
          }
        />
      </View> : <View>{/* Tähän eventille kuva systeemit, kun eventin tiedoista niitä alkaa löytymään*/}</View>}

      <View style={styles.flexThree}>
      {view ? 
      <View>
        <Text style={styles.userTextStyle}>
          {user.name}, {user.age}
        </Text>
        <Text style={styles.userBioStyle}>{user.bio}</Text>
        </View> 
        : 
        <View>
          <Text style={styles.userTextStyle}>
          {event.name}
        </Text>
        <Text style={styles.userBioStyle}>{event.bio}</Text>
        </View>
        }
        
      </View>
        
      {/* <ScrollView>{view ? (<Text>true</Text>) : (<Text>false</Text>)} </ScrollView> */}
          
    </View>
    
  );
}
