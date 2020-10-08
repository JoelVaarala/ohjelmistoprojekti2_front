import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Avatar, ListItem, Overlay } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import firebase from 'react-native-firebase';

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
  function getMyMatches_From_MyMatches()  {
    let ref = firestore().collection('users').doc(global.myUserData.myUserID).collection('MyMatches')
    ref.onSnapshot((querySnapshot) => { // snapshot == capture sen hetkisestä rakenteesta
      let matchit = []; // voidaan asettaa halutut tiedot taulukkoon
      console.log('number of matches : ', querySnapshot.size); // logi -> tuleeko collectionista "osumia"
      querySnapshot.forEach((doc) => { // dokkari kerrallaan läpi, jotta voidaan poimia matchien "id:t"
        matchit.push(doc.data() /*esim .user[1]*/) // TODO: specify what data myMatch dokkarista haetaan.
      })
    })
  }


  const getMyMatches = async () => {
    try {
      // this returns whole result of 'doc'
      //hakee messages/matches collectionista itemit
      const matches = await firestore().collection('matches').get();
      
      //TODO FIXME querytataan mielummin kuin haetaan koko collectionia, Sprintti 3.
      let temparray = [];
      let num = 1;
      matches.docs.map(doc => {
        let matchname = "";
        doc._data.users.forEach((user) => {
          if (user != global.myUserData.myUserID) {
            matchname = user;
          }
          
        })

        //käyteään namessa UID siihen asti kunnes fetchataan oikea nimi
        //Lisätään myöhemmin  tsekkaamana että onko viestejä, jos on niin 
        //Matchid: dokumentin id
        //uid : käyttäjän userid josta voidaan fetchaa dataa
        //name : käyttäjän näkyvä nimi (nyt uid, korjataan)
        //avatar_url : placeholder kuva vain, haetana myöhemmin profilesta kuva (UID kautta)
        temparray.push({matchid: doc.id , uid: matchname, name: matchname, avatar_url: `https://randomuser.me/api/portraits/med/women/${num}.jpg`})
        console.log("my match is "+matchname)
        num = num+1;
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
      console.log("Pressed: "+item.matchid)
     navigation.navigate('Chat', { chatti: item.matchid})
    }}
    >
      <Avatar source={{ uri: item.avatar_url }} />
    </ListItem>
  );




  return (
    <View style={styles.container}>
      {/* <View style={{ flex: 1 }}>
        <Text>TÄNNE NAVI</Text>
      </View> */}
      <View>
        <Text style={{ fontSize: 20 }}>Matches</Text>
        <FlatList
          horizontal={true}
          data={myMatches}
          renderItem={renderItem}
        >
        </FlatList>
        <Text style={{ fontSize: 20 }}>Active chats</Text>
        {
          list.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar source={{ uri: l.avatar_url }} />
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))
        }
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});
