import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Carousel from './Carousel';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Profile() {

    const [userTiedot, setUserTiedot] = useState({
        age: 0,
        bio: '',
        name: '',
    })

    React.useEffect(() => {
        // console.log('useeffecti', tagList)
        HaeTiedot();
    }, []);

    const HaeTiedot = async () => {
        const ref = firestore().collection("users").doc(auth().currentUser.uid)
        const doc = await ref.get();
        if (!doc.exists) {
            console.log('document not found')
        } else {
            console.log('success HERE HERE ::::', doc.data())
            setUserTiedot({
                age: (doc.data().age),
                bio: (doc.data().bio),
                name: (doc.data().displayName)
            })
        }
    }

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
                <Text style={{ fontSize: 40 }}>{userTiedot.name}, {userTiedot.age}</Text>
                <Text style={{ fontSize: 20 }}>{userTiedot.bio}</Text>
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
