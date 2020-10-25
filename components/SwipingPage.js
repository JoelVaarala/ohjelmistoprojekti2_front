import React from 'react';
import { View } from 'react-native';
import { Icon, ButtonGroup, ThemeProvider } from 'react-native-elements';
import SwipeCards from './SwipeCards';
import * as Location from 'expo-location';
import styles from '../styles';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function SwipingPage({ navigation, route }) {
  [swipettavat, setSwipettavat] = React.useState([]);
  const [nykyinenSwipettava, setNykyinenSwipettava] = React.useState('');

  //ratkaistava vielä se että swipettavat ei päivity swipecardsiin.

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //console.log(firebase.auth().currentUser)
      HaeSwipettaviaBackista();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  async function HaeSwipettaviaBackista() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await (await Location.getCurrentPositionAsync({})).coords;
    //Connectaa endpointiin, lähettää parametrinä omat hakutoiveet. Vaihtoehtona että bäkki itse noutas firebasesta mutta ei kai tarpeen?
    console.log('Hae swipettäviä');
    global.myUserData.filters.myLocation.latitude = location.latitude;
    global.myUserData.filters.myLocation.longitude = location.longitude;

    let bodii = {
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
      data: global.myUserData.filters
    };

    console.log(bodii);
    fetch(global.url + 'findSwipeables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodii)
    })
      .then((response) => response.json())
      // .then(response => console.log(response))
      .then((data) => {
        console.log('Find results:');
        //console.log(data)
        console.log(data.result);
        setSwipettavat(data.result);
        let id = data.result[0].uid;
        setNykyinenSwipettava(id);
      })
      .catch((err) => console.error(err));
    //palauttaa asynscista arrayn, sijoitetaan swipettaviin.
  }

  function LuoSwipecardi() {
    //Tällä saadaan päiviettyä nää shitit oikeasti statesta.
    return <SwipeCards vaihtoehdot={swipettavat} />;
  }

  //Nämä ovat ButtonGroupille
  function updateIndex(name, value) {
    setSelectedIndex({ ...selectedIndex, [name]: value });
    console.log(name + ': ' + value);
  }

  const buttons = ['Users', 'Events', 'Both'];
  const subButtons = ['Open', 'Public', 'Private'];
  const [selectedIndex, setSelectedIndex] = React.useState({ main: 2, sub: [1] });

  const theme = {
    colors: {
      primary: 'black'
    }
  };

  return (
    <View style={[styles.container, styles.containerCenter, styles.backgroundBlack]}>
      <ThemeProvider theme={theme}>
        <ButtonGroup
          onPress={(value) => updateIndex('main', value)}
          selectedIndex={selectedIndex.main}
          buttons={buttons}
          containerStyle={[styles.backgroundBlack, styles.heightForty]}
        />
        {selectedIndex.main != 0 ? (
          <ButtonGroup
            onPress={(value) => updateIndex('sub', value)}
            selectMultiple={true}
            selectedIndexes={selectedIndex.sub}
            buttons={subButtons}
            containerStyle={[styles.backgroundBlack, styles.heightForty]}
            style={styles.paddingBottomFifty}
          />
        ) : null}
      </ThemeProvider>

      <View style={[styles.containerFlexStart, styles.paddingTopFifty]}>
        {/* <SwipeCards vaihtoehdot={swipettavat} /> */}
        <LuoSwipecardi />
      </View>
      <View
        style={[styles.container, styles.flexDirectionRow, styles.justifyContentSpaceBetween, styles.alignItemsFlexEnd]}
      >
        <View style={styles.iconsPadding}>
          <Icon size={27} reverse name="cancel" />
        </View>
        <View style={styles.iconsPadding}>
          {/* ONGELMA: näyttää edellisen swipettävän profiilin jos sivu ei ole ehtinyt päivittyä, ensin kokeiltu {match : swipettavat[0].uid} */}
          <Icon
            size={27}
            reverse
            name="info"
            onPress={() => navigation.navigate('Matchprofile', { match: nykyinenSwipettava })}
          />
        </View>
        <View style={styles.iconsPadding}>
          <Icon size={27} reverse name="favorite" />
        </View>
      </View>
    </View>
  );
}
