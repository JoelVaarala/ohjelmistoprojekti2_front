import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, ListItem, Button, ThemeProvider, ButtonGroup, Icon, Tooltip } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import Carousel2 from './Carousel';
import firebase from 'firebase';
import styles from '../styles';


// identical fetches in different funcs : 
//
// var usersAlreadyInEvent = await firebase.firestore().collection("matches").doc(route.params.userMatchProfile).get();


// User's tags, bio, name and photos. Name and age cant be changed
export default function Profile({ navigation, route }, props) {
  const [user, setUser] = React.useState({
    name: 'name',
    age: 'age',
    bio: 'bio'
  });
  // Event data
  const [event, setEvent] = React.useState({
    name: 'name',
    bio: 'bio'
  });

  const [attendees, setAttendees] = React.useState([]);

  const [peoplesWhoWantToJoin, setPeoplesWhoWantToJoin] = React.useState([]);

  // type can be used to define if mathc is user vs event
  const [type, setType] = React.useState('');

  const [pics, setPics] = React.useState([]);

  const [eventInfo, setEventInfo] = React.useState({
    participiants: [{ images: ['https://randomuser.me/api/portraits/med/women/1.jpg'] }]
  });

  // true -> display user , false -> display event
  const [view, setView] = React.useState(true);
  const buttons = ['Attendees', 'Waiting'];

  const [selectedIndex, setSelectedIndex] = React.useState({ main: 0 });

  function updateIndex(name, value) {
    setSelectedIndex({ ...selectedIndex, [name]: value });
    console.log(name + ': ' + value);
  }

  const theme = {
    colors: {
      primary: 'black'
    }
  };

  // match doc id, that comes trough navigation from chat
  let doc = route.params.userMatchProfile;
  // CurrentUser
  let cur_uid = firebase.auth().currentUser.uid;  // ---------- HOX HOX replace auth() call 

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    fetchMatchData();
  }, []);

  // Fetch match data from firebase
  async function fetchMatchData() {
    const find = await firebase.firestore().collection('matches').doc(doc);
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
        setType('User');
        query.data().users.forEach((element) => {
          if (element != cur_uid) {
            user = element;
          }
        });
        fetchUser(user);

      } else if (matchType == "event") {
        setType("Event");

        fecthEvent();
        fetchApplicants();
        fetchAttendees();
      }
    });
  }

  async function fetchUser(user) {
    const ref = await firebase.firestore().collection('users').doc(user);
    ref.onSnapshot((qr) => {
      // user data to userState
      let name_f = qr.data().displayName;
      let age_f = qr.data().age;
      let bio_f = qr.data().bio;
      setUser({ name: name_f, age: age_f, bio: bio_f });
      setPics(qr.data().images);
    });
  }

  async function fecthEvent() {
    const ref = await firebase.firestore().collection('events').doc(route.params.userMatchProfile);
    ref.onSnapshot((qr) => {
      // event data to eventState
      let name_f = qr.data().displayName;
      let bio_f = qr.data().bio;

      setEvent({ name: name_f, bio: bio_f });
      setView(false);
    });
  }

  async function fetchApplicants() {

    var peopleWhoLikedMe = await firebase.firestore().collection("events").doc(route.params.userMatchProfile).collection("swipes").doc("usersThatLikedMe").get();
    var likers = peopleWhoLikedMe.data().swipes;
    var peopleInQueue = await firebase.firestore().collection("events").doc(route.params.userMatchProfile).collection("swipes").doc("mySwipes").get();
    peopleInQueue = peopleInQueue.data().swipes;
    var usersAlreadyInEvent = await firebase.firestore().collection("matches").doc(route.params.userMatchProfile).get();
    usersAlreadyInEvent = usersAlreadyInEvent.data().users;
    let peopleWhoSwiped = [];

    likers.forEach((element) => {
      peopleWhoSwiped.push(element.user);
    });

    peopleWhoSwiped = peopleWhoSwiped.filter(function (el) {
      return !usersAlreadyInEvent.includes(el);
    });


    var waitingToJoin = [];
    if (peopleWhoSwiped.length !== 0) {
      var query = await firebase.firestore()
        .collection("users")
        .where(firebase.firestore.FieldPath.documentId(), "in", peopleWhoSwiped)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {

            var result = doc.data();
            result.uid = doc.id;
            waitingToJoin.push(doc.data());
          });
        });
    }
    setPeoplesWhoWantToJoin(waitingToJoin);
  }

  async function fetchAttendees() {
    var usersAlreadyInEvent = await firebase.firestore().collection("matches").doc(route.params.userMatchProfile).get();
    let attendeeList = [];
    attendeeList = usersAlreadyInEvent.data().users;

    let confirmedAttendees = [];
    if (attendeeList.length !== 0) {

      var query = await firebase.firestore()
        .collection("users")
        .where(firebase.firestore.FieldPath.documentId(), "in", attendeeList)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {

            var userData = doc.data();
            userData.uid = doc.id;

            confirmedAttendees.push(doc.data());
          });
        });
    }
    attendees.forEach(element => {
      if (element.images.length === 0) {
        element.images.append("https://randomuser.me/api/portraits/med/women/1.jpg");
      }
    });
    setAttendees(confirmedAttendees);
  }


  function Accept(accepted, uid) {
    console.log(accepted, uid)
  }

  function Kick(uid) {
    //unmatch
  }


  function LazyChoice() {
    if (selectedIndex.main === 0) {
      return Attending()
    }
    return Applicants();
  }

  // Only event owner have button to "kick" persons
  function Applicants() {
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
            <Button //tää on kicki button
              type="outline"
              raised={true}
              onPress={() => Accept(true, l.uid)}
              icon={{
                name: "arrow-right",
                size: 30,
                color: "red",
              }}
            />
            <Button //tää on kicki button
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

  function Attending() {
    {
      return attendees.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={{ uri: l.images[0] }} />
          <ListItem.Content>
            <View>
              <ListItem.Title>{l.displayName} </ListItem.Title>

              <ListItem.Subtitle>{l.age}</ListItem.Subtitle>
            </View>
          </ListItem.Content>
          <View style={styles.viewLikersItemContent}>
            <Button //tää on kicki button
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

  // removeMatch function
  const removeMatch = (match, id) => {
    let url = global.url + 'removeMatch';
    let bodi = {
      idToken: global.myUserData.idToken,
      data: {
        match: match
      },
      uid: id
    };

    console.log(bodi);
    console.log(JSON.stringify(bodi));

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodi)
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('match deleted')
      })
      .catch((err) => console.error(err));
    showUnavaible();
  };

  const showDeleted = (asd, qwe) => {
    showMessage({
      message: 'Match deleted',
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
      description: 'something went wrong',
      type: 'default',
      duration: 1850,
      backgroundColor: 'pink',
      color: 'black'
    });
  };

  const deleteRoute = () => {
    let userMatchProfile = route.params.userMatchProfile;
    let currentUserId = cur_uid;
    showDeleted(userMatchProfile, currentUserId);
    removeMatch(userMatchProfile, currentUserId);
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
            }
          />
        </View>
      ) : (
          <View>{/* Here event pics eventually */}</View>
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
                  onPress={(value) => updateIndex("main", value)}
                  selectedIndex={selectedIndex.main}
                  buttons={buttons}
                  containerStyle={[styles.background, styles.heightForty]}
                />
              </ThemeProvider>
              <LazyChoice />
            </View>
          )}

      </View>

    </View>
  );
}