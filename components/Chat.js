import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Startup from "./Startup";
import firebase from 'firebase';
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
import { Icon, Avatar } from "react-native-elements";
import styles from "../styles";

// import firebase from 'react-native-firebase';

//Tämä on chatti mätsin kanssa
export default function Chat(props) {
  // States
  const [messages, setMessages] = useState([]);
  const avatar_url = "https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869_960_720.jpg";
  const [matchinUID, setMatchinUID] = useState("");
  let profilePic = props.route.params.photo;
  // React.useEffect(() => {
  //   getMatchID()
  // }, [])

  // // hae matchin id
  // const refff = firestore().collection('matches').doc(props.route.params.chatti)
  // function getMatchID() {
  //   refff.onSnapshot((query) => {
  //     console.log('id:t ',query.data().users[0], query.data().users[1])
  //     let v1 = query.data().users[0];
  //     if(v1 != global.myUserData.uid){
  //       setMatchinUID(v1)
  //     }else{
  //       setMatchinUID( query.data().users[1]);
  //     }
  //     console.log('sdghtjhrtjtrj', matchinUID)
  //   })
  // }

  //tää täytyy fixaaa EI TOIMI --- Update nyt toimii
  function GoToAvatar({ navigation }) {
    return <Avatar onPress={() => navigation.navigate("MatchProfile", { chet: props.route.params.chatti})} size="large" rounded source={ {uri: profilePic} } />;
  }
 
  //Tällä pystyy lähettää viestinm parametrinä tulee viestin teksti.
  //Laitetaan firebasessa validointi ja automaattisna infona lähettäjä, timestamp ja  sallitaan vain message kenttä.

  //TODO Timestamppi oikein.
  function LahetaViestiFirebaseen(viesti) {
    //https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
    let body = {
      data: {
        message: viesti,
        match: props.route.params.chatti, //tää pitäs tulla propsi parametristä
      },
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
    };
    //console.log(body)
    fetch(global.url + "message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
      })
      .catch((err) => console.error(err));
  }

  // --UPDATED METHOD TO GET MESSAGES REALTIME
  // ref for wanted doc, global.keskusteluDOC needs to be changed after to be matching specific chat
  const ref = firebase.firestore().collection("matches").doc(props.route.params.chatti).collection("messages").orderBy("timestamp", "desc");

  function getConversationsRT() {
    // luodaan snapshot joka, "hakee" firestoren sisällön
    ref.onSnapshot((querySnapshot) => {
      // array johon laitetaan firestoren viestit
      const keskustelunViestit = [];
      // tulostaa kuinka monta viestiä collection sisältää
      console.log("Total messages: ", querySnapshot.size);
      // looppi jossa muodostetaan viestit jokaisesta tietueesta
      querySnapshot.forEach((doc) => {
        console.log("Viestin sisältö : ", doc.data().message);
        // Alla selvitetään onko henkilö lähettäjä/vastaanottaja, jotta tiedetään kummalle puolelle näyttöä viestit renderöidään
        let sender = doc.data().sender;
        if (doc.data().sender == firebase.auth().currentUser.uid) {
          sender = "asd";
        }

        // lisätään arrayhin halutut viesti datat
        keskustelunViestit.push({
          _id: keskustelunViestit.length + 1,
          text:  doc.data().message,
          createdAt: new Date(doc.data().timestamp.seconds * 1000),
          user: {
            _id: sender,
            name: "joku",
            avatar: profilePic,
          },
        });
        // asettaan taulun stateen jota Giftedchat käyttää datana
        setMessages(keskustelunViestit);
      });
    });
  }

  useEffect(() => {
    //console.log("Chatin useEffect")
    getConversationsRT();
  }, []);

  // invert shit chatin kääntelyyn mahd.
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    //console.log(messages[0].text)
    LahetaViestiFirebaseen(messages[0].text);
  }, []);

  
  // avatar kuvaa painamalla pääsee katsomaan henkilön profiilia
  function avatarOpensProfile(props2) {
    // console.log('props2 : ',props2)
    // console.log('props : ',props)
    console.log('route.params.chatti : ', props.route.params.chatti)
    console.log('Chatistä lähtevät props2 ', props2);
    props.navigation.navigate("MatchProfile", { match: props2._id , chet: props.route.params.chatti});
  }

  return (
    <View style={[styles.flexOne, styles.background]}>
      <View style={styles.chatStyle}>
        <GoToAvatar navigation={props.navigation} />
        
      </View>

      <GiftedChat
        // optionTintColor  = {'red'}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        //onSend={handleSend}
        user={{
          _id: "asd",
        }}
        onPressAvatar={avatarOpensProfile}
      />
      {/* <Button
        onPress={getConversationsRT}
        title="debug log"
        containerStyle={styles.chatButton}
      /> */}
    </View>
  );
}

// ____________________ Vanhaa koodia ____________________________

/*  // err = "The caller does not have permission to execute the specified operation"
    const sendMessage = () => {
      firestore()
      .collection('messages').doc('8vrpX2NsjbtVuATcsiqC').collection('messages')
      .add({
        message: 'Harmillista',
        sender: 'user1uid',
        timestamp: 1601103600
      })
      .then(() => {
        console.log('message send!');
      });
    } */

/* chat user id's of specific doc
const getChatterUID = async () => {
  try{
    // this returns whole result of 'doc'
    //vaihdetaan global.matches propsiin

    const get_users_from_doc = await firestore().collection(global.matches).doc(global.keskusteluDOC).get();
    setChatters(get_users_from_doc.data().users)
  }
  catch(error){
      console.log(error)
    }
  }
} */
/*
// getting data from firebase
const getConversationdataFromDoc = async () => {
  try {

    const post = [];
    firestore()
    // specify route to desired collection / document__________________ this orders fetched content according timestamp  (ordered by id, default)
    .collection(global.matches).doc(global.keskusteluDOC).collection('messages').orderBy('timestamp')
    .get()
    .then(querySnapshot => {
      // querySnapshot = result (messages collection)
      console.log('Total messages: ', querySnapshot.size);
      console.log('Current UID : ',auth().currentUser.uid)
      // forEach (documentSnapshot = individual doc inside the messages collection)
      querySnapshot.forEach(documentSnapshot => {

        post.push({text : documentSnapshot.data().message, dt: documentSnapshot.data().timestamp, sender: documentSnapshot.data().sender})

        // logs convo/message id and its message content of each result (remove message, and this shows all data)
        console.log('Message ID : ', documentSnapshot.id, '  Sender uid: ', documentSnapshot.data().sender, '  Message :', documentSnapshot.data().message);

        // logs only the text content <String> of each message
        // specific fields can be referenced as shown below extracting wanted field after doc.data(). + 'field'
        //console.log('message : ',  documentSnapshot.data().message);
      });

      // Chat näkyviin a'la Jaani. Nyt all ja ylläoleva tekee about samat, poistetaan toinen seuraavassa spintissä-
      const o = []
      //reverse koska giftedchatin dokumentaatiota tutkimalla siellä on defaulttina reverse,
      // ja sitä parametriä ei nyt käytetä niin tässä tehdään oma reverse. "Korjataan" seuraavassa sprintissä
      post.reverse();
      post.forEach((element) => {
        //console.log(element.message)
          let sender = 2;
          if(element.sender == 'qREmoPw72NRHB2JA6uBCKJyuWhY2'){
            sender = 1;}
            o.push({
            _id: o.length+1,
            text: element.text,
            createdAt: new Date(element.dt._seconds * 1000),
            user: {
              _id: sender,
            }
            o.push({
              _id: o.length + 1,
              text: element.text,
              createdAt: new Date(element.dt._seconds * 1000),
              user: {
                _id: sender,
              }
            })
          })
          // asets 'o' array to chat
          setMessages(o)
        });

    } catch (error) {
      console.log(error);

    }
  }
}
*/
