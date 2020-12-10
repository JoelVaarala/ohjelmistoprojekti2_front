import React from 'react';
import { View } from 'react-native';
import { Icon, ButtonGroup, ThemeProvider } from 'react-native-elements';
import SwipeCards from './SwipeCards';
import * as Location from 'expo-location';
import styles from '../styles';

export default function SwipingPage({ navigation }) {

  // here we save all swipeable users and events
  const [swipeables, setSwipeables] = React.useState([]);
  // here we save swipes that have been filtered 
  const [swipeableFiltered, setSwipeableFiltered] = React.useState([]);
  const [currentSwipeable, setCurrentSwipeable] = React.useState('');
  // indexes for buttongroup
  const [selectedIndex, setSelectedIndex] = React.useState({ main: 2, sub: [0, 1, 2] });
  // buttons for ButtonGroup
  const buttons = ['Users', 'Events', 'Both'];
  // buttons for selectin event types
  const subButtons = ['Open', 'Public', 'Private'];

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSwipeablesFromBackend();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    filterSwipes();
  }, [selectedIndex]);

  // get all swipeable events and users
  async function fetchSwipeablesFromBackend() {
    // --- TODO: nämä reduxista 
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await (await Location.getCurrentPositionAsync({})).coords;
    // connects to endpoint and sends desired data as params. 
    global.myUserData.filters.myLocation.latitude = location.latitude;       // --------- HOX HOX globals in use still
    global.myUserData.filters.myLocation.longitude = location.longitude;

    let filterData = {
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
      data: global.myUserData.filters
    };
    // ---

    
    fetch(global.url + 'findSwipeables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filterData)
    })
      .then((response) => response.json())
      .then((data) => {
        setSwipeables(data.result);
        setSwipeableFiltered(data.result);
        {
          data.result[0] && data.result[0].uid ? setCurrentSwipeable(data.result[0].uid) : setCurrentSwipeable('');
        }
      })
      .catch((err) => console.error(err));
  }

  function CreateSwipeCard() {
    // Updates data from states
    return <SwipeCards options={swipeableFiltered} />;
  }

  // for ButtonGroup
  function updateIndex(name, value) {
    setSelectedIndex({ ...selectedIndex, [name]: value });
  }

  // filters swipeables state using selected buttons
  function filterSwipes() {
    let swipelist = [];
    // these match the event types (needs to be in lowercase)
    let eventTypes = ['open', 'public', 'private'];
    let eventSubList = [];
    // switch selectedIndex.sub list index's to matching string list
    for (let i = 0; selectedIndex.sub.length > i; i++) {
      eventSubList.push(eventTypes[selectedIndex.sub[i]]);
    }
    // filter based on selected filters (selectedIndex.main= [users, events, both])
    if (selectedIndex.main == 0) {
      swipelist = swipeables.filter((item) => item.isEvent === false);
    } else if (selectedIndex.main == 1) {
      swipelist = swipeables.filter((item) => item.isEvent === true).filter((item) => eventSubList.includes(item.eventType));
    } else if (selectedIndex.main == 2) {
      let users = swipeables.filter((item) => item.isEvent === false);
      let events = swipeables
        .filter((item) => item.isEvent === true)
        .filter((item) => eventSubList.includes(item.eventType));
      swipelist = users.concat(events);
    }
    setSwipeableFiltered(swipelist);
  }

  return (
    <View style={[styles.container, styles.containerCenter, styles.background]}>
      <ThemeProvider theme={swipesPageButtonGroupColor}>
        <ButtonGroup
          onPress={(value) => updateIndex('main', value)}
          selectedIndex={selectedIndex.main}
          buttons={buttons}
          containerStyle={[styles.background, styles.buttonGroupBorderColor]}
          innerBorderStyle={styles.buttonGroupInnerlineColor}
          textStyle={styles.title}
          selectedTextStyle={styles.buttonTitleColor}
        />
        {selectedIndex.main != 0 ? (
          <ButtonGroup
            onPress={(value) => updateIndex('sub', value)}
            selectMultiple={true}
            selectedIndexes={selectedIndex.sub}
            buttons={subButtons}
            containerStyle={[styles.background, styles.buttonGroupBorderColor]}
            innerBorderStyle={styles.buttonGroupInnerlineColor}
            textStyle={styles.title}
            selectedTextStyle={styles.buttonTitleColor}
            style={styles.paddingBottomFifty}
          />
        ) : null}
      </ThemeProvider>

      <View style={[styles.justifyContentFlexStart, styles.marginTopThirty]}>
        <CreateSwipeCard />
      </View>
      <View
        style={[styles.container, styles.flexDirectionRow, styles.justifyContentSpaceBetween, styles.alignItemsFlexEnd]}
      >
        <View style={styles.iconsPadding}>

          {currentSwipeable != '' ? (
            <Icon
              size={27}
              reverse
              name="info"
              onPress={() => navigation.navigate('Matchprofile', { match: currentSwipeable })}
            />
          ) : (
              <Icon size={27} reverse name="info" />
            )}
        </View>
      </View>
    </View>
  );
}