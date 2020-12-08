import "react-native-gesture-handler";
import React from "react";
import { Alert, YellowBox, Text, AsyncStorage } from "react-native";
import MyProfile from "./MyProfile";
import SwipingPage from "./SwipingPage";
import Matches from "./Matches";
import { Avatar } from 'react-native-elements';
import Chat from "./Chat";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import Add_Event from "./Add_Event";
import Login from "./Login";
import Register from "./Register";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from "react-native";
import firebase from "firebase";
import { Icon } from "react-native-elements";
import { Provider } from "react-redux";
import { store } from "../redux/index";
import FlashMessage from "react-native-flash-message";
import * as Location from "expo-location";
import "./Globaalit";
import { AuthContext } from "./AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ListStack = createStackNavigator();
// firebase.initializeApp(global.firebaseConfig);

// tällä pääsee eroon Setting a timer warningista, mihin ei ole ratkaisua react nativen puolella tällä hetkellä https://github.com/facebook/react-native/issues/12981
// YellowBox.ignoreWarnings(['Setting a timer', 'Animated']);
// YellowBox.ignoreWarnings(['']);

export default function Navigation() {

  // If loading is true, loadingscreen will be displayed. If loggedIn is true, apps content will be displayed, else login page will be displayed
  const [navigationChange, setNavigationChange] = React.useState({ loading: true, loggedIn: false });
  // key for AsyncStorage
  const emailKey = 'email';
  const passwordKey = 'password';

  //Tämä hoitaa kirjautumisen ja initializen appii, kutsutaan vain kerran ja tässä.
  React.useEffect(() => {
    loginOnStartup();
  }, []);

  //Tämä contexti hallinnoi sisäänkirjautumisflowta
  const authContext = React.useMemo(
    () => ({
      // attempts to sign in with login info and saves them to AsyncStorage if sign in was successful
      signIn: async (email, password) => {
        setNavigationChange({ loading: true, loggedIn: false });
        let loginResponse = await login(email, password);
        if (loginResponse === 'auth/user-not-found' || loginResponse === 'auth/wrong-password') {
          Alert.alert('Wrong email or password');
          setNavigationChange({ loading: false, loggedIn: false });
        } else if (loginResponse === 'meni läpi') {
          AsyncStorage.setItem(emailKey, email);
          AsyncStorage.setItem(passwordKey, password);
          setNavigationChange({ loading: false, loggedIn: true });
        }
      },
      // signs out current user and removes login info from AsyncStorage
      signOut: async () => {
        firebase.auth().signOut();
        await AsyncStorage.removeItem(emailKey);
        await AsyncStorage.removeItem(passwordKey);
        setNavigationChange({ loading: false, loggedIn: false });
      }
    }),
    []
  );

  const loginOnStartup = async () => {
    let email = await AsyncStorage.getItem(emailKey);
    let password = await AsyncStorage.getItem(passwordKey);
    if (email != null && password != null) {
      authContext.signIn(email, password);
    } else {
      setNavigationChange({ loading: false, loggedIn: false });
    }
  };

  const login = async (kayttaja, salasana) => {
    let error;
    let userprom = await firebase
      .auth()
      .signInWithEmailAndPassword(kayttaja, salasana)
      .catch(function (err) {
        error = err.code;
        console.log(error);
        console.log(err);
      });
    if (error) {
      return error;
    }
    UpdateLocation();

    global.myUserData.uid = userprom.user.uid;
    let idTokeni = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
    // console.log(idTokeni)
    global.myUserData.idToken = idTokeni;
    return 'meni läpi';
  };

  async function UpdateLocation() {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await (await Location.getCurrentPositionAsync({})).coords;
      global.myUserData.filters.myLocation = {
        latitude: location.latitude,
        longitude: location.longitude
      };
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
        longitude: newloc.longitude
      }
    };
    fetch(global.url + 'updateLocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodii)
    })
      .then((response) => response.json())
      .then((_) => {
        console.log('Updated location');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //Substacki tällä tai sitten luodaa vaa erillsiet sivut joissa on takaisin nappula että toi toolbari piilottuu
  const ProfiiliSettingsStack = ({ navigation, route }) => {
    navigation.setOptions({ tabBarVisible: route.state ? (route.state.index == 0 ? true : false) : true });
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

  const MatchStack = ({ navigation, route }) => {
    navigation.setOptions({ tabBarVisible: route.state ? (route.state.index == 0 ? true : false) : true });
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Matches" component={Matches} />
        <ListStack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerRight: () => (
              <View
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 120, width: 1050 }}
              >
                <Avatar
                  onPress={() =>
                    navigation.navigate('MatchProfile', { userMatchProfile: route.state.routes[1].params.chatti })
                  }
                  size="large"
                  rounded
                  source={{ uri: route.state.routes[1].params.photo }}
                />
              </View>
            )
          }}
        />
        <ListStack.Screen name="MatchProfile" component={Profile} />
      </ListStack.Navigator>
    );
  };

  const SwipeStack = ({ navigation, route }) => {
    navigation.setOptions({ tabBarVisible: route.state ? (route.state.index == 0 ? true : false) : true });
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Swipes" component={SwipingPage} />
        <ListStack.Screen name="Matchprofile" component={Profile} />
      </ListStack.Navigator>
    );
  };

  const AppContent = () => {
    return (
      <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={myTheme}>
            {navigationChange.loggedIn ? (
              <Tab.Navigator
                swipeEnabled={false}
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconColor;

                    if (route.name === 'Matches') {
                      iconName = 'people';
                      iconColor = navIconColor(focused);
                    } else if (route.name === 'Swipes') {
                      iconName = 'touch-app';
                      iconColor = navIconColor(focused);
                    } else if (route.name === 'My Likes') {
                      iconName = 'event-available';
                      iconColor = navIconColor(focused);
                    } else if (route.name === 'Profile') {
                      iconName = 'person';
                      iconColor = navIconColor(focused);
                    } else if (route.name === 'Login') {
                      iconName = 'security';
                      iconColor = navIconColor(focused);
                    }

                    // You can return any component that you like here!
                    return <Icon color={iconColor} size={28} name={iconName} />;
                  }
                })}
                tabBarOptions={{
                  style: { position: 'absolute' },
                  activeTintColor: navBarTintColor,
                  showIcon: true,
                  showLabel: false
                }}
              >
                <Tab.Screen name="Matches" component={MatchStack} />
                <Tab.Screen name="Swipes" component={SwipeStack} />
                {/* <Tab.Screen name="My Likes" component={ViewLikers} /> */}
                <Tab.Screen name="Profile" component={ProfiiliSettingsStack} />
              </Tab.Navigator>
            ) : (
              <Stack.Navigator>
                <ListStack.Screen name="Login" component={Login} />
                <ListStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
          {/* position of flash can also be set bottom, left, right*/}
          <FlashMessage position="top" />
      </AuthContext.Provider>
    );
  };

  return <>{navigationChange.loading ? <Text>Loading screen here</Text> : <AppContent />}</>;
}
