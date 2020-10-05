import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Carousel from './Carousel';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Profile() {

    const [user, setUser] = React.useState({
        name: 'nimi',
        age: 'ikä',
        bio: 'bio',
    });

    {/*
    React.useEffect(() => {
          //console.log(firebase.auth().currentUser)
          HaeKayttaja();
        });

        

    function HaeKayttaja() {
        let bodii =  {
            "uid" : "qREmoPw72NRHB2JA6uBCKJyuWhY2",
            "tags" : ["perunat"]
        }
    fetch(global.url + "profileUpdate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodii)
      })
        .then(response => response.json())
        // .then(response => console.log(response))
        .then(data => {
          setUser(
            name = "nimi",
            age = "ikä",
            bio = "bio")
          console.log(data.result)
        })
        .catch(err => console.error(err))
      //palauttaa asynscista arrayn, sijoitetaan swipettaviin.
    } */}



    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', flex: 6 }}>
                <Carousel />
            </View>
            <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 40 }}>{user.name}, {user.age}</Text>
                <Text style={{ fontSize: 20 }}>{user.bio}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});
