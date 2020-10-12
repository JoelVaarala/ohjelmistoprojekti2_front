import React from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, Image } from 'react-native';
import { Avatar, ListItem, Overlay } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import firebase from 'react-native-firebase';
import auth from '@react-native-firebase/auth';
import Kuva from './assets/logo.png'
//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Matches({ navigation, route }) {

  const [myMatches, setMyMatches] = React.useState([]);
  //const myUserID = "qREmoPw72NRHB2JA6uBCKJyuWhY2";
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

  // FIXME, tämä päivittyy "automaattisesti"
  function getMyMatches_From_MyMatches() {
    let ref = firestore().collection('users').doc(global.myUserData.myUserID).collection('MyMatches')
    ref.onSnapshot((querySnapshot) => { // snapshot == capture sen hetkisestä rakenteesta
      let matchit = []; // voidaan asettaa halutut tiedot taulukkoon
      console.log('number of matches : ', querySnapshot.size); // logi -> tuleeko collectionista "osumia"
      querySnapshot.forEach((doc) => { // dokkari kerrallaan läpi, jotta voidaan poimia matchien "id:t"
        matchit.push(doc.data()) // TODO: specify what data myMatch dokkarista haetaan.
      })
    })
  }


  const getMyMatches = async () => {

    try {
      // this returns whole result of 'doc'
      //hakee messages/matches collectionista itemit
      let num = 1
      let temparray = [];
      var query = await firestore().collection("matches").where("users", "array-contains", auth().currentUser.uid).
        get()
        .then(async function (querySnapshot) {
          querySnapshot.forEach(async function (doc) {
            console.log("MyMatch", doc.id)
            var asd = await doc.data();
            console.log(asd)
            asd.uid = doc.id;


            num = num + 1;
            // asd.users.re
            //temparray.push(doc.data())
            temparray.push({ matchid: doc.id, name: "naimi", avatar_url: `https://randomuser.me/api/portraits/med/women/${num}.jpg` })
            //lopulliset[length-1].uid = doc.id;
          });
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
        console.log("Pressed: " + item.matchid)
        navigation.navigate('Chat', { chatti: item.matchid })
      }}
      containerStyle={{ backgroundColor: 'rgba(255,154,0,0)' }}
    >
      <Avatar rounded source={{ uri: item.avatar_url }} />
    </ListItem>
  );




  return (

    // <ImageBackground style={styles.image} source={'http://jaanisavolainen.com/paskaa/logo.png'} >
      <View style={styles.container}>

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
            style={styles.logo}
            source={{
              uri: 'http://jaanisavolainen.com/paskaa/logo2.png'
            }}></Image>
        </View>
      </View>
    // </ImageBackground>

  );
}


const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    flex: 1,
    backgroundColor: 'black',

  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  logo: {
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    width: 400,
    height: 50,
    padding: '15%'
  },
});
