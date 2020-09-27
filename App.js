import "react-native-gesture-handler"; //Tää pitää olla päälimmäisenä koska syyt?
import { StatusBar } from "expo-status-bar";
import { StyleSheet, AsyncStorage, Text, View, ImageBackground } from "react-native";
import React from "react";
import SwipeCards from "./components/SwipeCards.js";
import MyProfile from "./components/MyProfile";
import SwipingPage from "./components/SwipingPage";
import Matches from "./components/Matches";
import Chat from "./components/Chat";
//import FirebaseSaato from './components/FirebaseSaato'
import Startup from "./components/Startup";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const ListStack = createStackNavigator();
export default function App() {
  // true -> false, bypass jolla jättää login pagen välistä
  const [vaihto, setVaihto] = React.useState(false);

  const asetaLogin = () => {};

  //Substacki tällä tai sitten luodaa vaa erillsiet sivut joissa on takaisin nappula että toi toolbari piilottuu
  const ProfiiliSettingsStack = () => {
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Profile" component={MyProfile} />
        {/* <ListStack.Screen name="Asetukset" component={}/>
        <ListStack.Screen name="Lisää kuva" component={}/>
        <ListStack.Screen name="Profiili" component={}/> */}
      </ListStack.Navigator>
    );
  };

  return (
    // <View>
    //   <Text asd></Text>
    //   </View>
    <NavigationContainer>
      {vaihto ? (
        <Stack.Navigator>
          <Stack.Screen name="Login">{() => <Startup asetaLogin={asetaLogin} />}</Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: { fontSize: 12 },
            tabStyle: { width: 100 },
            style: { backgroundColor: "powderblue", paddingTop: 30 },
          }}
        >
          <Tab.Screen name="Swipes" component={SwipingPage} />
          <Tab.Screen name="Matches" component={Chat} />
          <Tab.Screen name="Profile" component={ProfiiliSettingsStack} />
          <Tab.Screen name="Login" component={Startup} />

          {/* <Tab.Screen name="Messages" component={Chat} />
            <Tab.Screen name="Profiili" component={MyProfile} /> */}
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
