import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { store } from "../redux/index";
import firebase from 'firebase';
import styles from '../styles';

export default function Chat(props) {
  
  // States
  const [messages, setMessages] = useState([]);
  let profilePic = props.route.params.photo;  // ------------HOX HOX switch props... to reducer possibly
 
  let userID = store.getState().UserDataReducer[0].id;
  let userToken = store.getState().UserDataReducer[0].token;

  function MessageToFirebase(msg) {
    //https://firebase.google.com/docs/auth/admin/verify-id-tokens#web

    // create message body
    let body = {
      data: {
        message: msg,
        match: props.route.params.chatti 
      },
      uid: userID,
      idToken: userToken
    };
    // Post message
    fetch(store.getState().DefaultReducer[0].url + 'message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('success', data)
      })
      .catch((err) => console.error(err));
  }

  // method to get messages in real time
  const ref = firebase
    .firestore()
    .collection('matches')
    .doc(props.route.params.chatti)
    .collection('messages')
    .orderBy('timestamp', 'desc');

  function getConversationsRealTime() {
    // creates snapshot that gets firestore content
    ref.onSnapshot((querySnapshot) => {
      // array which will get messages
      const ConversationMessages = [];
      
      // loop through each and create message
      querySnapshot.forEach((doc) => {
        // Check if sender / receiver to know if rendered right or left
        let sender = doc.data().sender;
        if (doc.data().sender == userID) {    
          sender = 'side';
        }

        // add messages into the array
        ConversationMessages.push({
          _id: ConversationMessages.length + 1,
          text: doc.data().message,
          createdAt: new Date(doc.data().timestamp.seconds * 1000),
          user: {
            _id: sender,
            name: 'user',
            avatar: profilePic
          }
        });
        // sets array to state which Giftchat uses as data 
        setMessages(ConversationMessages);
      });
    });
  }

  // auto updates for new messages
  useEffect(() => {
    getConversationsRealTime();
  }, []);

  // Displays newest message and sends it to firebase
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    MessageToFirebase(messages[0].text);
  }, []);

  // Avater takes you to profile of your match
  function avatarOpensProfile(props2) {
    props.navigation.navigate('MatchProfile', { match: props2._id, chet: props.route.params.chatti });
  }

  return (
    <View style={[styles.flexOne, styles.background]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 'side'
        }}
        onPressAvatar={avatarOpensProfile}
      />
    </View>
  );
}
