import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Avatar, ListItem, Overlay } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import firebase from 'react-native-firebase';
import auth from '@react-native-firebase/auth';
import Kuva from './assets/logo.png'
import styles from '../styles';
//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Matches({ navigation, route }) {

  const [myMatches, setMyMatches] = React.useState([]);
  const myUserID = "qREmoPw72NRHB2JA6uBCKJyuWhY2";
  const [overlay, setOverlay] = React.useState(true);


    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
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
    console.log("matches use effect")
    //Haetaan kaikki käyttäjän mätsit ja sortataan kahteen listaan sen perusteella onko näillä chattihistoriassa mitään.
    //jos on niin näytetään vertikaalisessa osiossa, jos ei niin horisontaalisessa.
    //tagi filtteri tälle sivulle myös?

  }, []);


  const getMyMatches = async () => {
    try {
      // this returns whole result of 'doc'
      //hakee messages/matches collectionista itemit
      const matches = await firestore().collection(global.matches).get();
      
      let temparray = [];
      matches.docs.map(doc => {
        let matchname = "";
        doc._data.users.forEach((user) => {
          if (user != myUserID) {
            matchname = user;
          }
          
        })

        //käyteään namessa UID siihen asti kunnes fetchataan oikea nimi
        //Lisätään myöhemmin  tsekkaamana että onko viestejä, jos on niin 
        //Matchid: dokumentin id
        //uid : käyttäjän userid josta voidaan fetchaa dataa
        //name : käyttäjän näkyvä nimi (nyt uid, korjataan)
        //avatar_url : placeholder kuva vain, haetana myöhemmin profilesta kuva (UID kautta)
        temparray.push({matchid: doc.id , uid: matchname, name: matchname, avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'})
        console.log("my match is "+matchname)

      })
      setMyMatches(temparray);

    }
    catch (error) {
      console.log(error)
    }
  }


  // const placeholdertext = "Tag1 , Tag2, Tag3, Tag4"
  const placeholdertext = "Tässä viimeisin viesti käyttäjän kanssa"

  const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: placeholdertext
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: placeholdertext
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: placeholdertext
    },

  ]

  //Tämän pitäisi myös pistää linkki chatkomponenttiin johon passataan parametrinä keskustelkun id
  const renderItem = ({ item }) => (
    <ListItem
    onPress={() => {
      console.log(item.matchid)
     navigation.navigate('Chat', { chatti: item.matchid})
    }}
    >
      <Avatar source={{ uri: item.avatar_url }} />
    </ListItem>
  );




  return (

    // <ImageBackground style={styles.matchesImage} source={'http://jaanisavolainen.com/paskaa/logo.png'} >
      <View style={styles.matchesContainer}>

        <View>
          {/* <Text style={{
          fontSize: 20, color: 'orange',
          fontWeight: 'bold',
          fontFamily: 'roboto'
        }}>Matches</Text> */}
          <FlatList
            horizontal={true}
            data={myMatches}
            renderItem={renderItem}
          >
          </FlatList>
          <Text style={{
            fontSize: 20, color: 'orange',
            fontWeight: 'bold',
            fontFamily: 'roboto'
          }}>Messages</Text>
          {
            list.map((l, i) => (
              <ListItem key={i} bottomDivider containerStyle={{ backgroundColor: 'rgba(255,154,0,0)' }} >
                <Avatar rounded source={{ uri: l.avatar_url }} backgroundColor={'black'} />
                <ListItem.Content style={{ opacity: 1 }}>
                  <ListItem.Title style={{
                    color: 'white', fontWeight: 'bold',
                    fontFamily: 'roboto'
                  }}>{l.name}</ListItem.Title>
                  <ListItem.Subtitle style={{
                    color: 'gray',
                    fontFamily: 'roboto'
                  }}>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          }
        </View>
        <View>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Image
            style={styles.matchesLogo}
            source={{
              uri: 'http://jaanisavolainen.com/paskaa/logo2.png'
            }}></Image>
        </View>
      </View>
  );
}
