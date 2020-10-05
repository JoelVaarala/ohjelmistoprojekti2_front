import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Icon, Input } from 'react-native-elements'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function EditProfile() {


  React.useEffect(() => {
    HaeKayttajanTiedot()
  }, []);  

  const HaeKayttajanTiedot = async () => {
  
    console.log("Haetaan käyttäjän omat tiedot")
    const myUID = auth().currentUser.uid;
    const tiedot = await firestore().collection("users").doc(myUID).get();
    console.log(tiedot._data)
    //Nyt tiedot kentästä voi noukkia tarvittavat tiedot.
  }

  return (
    <View style={styles.container}>
      <Icon reverse name='image' />
      <Text style={styles.text}>Lisää kuva</Text>
      <Text style={styles.text} >Tietoja sinusta: </Text>
      <View style={styles.textAreaContainer}>

        <TextInput style={styles.textArea} multiline={true}
          numberOfLines={3} maxLength={500} placeholder='Tietoja sinusta' />
      </View>
      <Text style={styles.text}>Asuinpaikka: </Text>
      <View style={styles.textAreaContainer}>
        <TextInput style={styles.textArea} placeholder='Asuinpaikka' />
      </View>
      
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  textAreaContainer: {
    backgroundColor: 'white',
    padding: 5,
    alignSelf: 'stretch'
  },
  textArea: {
    textAlignVertical: "top",
    alignSelf: 'stretch',
    fontSize: 15
  },
  text: {
    fontSize: 20,
    paddingTop: 2,
    paddingBottom: 1,
  },
});
