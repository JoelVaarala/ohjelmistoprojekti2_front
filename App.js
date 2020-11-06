import 'react-native-gesture-handler'; //Tää pitää olla päälimmäisenä koska syyt?
import React from 'react';
import { Text, AsyncStorage } from "react-native";
import MyProfile from './components/MyProfile';
import SwipingPage from './components/SwipingPage';
import Matches from './components/Matches';
import Chat from './components/Chat';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Settings from './components/Settings';
import Add_Event from './components/Add_Event';
import Startup from './components/Startup';
import Register from './components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, View } from "react-native";
import firebase from 'firebase';
import ViewLikers from './components/ViewLikers.js';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import FlashMessage from 'react-native-flash-message';
import * as Location from "expo-location";
import "./components/Globaalit";
import { AuthContext } from './components/AuthContext'

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const ListStack = createStackNavigator();
firebase.initializeApp(global.firebaseConfig)

// export const AuthContext = React.createContext();

export default function App() {

  // kirjautunut: false -> true, bypass jolla jättää login pagen välistä
  const [navigaationVaihto, setNavigaationVaihto] = React.useState({ ladataan: true, kirjautunut: false });
  const kayttajaKey = 'kayttaja';
  const salasanaKey = 'salasana';

  //Tämä hoitaa kirjautumisen ja initializen appii, kutsutaan vain kerran ja tässä.
  React.useEffect(() => {
    console.log('use effect');
    // await firebase.initializeApp(global.firebaseConfig)
    // console.log(firebase.apps[0]._nativeInitialized);

    // setNavigaationVaihto({ ladataan: false, kirjautunut: false })
    loginOnStartup();
  }, []);

  //Tämä contexti hallinnoi sisäänkirjautumis flowta
  const authContext = React.useMemo(
    () => ({
      signIn: async (kayttaja, salasana) => {
        console.log('Logging in alkaa');
        await login(kayttaja, salasana);
        AsyncStorage.setItem(kayttajaKey, kayttaja);
        AsyncStorage.setItem(salasanaKey, salasana);
        setNavigaationVaihto({ ladataan: false, kirjautunut: true });
        console.log('Logging in loppui')
      },
      signOut: async () => {
        console.log('Logging out alkaa');
        await AsyncStorage.removeItem(kayttajaKey);
        await AsyncStorage.removeItem(salasanaKey);
        setNavigaationVaihto({ ladataan: false, kirjautunut: false });
        console.log('Logging out loppuu');
      },
    }),
    []
  );

  const loginOnStartup = async () => {
    let kayttaja = await AsyncStorage.getItem(kayttajaKey);
    let salasana = await AsyncStorage.getItem(salasanaKey);
    console.log('AsyncStorage -> käyttäjä: ' + kayttaja + ', salasana: ' + salasana)
    if (kayttaja != null && salasana != null) {
      await login(kayttaja, salasana);
      setNavigaationVaihto({ ladataan: false, kirjautunut: true });
    } else {
      setNavigaationVaihto({ ladataan: false, kirjautunut: false });
    }
  }

  const login = async (kayttaja, salasana) => {
    await firebase.auth()
      .signInWithEmailAndPassword(kayttaja, salasana)
      .then(() => {
        console.log("User logged in");
        // console.log(auth().currentUser)
        global.myUserData.uid = firebase.auth().currentUser.uid;
        firebase.auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            global.myUserData.idToken = idToken;
          })
          .catch(function (error) {
            // Handle error
            return;
          });
        // UpdateLocation();
        //Debugin takia tässä, poistettu 28.9.2020
        //LahetaViestiFirebaseen();
      })

      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
        return;
      });
      // return;
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    } else {
      let location = await (await Location.getCurrentPositionAsync({})).coords;
      let firebaseUpdate = await UpdateFirebase(location);
      console.log(firebaseUpdate);
    }
    // await UpdateLocation();
  };

  async function UpdateLocation() {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await (await Location.getCurrentPositionAsync({})).coords;
      let locationUpdate = await UpdateFirebase(location);
      console.log(locationUpdate);
    })();
  }

  //tää menee endpointin kautta.
  async function UpdateFirebase(newloc) {
    let bodii = {
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
      data: {
        latitude: newloc.latitude,
        longitude: newloc.longitude,
      },
    };

    // return;
    fetch(global.url + "updateLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodii),
    })
      .then((response) => response.json())
      // .then(response => console.log(response))
      .then((data) => {
        console.log("Updated location");
      })
      .catch((err) => {
        console.error(err)
        return 'Lokaation päivittäminen epäonnistui'
      });
      return 'Lokaation päivittäminen onnistui'
    //palauttaa asynscista arrayn, sijoitetaan swipettaviin.
  }

  //Substacki tällä tai sitten luodaa vaa erillsiet sivut joissa on takaisin nappula että toi toolbari piilottuu
  const ProfiiliSettingsStack = () => {
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Profile" component={MyProfile} />
        <ListStack.Screen name="Settings" component={Settings} />
        <ListStack.Screen name="Add_Event" component={Add_Event} />
        {
          /* <ListStack.Screen name="Lisää kuva" component={} /> */
          <ListStack.Screen name="EditProfile" component={EditProfile} />
        }
        <ListStack.Screen name="FullProfile" component={Profile} />
      </ListStack.Navigator>
    );
  };

  const MatchStack = () => {
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Matches" component={Matches} />
        <ListStack.Screen name="Chat" component={Chat}
          options={{
            headerRight: () => (
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 120, width: 1050 }}>

                <Button
                  onPress={() => alert('This is a button!')}
                  title="Tähän avatari"
                  color="black"
                />

              </View>
            )
          }}
        />
        {/* <ListStack.Screen name="Lisää kuva" component={}/> */}
        <ListStack.Screen name="MatchProfile" component={Profile} />
      </ListStack.Navigator>
    );
  };

  const LoginStack = () => {
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Login" component={Startup} />
        <ListStack.Screen name="Rekisteröidy" component={Register} options={{ headerShown: false }} />
      </ListStack.Navigator>
    );
  };

  const SwipeStack = () => {
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Swipes" component={SwipingPage} />
        <ListStack.Screen name="Matchprofile" component={Profile} />
      </ListStack.Navigator>
    );
  };

  const MyTheme = {
    dark: true,
    colors: {
      primary: 'white',
      background: 'rgb(242, 242, 242)',
      card: 'white',
      text: 'black',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)'
    }
  };

  const navIconColor = (focused) => (focused ? 'black' : 'gray');

  const Sisalto = () => {
    return (
      <AuthContext.Provider value={authContext}>
        <Provider store={store}>

          <NavigationContainer theme={MyTheme}>

            {navigaationVaihto.kirjautunut ? (
              <Tab.Navigator
                swipeEnabled={false}
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconColor;

                    if (route.name === 'Matches') {
                      iconName = "people";
                      iconColor = focused ? 'red' : 'orange';
                    } else if (route.name === 'Swipes') {
                      iconName = 'touch-app';
                      iconColor = focused ? 'red' : 'orange';
                    } else if (route.name === 'My Likes') {
                      iconName = "event-available";
                      iconColor = focused ? 'red' : 'orange';
                    } else if (route.name === 'Profile') {
                      iconName = 'person';
                      iconColor = focused ? 'red' : 'orange';
                    } else if (route.name === 'Login') {
                      iconName = 'security';
                      iconColor = focused ? 'red' : 'orange';
                    }

                    // You can return any component that you like here!
                    return <Icon color={iconColor} size={28} name={iconName} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: 'red',
                  inactiveTintColor: 'orange',
                  showIcon: true,
                  showLabel: false,
                }}
              >
                <Tab.Screen name="Matches" component={MatchStack} />
                <Tab.Screen name="Swipes" component={SwipeStack} />
                <Tab.Screen name="My Likes" component={ViewLikers} />
                <Tab.Screen name="Profile" component={ProfiiliSettingsStack} />
                <Tab.Screen name="Login" component={LoginStack} />
              </Tab.Navigator>

            ) : (

                <Stack.Navigator>
                  <ListStack.Screen name="Login" component={Startup} />
                  <ListStack.Screen name="Rekisteröidy" component={Register} />
                </Stack.Navigator>
              )}

          </NavigationContainer>
          {/* position of flash can also be set bottom, left, right*/}
          <FlashMessage position="top" />

        </Provider>
      </AuthContext.Provider>
    )
  }

  if (navigaationVaihto.ladataan) {
    return (
      <Text>Loading screeni tähän</Text>
    );
  } else {
    return (
      <Sisalto />
    );
  }

}
