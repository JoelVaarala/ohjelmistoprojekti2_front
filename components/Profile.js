import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Carousel2 from './Carousel';
import firestore from '@react-native-firebase/firestore';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Profile( {navigation, route}, props) {

    const [user, setUser] = React.useState({
        name: 'nimi',
        age: 'ikä',
        bio: 'bio',
    });

    const [pics, setPics] = React.useState([]);

     React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           //console.log("Listener")
          //console.log(firebase.auth().currentUser)
           //setPics();
           console.log('XXXX', route.params)
           console.log('AAA',props)
        });
    
         // Return the function to unsubscribe from the event so it gets removed on unmount
         return unsubscribe;
       }, [navigation]);
    
     React.useEffect(() => {
         //console.log('useEffect chat.js saatu id : ' , props)
        haeTiedot()
     }, []) 

     //haetaan infot firebasesta
    
    async function haeTiedot() {
        const ref = await firestore().collection('users').doc(route.params.match)
        ref.onSnapshot((qr) => {
            // tiedot viedään userStateen
            let name_f = qr.data().displayName;
            let age_f = qr.data().age
            let bio_f = qr.data().bio
            setUser({name: name_f, age: age_f, bio: bio_f})
            console.log('id from haeTiedot : ',qr.id)
            setPics(qr.data().images)
                      
        })
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


    // ScrollView returnnin ympärille mahd mahd

    return (
        
        <View style={styles.container}>

            <View style={{ alignItems: 'center',   flex: 3 }}>
             
                 <Carousel2 kuvat={pics} style={{ flex: 1
                     //height: '50%', width: '50%'
                     }}/> 
                   
            </View>

            <View style={{ flex: 3 }}>
                <Text style={{ fontSize: 40, color: 'orange', }}>{user.name}, {user.age}</Text>
                <Text style={{ fontSize: 20, color: 'orange', }}>{user.bio}</Text>
            </View>

        </View>
       
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    
});
