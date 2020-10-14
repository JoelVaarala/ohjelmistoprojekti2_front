import "react-native-gesture-handler"; //Tää pitää olla päälimmäisenä koska syyt?
import { StatusBar } from "expo-status-bar";
import { StyleSheet, AsyncStorage, Text, View, ImageBackground } from "react-native";
import React from "react";
import SwipeCards from "./components/SwipeCards.js";
import MyProfile from "./components/MyProfile";
import SwipingPage from "./components/SwipingPage";
import Matches from "./components/Matches";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import EditProfile from './components/EditProfile';
import Settings from './components/Settings';
import Add_Event from './components/Add_Event';
//import FirebaseSaato from './components/FirebaseSaato'
import Startup from "./components/Startup";
import Register from "./components/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import firebase from 'react-native-firebase';
import ViewLikers from "./components/ViewLikers.js";
import styles from './styles';

import { Provider } from 'react-redux';
import { store } from './redux/index';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const ListStack = createStackNavigator();

export default function App() {
  // true -> false, bypass jolla jättää login pagen välistä
  const [vaihto, setVaihto] = React.useState(false);

  const asetaLogin = () => { };

  //Tämä hoitaa kirjautumisen ja initializen appii, kutsutaan vain kerran ja tässä.
  React.useEffect(() => {
    console.log("use effect")
    //firebase.initializeApp()
    firebase.initializeApp(global.firebaseConfig);
    //console.log(firebase.config.toString())
    //yritaKirjautua();

  }, []);



  //Substacki tällä tai sitten luodaa vaa erillsiet sivut joissa on takaisin nappula että toi toolbari piilottuu
  const ProfiiliSettingsStack = () => {
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Profile" component={MyProfile} />
        <ListStack.Screen name="Settings" component={Settings} />
        <ListStack.Screen name="Add_Event" component={Add_Event} />
        {/* <ListStack.Screen name="Lisää kuva" component={} /> */
          <ListStack.Screen name="EditProfile" component={EditProfile} />}
        <ListStack.Screen name="FullProfile" component={Profile} />
      </ListStack.Navigator>
    );
  };

  const MatchStack = () => {
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Matches" component={Matches} />
        <ListStack.Screen name="Chat" component={Chat} />
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
    )
  }

  
const MyTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(0, 0, 0)',
    text: 'orange',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
  
  
};

  return (
    // <View>
    //   <Text asd></Text>
    //   </View>

    <Provider store={store}>

      <NavigationContainer theme = {MyTheme}>
        {vaihto ? (
          <Stack.Navigator>
            <ListStack.Screen name="Login" component={Startup} />
            <ListStack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        ) : (
            <Tab.Navigator
              swipeEnabled={false}
              tabBarOptions={{
                labelStyle: {
                  fontSize: 10,
                  // color: 'orange', //overridee nyt activetintcolor ja inactiven, vaihdetan jossain kohtaa sprintti 3, sang.
                  fontWeight: 'bold',
                  fontFamily: 'roboto'
                },
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',

                // tabStyle: { width: 100 },
                style: { backgroundColor: "black", paddingTop: 0 },
              }}
            >
              <Tab.Screen name="Matches" component={MatchStack} />
              <Tab.Screen name="Swipes" component={SwipingPage} />
              <Tab.Screen name="My Likes" component={ViewLikers} />
              <Tab.Screen name="Profile" component={ProfiiliSettingsStack} />
              <Tab.Screen name="Login" component={LoginStack} />
            </Tab.Navigator>
          )}
      </NavigationContainer>
    </Provider>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
*/
