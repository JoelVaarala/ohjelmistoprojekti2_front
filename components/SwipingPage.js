import React from 'react';
import { View } from 'react-native';
import { Icon, ButtonGroup, ThemeProvider } from 'react-native-elements';
import SwipeCards from './SwipeCards';
import * as Location from 'expo-location';
import styles from '../styles';

// User's tags, bio, name and photos. Name and age cant be changed
export default function SwipingPage({ navigation }) {

  const [swipeableFilter, setSwipeableFilter] = React.useState([]);
  const [swipeables, setSwipeables] = React.useState([]);
  const [currentSwipeable, setCurrentSwipeable] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState({ main: 2, sub: [0, 1, 2] });
  const buttons = ['Users', 'Events', 'Both'];
  const subButtons = ['Open', 'Public', 'Private'];

  // TODO : swipeables doesnt update to swipecards 

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

  async function fetchSwipeablesFromBackend() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await (await Location.getCurrentPositionAsync({})).coords;
    // connects to endpoint and sends desired data as params. 
    global.myUserData.filters.myLocation.latitude = location.latitude;       // --------- HOX HOX globals in use still
    global.myUserData.filters.myLocation.longitude = location.longitude;

    let bodii = {
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
      data: global.myUserData.filters
    };

    fetch(global.url + 'findSwipeables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodii)
    })
      .then((response) => response.json())
      .then((data) => {
        setSwipeables(data.result);
        setSwipeableFilter(data.result);
        {
          data.result[0] && data.result[0].uid ? setCurrentSwipeable(data.result[0].uid) : setCurrentSwipeable('');
        }
      })
      .catch((err) => console.error(err));
    // async returns array, placed on swipeables.
  }

  function LuoSwipecardi() {
    // Updates data from states
    return <SwipeCards options={swipeableFilter} />;
  }

  // for ButtonGroup
  function updateIndex(name, value) {
    setSelectedIndex({ ...selectedIndex, [name]: value });
  }

  function filterSwipes() {
    let swipelist = [];
    let eventSubs = ['open', 'public', 'private'];
    let eventSublista = [];
    // switch selectedIndex.sub list index's matching strings
    for (let i = 0; selectedIndex.sub.length > i; i++) {
      eventSublista.push(eventSubs[selectedIndex.sub[i]]);
    }

    if (selectedIndex.main == 0) {
      swipelist = swipeables.filter((item) => item.isEvent === false);
    } else if (selectedIndex.main == 1) {
      swipelist = swipeables.filter((item) => item.isEvent === true).filter((item) => eventSublista.includes(item.eventType));
    } else if (selectedIndex.main == 2) {
      let users = swipeables.filter((item) => item.isEvent === false);
      let events = swipeables
        .filter((item) => item.isEvent === true)
        .filter((item) => eventSublista.includes(item.eventType));
      swipelist = users.concat(events);
    }
    setSwipeableFilter(swipelist);
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
        <LuoSwipecardi />
      </View>
      <View
        style={[styles.container, styles.flexDirectionRow, styles.justifyContentSpaceBetween, styles.alignItemsFlexEnd]}
      >
        <View style={styles.iconsPadding}>
          {/* ISSUE: shows previous swipe profile , if page didnt refresh, first tried {match : swipettavat[0].uid} */}

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