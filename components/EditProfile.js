import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Icon, Input } from 'react-native-elements'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles';


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
    <View style={styles.editProfileContainer}>
      <View style={styles.editProfileUser}>
        <Text
          style={styles.editProfileText}>
          {userTiedot.name},
          {userTiedot.age} 
    
        </Text>
      </View>
      <Icon reverse name='image' />
      <Text style={styles.editProfileText}>Lisää kuva</Text>
      <Text style={styles.editProfileText} >Tietoja sinusta:</Text>
      <View style={styles.editProfileTextAreaContainer}>
        <TextInput value={userTiedot.bio} style={styles.editProfileTextArea} multiline={true} 
          numberOfLines={3} maxLength={500}  onChangeText={text => setUserTiedot({...userTiedot,bio: text})}/>
      </View>
      {/* meillä ei oo asuinpaikkaa nyt */}
      {/* <Text style={styles.editProfileText}>Asuinpaikka: </Text>
      <View style={styles.editProfileTextAreaContainer}> 
        <TextInput style={styles.editProfileTextArea} placeholder='Asuinpaikka' />
      </View> */}
      <View style={styles.omatContainerit}>
        <View>
          <Text>Lisää tägi</Text>
          <TextInput onChangeText={tag => setTag(tag)} value={tag} onEndEditing={addTag} 
                style={styles.tagTextInput}>
          </TextInput>
        </View>
        <View>
          <Text>Your tags:</Text>
          <FlatList contentContainerStyle={styles.editProfileContent}
            horizontal={false}
            numColumns={3}
            data={tagList}
            keyExtractor={((item, index) => index.toString())}
            renderItem={({ item }) =>
              <Text onPress={() => deleteItemById(item.id)} style={styles.editProfileTag}>{item}</Text>}
          />
        </View>
      </View>
      <Button
        onPress={TallennaData}
        title="Tallenna tiedot"
        style={{  }} //tähän jotain?
      />
    </View>

  );
}
