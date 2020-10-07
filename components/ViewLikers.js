import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Image, Text, Picker } from 'react-native';
import { Avatar, ListItem, Overlay, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';


//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function ViewLikers({ navigation, route }) {
    const [selectedEvent, setEvent] = React.useState("");
    const [myEvents, setMyEvents] = React.useState([]) //listaa eventit
    const [peoplesWhoWantToJoin, setPeoplesWhoWantToJoin] = React.useState([])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //console.log(firebase.auth().currentUser)
            HaeOmatEventit();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    // eventti valittu, haetaan tähän swipetyt events dokumentista ja  vähennetään ne jotka on jo swipetty.
    React.useEffect(() => {
        // return;
        console.log("New blabla")
        HaeHakijat();
        // do something
        // }


    }, [selectedEvent]);

    async function HaeHakijat() {
        console.log("JEEE")
        var peopleWhoLikedMe = await firestore().collection("events").doc(selectedEvent).collection("swipes").
            doc("usersThatLikedMe").get()
         var lol = peopleWhoLikedMe.data().swipes
         console.log(lol)   
        var peopleInQueue = await firestore().collection("events").doc(selectedEvent).collection("swipes").
            doc("mySwipes").get()
        //console.log(peopleInQueue.data().swipes)

        let temppia = []
        peopleWhoLikedMe.data().swipes.forEach(element => {
            temppia.push(element.user)
        });

        //return;
        var query = await firestore().collection("users").where(firestore.FieldPath.documentId(), "in", temppia).
            get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            })
        //saadaan nyt kaikki userid:t kivasti, nyt voidaan queryttaa kaikki 
        //katsotaan ettei 

    }



    async function HaeOmatEventit() {

        console.log("#####################")
        console.log("id: " + global.myUserData.uid)
        let eventtiLista = [];
        //tän listan itemit menee dropdowniin, dropdownia kun päivittää niin hakee eventit listaan.
        var docRef = await firestore().collection("users").doc(global.myUserData.uid).collection("myOwnedEvents")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    eventtiLista.push(doc.id)
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
                setMyEvents(eventtiLista)
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        return;
        //Käytetään placeholderina, voidaan 
        var query = await firestore().collection("events").where("eventOwners", "array-contains", global.myUserData.uid).
            get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            })


    }
    //

    //Bäkistä tai firebasesta: Hae userit jotka on tykännyt eventistä ja joille eventti ei ole vielä swipennyt
    const placeholdertext = "Tag1, Tag2, Tag3, Tag4"

    const list = [
        {
            name: 'Seppo',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: placeholdertext
        },
        {
            name: 'Einari',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: placeholdertext
        },
        {
            name: 'Hillevi',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: placeholdertext
        },

    ]


    function Accept() {
        console.log("Accept")
    }


    function Reject() {
        console.log("Reject")
    }
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={selectedEvent}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setEvent(itemValue)}
                    >
                        {
                            myEvents.map((l, i) => (
                                <Picker.Item label={l} value={l} />
                            ))
                        }
                    </Picker>
                </View>
                <Text style={{ fontSize: 20 }}>  People who swiped for your event!</Text>
                {
                    peoplesWhoWantToJoin.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar source={{ uri: l.avatar_url }} />
                            <ListItem.Content>
                                <View>
                                    <ListItem.Title>{l.name}  23</ListItem.Title>
                                    <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>

                                </View>
                                <Text> 4km </Text>
                            </ListItem.Content>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>

                                <Button
                                    //style={styles.button}
                                    type="outline"
                                    raised={true}
                                    icon={{
                                        name: "arrow-right",
                                        size: 30,
                                        color: "lightgreen"
                                    }}
                                    onPress={Accept}
                                />
                                <Button
                                    type="outline"
                                    raised={true}
                                    onPress={Accept}
                                    icon={{
                                        name: "arrow-right",
                                        size: 30,
                                        color: "red"
                                    }}
                                />
                            </View>
                        </ListItem>
                    ))
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    picker: {
        //flex: 1,
        // paddingTop: 0,
        alignItems: "center"
    },
});



