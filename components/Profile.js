import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Avatar, ListItem, Overlay, Button, ThemeProvider, ButtonGroup, Icon, Tooltip } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { store } from "../redux/index";
import Carousel2 from './Carousel';
import firebase from 'firebase';
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
import styles from '../styles';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Profile({ navigation, route }, props) {
  const [user, setUser] = React.useState({
    name: 'name',
    age: "-1",
    bio: 'bio'
  });
  const [event, setEvent] = React.useState({
    name: 'name',
    bio: 'bio'
  });

  const [participiants, setParticipiants] = React.useState([]);
  const [peoplesWhoWantToJoin, setPeoplesWhoWantToJoin] = React.useState([]);
  // type can be used to define if mathc is user vs event
  const [type, setType] = React.useState('');
  const [pics, setPics] = React.useState([]);
  const [eventInfo, setEventInfo] = React.useState({
    participiants: [{ images: ['https://randomuser.me/api/portraits/med/women/1.jpg'] }]
  });
  const [view, setView] = React.useState(true); // true -> display user __ false -> display event
  const buttons = ['Participiants', 'Queued'];
  const [selectedIndex, setSelectedIndex] = React.useState( 0 );

  let userID = store.getState().UserDataReducer[0].id;
  let userToken = store.getState().UserDataReducer[0].token;

  const theme = {
    colors: {
      primary: 'black'
    }
  };


  React.useEffect(() => {
    getProfileInformation();
    console.log('Profile.js useEfect (route.params.userMatchProfile) = ', route.params.userMatchProfile);
  }, []);


  async function getProfileInformation() {
    const find = await firebase.firestore().collection('matches').doc(route.params.userMatchProfile);
    find.onSnapshot((query) => {
      let matchType = '';
      // CHECK : without this try-catch, after deleting match this function is triggered to search for deleted match document and causes crash
      try {
        matchType = query.data().matchType;
      } catch (error) {
        return;
      }
      setType(matchType);
      let user = '';
      if (matchType == 'user') {
        console.log('MatchType === user');
        setType('User');
        query.data().users.forEach((element) => {
          console.log('forEach users in match when match type == user', element);
          if (element != userID) {
            user = element;
          }
        });
        getUser(user);
      } else if (matchType == "event") {
        console.log("MatchType === event");
        setType("Event");
        getEvent();
        getPeopleWhoWantToJoin();
        getParticipiants();
      }
    });
  }

  //get user data
  async function getUser(user) {
    const ref = await firebase.firestore().collection('users').doc(user);
    ref.onSnapshot((qr) => {
      // tiedot viedään userStateen
      let name_f = qr.data().displayName;
      let age_f = qr.data().age;
      let bio_f = qr.data().bio;
      setUser({ name: name_f, age: age_f, bio: bio_f });
      console.log('id from haeUser : ', qr.id);
      setPics(qr.data().images);
    });
  }

  //get event data
  async function getEvent() {
    const ref = await firebase.firestore().collection('events').doc(route.params.userMatchProfile);
    ref.onSnapshot((qr) => {
      // tiedot viedään userStateen
      let name_f = qr.data().displayName;
      let bio_f = qr.data().bio;
      //let osallistujat_f = qr.data().
      setEvent({ name: name_f, bio: bio_f });
      setView(false);
      console.log('id from haeEvent : ', qr.id);
    });
  }

  async function getPeopleWhoWantToJoin() {
    var peopleWhoLikedMe = await firebase.firestore().collection("events").doc(route.params.userMatchProfile).collection("swipes").doc("usersThatLikedMe").get();
    var usersThatSwipedOnMe = peopleWhoLikedMe.data().swipes;
    var usersAlreadyInEvent = await firebase.firestore().collection("matches").doc(route.params.userMatchProfile).get();
    usersAlreadyInEvent = usersAlreadyInEvent.data().users;
    let usersThatSwipedOnMeHelperArray = [];
    usersThatSwipedOnMe.forEach((element) => {
      usersThatSwipedOnMeHelperArray.push(element.user);
    });

    usersThatSwipedOnMeHelperArray = usersThatSwipedOnMeHelperArray.filter(function (el) {
      return !usersAlreadyInEvent.includes(el);
    });

    var finaldPeopleWhoWantToJoin = [];
    if (usersThatSwipedOnMeHelperArray.length !== 0) {
      var query = await firebase.firestore()
        .collection("users")
        .where(firebase.firestore.FieldPath.documentId(), "in", usersThatSwipedOnMeHelperArray)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var data = doc.data();
            data.uid = doc.id;
            finaldPeopleWhoWantToJoin.push(doc.data());
          });
        });
    }
    setPeoplesWhoWantToJoin(finaldPeopleWhoWantToJoin);
  }

  async function getParticipiants()
  {
    var usersAlreadyInEvent = await firebase.firestore().collection("matches").doc(route.params.userMatchProfile).get();
    let participiantList = [];
    participiantList = usersAlreadyInEvent.data().users;
    let finalParticipiantList = [];
    if (participiantList.length !== 0) {
      var query = await firebase.firestore()
        .collection("users")
        .where(firebase.firestore.FieldPath.documentId(), "in", participiantList)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var asd = doc.data();
            asd.uid = doc.id;
            finalParticipiantList.push(doc.data());
          });
        });
    }
    finalParticipiantList.forEach(element => {
      if(element.images.length === 0)
      {
        element.images.append("https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg");
      }
    });
    setParticipiants(finalParticipiantList);
  }


  //Call /swipe endpoint where event swipes yes to user
  function Accept(accepted, uid)
  {
    console.log(accepted,uid)
  }

  //call /removematch endpoint where match unmatches target
  function Kick(uid)
  {
     //unmatchataan
  }

  //selects which one list to show, participiants or peoplesinqueue
  function LazyChoice()
  {
    if(selectedIndex === 0)
    {
      return Participiants()
    } 
    return PeoplesInQueue();
  }


  // Only event owner sees kick button
  function PeoplesInQueue() {
    {
      return peoplesWhoWantToJoin.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={{ uri: l.images[0] }} />
          <ListItem.Content>
            <View>
              <ListItem.Title>{l.displayName} </ListItem.Title>

              <ListItem.Subtitle>{l.age}</ListItem.Subtitle>
            </View>
          </ListItem.Content>
          <View style={styles.viewLikersItemContent}>
            <Button 
              type="outline"
              raised={true}
              onPress={() => Accept(true, l.uid)}
              icon={{
                name: "arrow-right",
                size: 30,
                color: "red",
              }}
            />
                        <Button 
              type="outline"
              raised={true}
              onPress={() => Accept(false, l.uid)}
              icon={{
                name: 'arrow-right',
                size: 30,
                color: 'red'
              }}
            />
          </View>
        </ListItem>
      ));
    }
  }

  function Participiants() {
    {
      return participiants.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={{ uri: l.images[0] }} />
          <ListItem.Content>
            <View>
              <ListItem.Title>{l.displayName} </ListItem.Title>

              <ListItem.Subtitle>{l.age}</ListItem.Subtitle>
            </View>
          </ListItem.Content>
          <View style={styles.viewLikersItemContent}>
            <Button 
              type="outline"
              raised={true}
              onPress={() => Kick(l.uid)}
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

  
  const removeMatch = (match, id) => {
    let url = store.getState().DefaultReducer[0].url + 'removeMatch';
    let bodi = {
      idToken: userToken,
      data: {
        match: match
      },
      uid: id
    };


    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodi)
    })
      .catch((err) => console.error(err));
    showUnavaible();
  };

  const showDeleted = (asd, qwe) => {
    showMessage({
      message: 'Match deleted',
      //description: "this is unfortunate",
      description: qwe,
      type: 'default',
      duration: 1850,
      backgroundColor: 'orange',
      color: 'black'
    });
  };

  const showUnavaible = (asd, qwe) => {
    showMessage({
      message: 'Match delete unsuccessful',
      description: 'moi',
      type: 'default',
      duration: 1850,
      backgroundColor: 'pink',
      color: 'black'
    });
  };

  const deleteRoute = () => {
    let userToDelete = route.params.userMatchProfile;
    showDeleted(userToDelete, userID);
    removeMatch(userToDelete, userID);
    navigation.popToTop();
  };


  return (
    <View style={[styles.alignItemsCenter, styles.background]}>
      <View style={{ marginLeft: '80%', alignItems: 'flex-start' }}>
        <Tooltip
          popover={
            <View style={{ flexDirection: 'row', width: '60%', alignContent: 'flex-start' }}>
              <Text onPress={deleteRoute} style={{ color: 'whitesmoke', fontWeight: 'bold', marginRight: 10 }}>
                Unmatch
              </Text>
              <Icon name="heart-off" type="material-community" color="#FFA500" />
            </View>
          }
          withOverlay={false}
          withPointer={false}
          skipAndroidStatusBar={true}
          backgroundColor="black"
          containerStyle={{
            borderWidth: 2,
            borderColor: '#FFA500',
            width: '40%',
            backgroundColor: 'black',
            margin: 5,
            padding: 5
          }}
        >
          <Icon
            //reverse
            name="dots-vertical"
            type="material-community"
            color="#FFA500"
          />
        </Tooltip>
      </View>
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
        <View></View>
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

                <ButtonGroup
                  onPress={(value) => setSelectedIndex(value)}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={[styles.background, styles.heightForty]}
                />
              </ThemeProvider>
              <LazyChoice></LazyChoice>
            </View>
          )}
      </View>
    </View>
  );
}
