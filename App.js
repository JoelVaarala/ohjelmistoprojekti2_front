import 'react-native-gesture-handler'; //Tää pitää olla päälimmäisenä koska syyt?
import React from 'react';
import MyProfile from './components/MyProfile';
import SwipingPage from './components/SwipingPage';
import Matches from './components/Matches';
import Chat from './components/Chat';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Settings from './components/Settings';
import Add_Event from './components/Add_Event';
//import FirebaseSaato from './components/FirebaseSaato'

import Startup from './components/Startup';
import Register from './components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, View } from "react-native";

import firebase from 'react-native-firebase';
import ViewLikers from './components/ViewLikers.js';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import FlashMessage from 'react-native-flash-message';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const ListStack = createStackNavigator();

export default function App() {
  // true -> false, bypass jolla jättää login pagen välistä
  const [vaihto, setVaihto] = React.useState(false);

  const asetaLogin = () => { };

  //Tämä hoitaa kirjautumisen ja initializen appii, kutsutaan vain kerran ja tässä.
  React.useEffect(() => {
    console.log('use effect');
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
              <View style={{flex : 1 , flexDirection: 'row', justifyContent : 'flex-end', paddingRight : 120, width : 1050}}>

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

  return (
    <Provider store={store}>
      <NavigationContainer theme={myTheme}>
        {vaihto ? (
          <Stack.Navigator>
            <ListStack.Screen name="Login" component={Startup} />
            <ListStack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        ) : (

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
              activeTintColor: "black",
              inactiveTintColor: "white",
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
        )}

      </NavigationContainer>
      {/* position of flash can also be set bottom, left, right*/}
      <FlashMessage position="top" />
    </Provider>
  );
}
