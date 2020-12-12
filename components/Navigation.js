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
import { connect } from "react-redux";
import { store, addUid, addToken, addLatitude, addLongitude, addName } from "../redux/index";
import FlashMessage from "react-native-flash-message";
import * as Location from "expo-location";
import { AuthContext } from "./AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ListStack = createStackNavigator();

// with this you can get rid of 'Setting a timer...' warnings, no solution found yet for this warning https://github.com/facebook/react-native/issues/12981
YellowBox.ignoreWarnings(['Setting a timer']);

function Navigations() {

    // If loading is true, loadingscreen will be displayed. If loggedIn is true, apps content will be displayed, else login page will be displayed
    const [navigationChange, setNavigationChange] = React.useState({ loading: true, loggedIn: false });
    // keys for AsyncStorage
    const emailKey = 'email';
    const passwordKey = 'password';

    React.useEffect(() => {
        loginOnStartup();
    }, []);

    // this adds sign in and sing out functions to Authcontext, so you can use then in different components and switch between navigation layouts 
    const authContext = React.useMemo(
        () => ({
            // attempts to sign in with login info and saves them to AsyncStorage if sign in was successful, if not, allerts the user for why sign in wasnt successful
            signIn: async (email, password) => {
                setNavigationChange({ loading: true, loggedIn: false });
                let loginResponse = await login(email, password);
                if (loginResponse === 'Wrong email or password') {
                    Alert.alert('Wrong email or password');
                    setNavigationChange({ loading: false, loggedIn: false });
                } else if (loginResponse === 'No acces to location') {
                    Alert.alert('You must give access to location');
                    setNavigationChange({ loading: false, loggedIn: false });
                } else if (loginResponse === 'Success') {
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

    // tries to login when app is opened if you have signed in previously
    const loginOnStartup = async () => {
        let email = await AsyncStorage.getItem(emailKey);
        let password = await AsyncStorage.getItem(passwordKey);
        if (email != null && password != null) {
            authContext.signIn(email, password);
        } else {
            setNavigationChange({ loading: false, loggedIn: false });
        }
    };

    // login function
    const login = async (email, password) => {
        let error;
        // try to login using given email and password
        let userPromise = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(function (err) {
                error = err.code;
                console.log(error);
                console.log(err);
            });
        // if signing in results in error (wrong email or password) returns the error
        if (error === 'auth/user-not-found' || error === 'auth/wrong-password') {
            return 'Wrong email or password';
        }

        //store.dispatch(userData(firebase.auth().currentUser.uid))

        store.dispatch(addUid(userPromise.user.uid))
        store.dispatch(addName(userPromise.user.displayName))
        let idToken = await firebase.auth().currentUser.getIdToken(true);
        store.dispatch(addToken(idToken));

        let LocUpdate = await UpdateLocation();
        if (LocUpdate === 'No acces to location') {
            return 'No acces to location';
        }
     
        return 'Success';
    };

    //check if app has access to location info and gets it
    async function UpdateLocation() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            return 'No acces to location';
        }
        let location = (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })).coords;
        
        store.dispatch(addLatitude(location.latitude))
        store.dispatch(addLongitude(location.longitude))
        UpdateFirebase(location);
        return 'Location updated'
    }

    // send new location info to backend
    function UpdateFirebase(newloc) {
        let locationData = {
            uid: store.getState().UserDataReducer[0].id,
            idToken:  store.getState().UserDataReducer[0].token,
            data: {
                latitude: newloc.latitude,
                longitude: newloc.longitude
            }
        };
        fetch(store.getState().DefaultReducer[0].url + 'updateLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(locationData)
        })
            .then((response) => response.json())
            .then((_) => {
                console.log('Updated location');
            })
            .catch((err) => {
                console.error(err);
            });
    }

    // navigation stacks

    const ProfileAndSettingsStack = ({ navigation, route }) => {
        // with this bottomtab navigationbar is only shown on the first page of the navigation stack
        navigation.setOptions({ tabBarVisible: route.state ? (route.state.index == 0 ? true : false) : true });
        return (
            <ListStack.Navigator>
                <ListStack.Screen name="Profile" component={MyProfile} />
                <ListStack.Screen name="Settings" component={Settings} />
                <ListStack.Screen name="Add_Event" component={Add_Event} />
                <ListStack.Screen name="EditProfile" component={EditProfile} />
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
                        // this shows your matches picture in the chat and leads to tehir profile
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

    // content of the app
    const AppContent = () => {
        return (
            <AuthContext.Provider value={authContext}>
                <NavigationContainer theme={myTheme}>
                    {navigationChange.loggedIn ? ( // shows apps content or login page depending on login status
                        <Tab.Navigator
                            screenOptions={({ route }) => ({
                                tabBarIcon: ({ focused }) => {
                                    let iconName;
                                    let iconColor;

                                    if (route.name === 'Matches') {
                                        iconName = 'people';
                                        iconColor = navIconColor(focused);
                                    } else if (route.name === 'Swipes') {
                                        iconName = 'touch-app';
                                        iconColor = navIconColor(focused);
                                    } else if (route.name === 'Profile') {
                                        iconName = 'person';
                                        iconColor = navIconColor(focused);
                                    }
                                    return <Icon color={iconColor} size={28} name={iconName} />;
                                }
                            })}
                            tabBarOptions={{
                                showLabel: false
                            }}
                        >
                            <Tab.Screen name="Matches" component={MatchStack} />
                            <Tab.Screen name="Swipes" component={SwipeStack} />
                            <Tab.Screen name="Profile" component={ProfileAndSettingsStack} />
                        </Tab.Navigator>
                    ) : (
                            <Stack.Navigator>
                                <ListStack.Screen name="Login" component={Login} />
                                <ListStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                            </Stack.Navigator>
                        )}
                </NavigationContainer>
                <FlashMessage position="top" />
            </AuthContext.Provider>
        );
    };

    //while signing in or out, shows loading screen
    return <>{navigationChange.loading ? <Text>Loading screen here</Text> : <AppContent />}</>;
}

const mapStateToProps = (state) => ({
    UserDataReducer: state.UserDataReducer,
});
// Component connects to reducer and receives params state, action and main function
const Navigation = connect(mapStateToProps, { addUid, addName, addToken, addLatitude, addLongitude })(Navigations);
// Export default const above instead of "main function"
export default Navigation;