import React from "react";
import { View, FlatList} from "react-native";
import { Avatar, ListItem, ThemeProvider, ButtonGroup } from "react-native-elements";
import { store } from "../redux/index";
import firebase from "firebase";
import styles from "../styles";

export default function Matches({ navigation }) {

  // all users matches are saved here
  const [myMatches, setMyMatches] = React.useState([]);
  // matches that have been filtered are saved here
  const [myMatchesFiltered, setMyMatchesFiltered] = React.useState([]);
  // events where user is owner are saved here
  const [myEvents, setMyEvents] = React.useState([]);
   // indexes for buttongroup
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // buttons for ButtonGroup
  const buttons = ["Users", "Events", "My Events"];
  // get userId from reducer
  let userID = store.getState().UserDataReducer[0].id;

  // filter myMatches based on selected filters
  function filterMatches() {
    let filteredMatchesList = [];
    if (selectedIndex == 0) {
      filteredMatchesList = myMatches.filter((item) => item.matchType === 'user');
    } else if (selectedIndex == 1) {
      filteredMatchesList = myMatches.filter((item) => item.matchType === 'event');
    } else if (selectedIndex == 2) {
      filteredMatchesList = myEvents;
    }
    setMyMatchesFiltered(filteredMatchesList);
  }

  React.useEffect(() => {
    filterMatches();
  }, [selectedIndex, myMatches]);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyMatches();
    });
    return unsubscribe;
  }, [navigation]);

  const getMyMatches = async () => {
    // this fetches all users matches
    try {
      // this returns whole result of 'doc'
      let num = 1;
      let temporaryArray = [];
      await firebase
        .firestore()
        .collection("matches")
        .where("users", "array-contains", userID)
        .get()
        .then(async function (querySnapshot) {
          querySnapshot.forEach(async function (doc) {
            var matchData = doc.data();
            let chatname = '';
            num = num + 1;
            if (matchData.matchtype == 'event') {
              chatname = matchData.displayNames[0];
            } else {
              // compares which of the names in match belongs to user and which belongs to the match we want to show
              matchData.displayNames.forEach((element) => {
                if (element != firebase.auth().currentUser.displayName) chatname = element;
              });
            }
            temporaryArray.push({
              matchid: doc.id,
              bio: matchData.bio,
              name: chatname,
              matchType: matchData.matchType,
              // placeholder picture for match
              avatar_url: `https://randomuser.me/api/portraits/med/women/${num}.jpg`
            });
          });
        });
      setMyMatches(temporaryArray);
    } catch (error) {
      console.log(error);
    }

    // this fetches all events where user is the owner
    try {

      let temporaryArrayMyEvents = [];
      await firebase
        .firestore()
        .collection("events")
        // fetches the evenst user owns from events
        .where("eventOwners", "array-contains", userID)
        .get()
        .then(async function (querySnapshot) {
          querySnapshot.forEach(async function (doc) {
            var EventData = doc.data();
            let chatname = EventData.displayName;
            let image;
            // set placeholder image for your even if there is no pictures
            if (EventData.images.length == 0) {
              image = 'https://image.freepik.com/free-vector/hand-with-pen-mark-calendar_1325-126.jpg'
            } else {
              image = EventData.images[0];
            }
            temporaryArrayMyEvents.push({
              matchid: doc.id,
              bio: EventData.bio,
              name: chatname,
              matchType: 'My event',
              avatar_url: image,
            });
          });
        });

      setMyEvents(temporaryArrayMyEvents);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        navigation.navigate('Chat', { chatti: item.matchid, photo: item.avatar_url });
      }}
      containerStyle={styles.matchesBackgroundColor}
      bottomDivider
    >
      <Avatar rounded source={{ uri: item.avatar_url }} />
      <ListItem.Content style={styles.opacityOne}>
        <ListItem.Title style={[styles.matchesName, styles.fontRoboto]}> {item.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.textGreyRoboto}> {item.matchType}</ListItem.Subtitle>
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
        <FlatList horizontal={false} data={myMatchesFiltered} renderItem={renderItem}></FlatList>
      </View>
    </View>
  );
}