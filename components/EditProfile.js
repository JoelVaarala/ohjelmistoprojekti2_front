import React, { useState } from 'react';
import { StyleSheet, Button, FlatList, Text, View, TextInput } from 'react-native';
import { Icon, Input } from 'react-native-elements'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function EditProfile() {

    //tagit
    const [tag, setTag] = useState('')
    const [tagList, setTagList] = useState([])

  React.useEffect(() => {
    HaeKayttajanTiedot()
    HaeKayttajanTiedot_autoupdate()
  }, [ikkä]);

  React.useEffect(() => {
    console.log('useeffecti', tagList )
  }, [tagList]);


  const [ikkä, setIkkä] = React.useState();

  function HaeKayttajanTiedot_autoupdate() {
    let ref = firestore().collection("users").doc(auth().currentUser.uid)
    ref.onSnapshot((querySnapshot) => {
      let iäkäs = querySnapshot.data().age
      console.log('user ika : ', iäkäs) // prints 23 tai new value
      setIkkä(querySnapshot.data().age)
      
    })
  }

  const HaeKayttajanTiedot = async () => {

    console.log("Haetaan käyttäjän omat tiedot")
    const myUID = auth().currentUser.uid;
    const tiedot = await firestore().collection("users").doc(myUID).get();
    var info = await tiedot.data()
    
    setUserTiedot({
      age: info.data.age,
      name: info.data.displayName,
      bio: info.data.bio
    }
    )
    let blaa = info.tags
    console.log('jfjf', blaa)
    setTagList(blaa)
    //Nyt tiedot kentästä voi noukkia tarvittavat tiedot.
  }


  const addButtonPressed = () => {
    setTagList([...tagList, tag ])
   HaeKayttajanTiedot_autoupdate() 

  }

  const [userTiedot, setUserTiedot] = useState({
    age: 0,
    bio: '',
    name: '',
  })

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
      <Text 
      style={styles.text}>
        {userTiedot.name}, 
        {userTiedot.age}, 
        {ikkä /*FIXME ikä täällä uudella funkkarilla haettuna japäivittyy kun firestorea muokkaa */}
        </Text>
      </View>
      <Icon reverse name='image' />
      <Text style={styles.text}>Lisää kuva</Text>
      <Text style={styles.text} >Tietoja sinusta:</Text>
      <View style={styles.textAreaContainer}>

        <TextInput value={userTiedot.bio} style={styles.textArea} multiline={true}
          numberOfLines={3} maxLength={500} placeholder='Tietoja sinusta' />
      </View>
      <Text style={styles.text}>Asuinpaikka: </Text>
      <View style={styles.textAreaContainer}>
        <TextInput style={styles.textArea} placeholder='Asuinpaikka' />
      </View>
      <View style={styles.omatContainerit}>
        <View>
          <Text>Lisää tägi</Text>
          <TextInput onChangeText={tag => setTag(tag)} value={tag} style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white' }}></TextInput>
          <Button style={styles.button} onPress={addButtonPressed} title="LISÄÄ"></Button>
        </View>
        <View>
          <Text>Olet valinnut seuraavat tagit:</Text>
          <FlatList contentContainerStyle={styles.content}
            horizontal={false}
            numColumns={3}
            data={tagList}
            keyExtractor={((item, index) => index.toString())}
            renderItem={({ item }) =>
              <Text onPress={() => deleteItemById(item.id)} style={styles.tag}>{item}</Text>}
          />
        </View>
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
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 200,
    justifyContent: 'flex-start',
  },
  tag: {
    padding: 6,
    fontSize: 20,
    color: 'white',
    marginVertical: 7,
    marginHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 6,
  },
  omatContainerit: {
    flex: 4,
    paddingTop: 20,
    alignItems: 'flex-start',
    paddingLeft: 80
  },
  content: {
    paddingTop: 10,
  },
});
