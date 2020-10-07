import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Image, Text, Picker } from 'react-native';
import { Avatar, ListItem, Overlay, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function ViewLikers() {
    const [selectedEvent, setEvent] = React.useState("java");
    const [myEvents, setMyevents] = React.useState(["Puistokalja", "Sulkkis"])

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
                    list.map((l, i) => (
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



