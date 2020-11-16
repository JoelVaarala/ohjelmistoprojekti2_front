import "react-native-gesture-handler"; //Tää pitää olla päälimmäisenä koska syyt?
import React from "react";
import { Alert, YellowBox, Text, AsyncStorage } from "react-native";
import MyProfile from "./components/MyProfile";
import SwipingPage from "./components/SwipingPage";
import Matches from "./components/Matches";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Settings from "./components/Settings";
import Add_Event from "./components/Add_Event";
import Startup from "./components/Startup";
import Register from "./components/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Button, View } from "react-native";
import firebase from "firebase";
import ViewLikers from "./components/ViewLikers.js";
import { Icon } from "react-native-elements";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import FlashMessage from "react-native-flash-message";
import * as Location from "expo-location";
import "./components/Globaalit";
import { AuthContext } from "./components/AuthContext";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const ListStack = createStackNavigator();
firebase.initializeApp(global.firebaseConfig);

export default function App() {
  // kirjautunut: false -> true, bypass jolla jättää login pagen välistä
  const [navigaationVaihto, setNavigaationVaihto] = React.useState({ ladataan: true, kirjautunut: false });
  const kayttajaKey = "kayttaja";
  const salasanaKey = "salasana";

  //Tämä hoitaa kirjautumisen ja initializen appii, kutsutaan vain kerran ja tässä.
  React.useEffect(() => {
    console.log("use effect");
    loginOnStartup();
  }, []);

  // tällä pääsee eroon Setting a timer warningista, mihin ei ole ratkaisua react nativen puolella tällä hetkellä https://github.com/facebook/react-native/issues/12981
  YellowBox.ignoreWarnings(['Setting a timer', 'Animated']);
  // YellowBox.ignoreWarnings(['']);

  //Tämä contexti hallinnoi sisäänkirjautumisflowta
  const authContext = React.useMemo(
    () => ({
      signIn: async (kayttaja, salasana) => {
        console.log("Logging in alkaa");
        setNavigaationVaihto({ ladataan: true, kirjautunut: false });
        let loginni = await login(kayttaja, salasana);
        if (loginni === 'auth/user-not-found' || loginni === 'auth/wrong-password') {
          Alert.alert('väärä sähköposti tai salasana');
          setNavigaationVaihto({ ladataan: false, kirjautunut: false });
        } else if (loginni === 'meni läpi') {
          AsyncStorage.setItem(kayttajaKey, kayttaja);
          AsyncStorage.setItem(salasanaKey, salasana);
          setNavigaationVaihto({ ladataan: false, kirjautunut: true });
          console.log("Logging in loppui");
          // console.log(firebase.auth().currentUser)
        }
      },
      signOut: async () => {
        console.log("Logging out alkaa");
        firebase.auth().signOut();
        await AsyncStorage.removeItem(kayttajaKey);
        await AsyncStorage.removeItem(salasanaKey);
        setNavigaationVaihto({ ladataan: false, kirjautunut: false });
        console.log("Logging out loppuu");
        // console.log(firebase.auth().currentUser)
      },
    }),
    []
  );

  const loginOnStartup = async () => {
    let kayttaja = await AsyncStorage.getItem(kayttajaKey);
    let salasana = await AsyncStorage.getItem(salasanaKey);
    console.log("AsyncStorage -> käyttäjä: " + kayttaja + ", salasana: " + salasana);
    if (kayttaja != null && salasana != null) {
      authContext.signIn(kayttaja, salasana);
    } else {
      setNavigaationVaihto({ ladataan: false, kirjautunut: false });
    }
  };

  const login = async (kayttaja, salasana) => {
    let error;
    let userprom = await firebase.auth().signInWithEmailAndPassword(kayttaja, salasana)
      .catch(function (err) {
        error = err.code;
        console.log(error);
        console.log(err);
      });
    // console.log(userprom)
    if (error) {
      return error;
    }
    UpdateLocation();

    // console.log(userprom.user.uid)
    global.myUserData.uid = userprom.user.uid;
    let idTokeni = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    // console.log(idTokeni)
    global.myUserData.idToken = idTokeni;
    return 'meni läpi';
  }

  async function UpdateLocation() {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await (await Location.getCurrentPositionAsync({})).coords; 
      global.myUserData.filters.myLocation = 
      {
        latitude: location.latitude,
        longitude: location.longitude
      }
      UpdateFirebase(location);
    })();
  }

  //tää menee endpointin kautta.
  function UpdateFirebase(newloc) {
    
    let bodii = {
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
      data: {
        latitude: newloc.latitude,
        longitude: newloc.longitude,
      },
    };
    fetch(global.url + "updateLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodii),
    })
      .then((response) => response.json())
      .then(_ => {
        console.log("Updated location");
      })
      .catch((err) => {
        console.error(err);
      });
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
        <ListStack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerRight: () => (
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", paddingRight: 120, width: 1050 }}>
                <Button onPress={() => alert("This is a button!")} title="Tähän avatari" color="black" />
              </View>
            ),
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

  const Sisalto = () => {
    return (
      <AuthContext.Provider value={authContext}>
        <Provider store={store}>
          <NavigationContainer theme={myTheme}>
            {navigaationVaihto.kirjautunut ? (
              <Tab.Navigator
                swipeEnabled={false}
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconColor;

                    if (route.name === "Matches") {
                      iconName = "people";
                      iconColor = navIconColor(focused);
                    } else if (route.name === "Swipes") {
                      iconName = "touch-app";
                      iconColor = navIconColor(focused);
                    } else if (route.name === "My Likes") {
                      iconName = "event-available";
                      iconColor = navIconColor(focused);
                    } else if (route.name === "Profile") {
                      iconName = "person";
                      iconColor = navIconColor(focused);
                    } else if (route.name === "Login") {
                      iconName = "security";
                      iconColor = navIconColor(focused);
                    }

                    // You can return any component that you like here!
                    return <Icon color={iconColor} size={28} name={iconName} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: navBarTintColor,
                  showIcon: true,
                  showLabel: false,
                }}
              >
                <Tab.Screen name="Matches" component={MatchStack} />
                <Tab.Screen name="Swipes" component={SwipeStack} />
                <Tab.Screen name="My Likes" component={ViewLikers} />
                <Tab.Screen name="Profile" component={ProfiiliSettingsStack} />
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
    );
  };

  // if (navigaationVaihto.ladataan) {
  //   return <Text>Loading screeni tähän</Text>;
  // } else {
  //   return <Sisalto />;
  // }

  return (
    <>
      {navigaationVaihto.ladataan ? (<Text>Loading screeni tähän</Text>) : (<Sisalto />)}
    </>
  )
}
