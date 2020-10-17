import React, { useState } from 'react';
import { StyleSheet, Button, FlatList, Text, View, TextInput } from 'react-native';
import { Icon, Input } from 'react-native-elements'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles';


//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function EditProfile() {

  //tagit
  const [tag, setTag] = useState('')
  const [tagList, setTagList] = useState([])
  const [userTiedot, setUserTiedot] = useState({
    age: 0,
    bio: '',
    name: '',
  })
 

  React.useEffect(() => {
    // console.log('useeffecti', tagList)
    HaeTiedot();
  }, []);


  function TallennaData() {
    
    let body = {
      data: {
        tags: tagList,
        bio: userTiedot.bio
      },
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
    }

    fetch(global.url + "profileUpdate",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data)
      })
      .catch(err => console.error(err))

  }

  // function HaeKayttajanTiedot_autoupdate() {
  //   let ref = firestore().collection("users").doc(auth().currentUser.uid)
  //   ref.onSnapshot((querySnapshot) => {
  //     let iäkäs = querySnapshot.data().age
  //     // console.log('user ika : ', iäkäs) // prints 23 tai new value
  //     setUserTiedot({
  //      age: (querySnapshot.data().age),
  //      bio: (querySnapshot.data().bio),
  //      name: (querySnapshot.data().displayName)
  //     })
  //     setTagList(querySnapshot.data().tags)
  //   })
      
  // }

  const HaeTiedot = async () => {
  const ref = firestore().collection("users").doc(auth().currentUser.uid)
  const doc = await ref.get();
  if(!doc.exists){
    console.log('document not found')
  }else{
    console.log('success HERE HERE ::::', doc.data())
     setUserTiedot({
       age: (doc.data().age),
       bio: (doc.data().bio),
       name: (doc.data().displayName)
      })
      setTagList(doc.data().tags)
  }
}

  const addTag = () => {
    setTagList([...tagList, tag])
    setTag('');
  }

  return (
    <View style={[styles.flexOne, styles.backgroundBlack]}>
            <View style={[styles.container, styles.containerCenter, styles.marginTopThirty]}>
      <View style={styles.flexDirectionRow}>
        <Text
          style={styles.editProfileText}>
          {userTiedot.name},
          {userTiedot.age} 
    
        </Text>
      </View>
          <Icon reverse name='image' />
          <Text style={styles.textOrangeBold}>Lisää kuva</Text>
      </View>
      <View style={styles.flexOne, styles.paddingTopFifty}>
        <Text style={[styles.containerCenter, styles.textOrangeBold, styles.fontSizeTwenty]}>Bio:</Text>
        <View style={styles.editProfileTextAreaContainer}>
          <TextInput value={userTiedot.bio} style={styles.editProfileTextArea} multiline={true} 
            numberOfLines={3} maxLength={500}  onChangeText={text => setUserTiedot({...userTiedot,bio: text})}/>
        </View>
      </View>
      {/* meillä ei oo asuinpaikkaa nyt */}
      {/* <Text style={styles.text}>Asuinpaikka: </Text>
      <View style={styles.textAreaContainer}> 
        <TextInput {styles.editProfileTextArea} placeholder='Asuinpaikka' />
      </View> */}
      <View style={styles.omatContainerit}>
        <View style={[styles.flexOne, styles.marginTopFifty, styles.marginLeftTwenty]}>
          <View>
          <Text style={styles.textOrangeBold}>Lisää tägi</Text>
          <TextInput onChangeText={tag => setTag(tag)} value={tag} onEndEditing={addTag} 
                style={styles.tagTextInput} >
          </TextInput>
        </View>
        <View>
          <Text style={styles.textOrangeBold}>Your tags:</Text>
          <FlatList contentContainerStyle={styles.paddingTopTen}
            horizontal={false}
            numColumns={3}
            data={tagList}
            keyExtractor={((item, index) => index.toString())}
            renderItem={({ item }) =>
              <Text onPress={() => deleteItemById(item.id)} style={styles.tagBox}>{item}</Text>}
          />
        </View>
      </View>
      </View>
      <View style={styles.saveButton}>
        <Button
          onPress={TallennaData}
          title="Tallenna tiedot"
        />
        </View>
    </View>

  );
}
