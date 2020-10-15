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
    <View style={styles.container}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={styles.text}>
          {userTiedot.name},
          {userTiedot.age} 
    
        </Text>
      </View>
          <Icon reverse name='image' />
          <Text style={{color: 'orange', fontWeight: 'bold'}}>Lisää kuva</Text>
      </View>
      <View style={{flex: 1, paddingTop: 50,}}>
        <Text style={{justifyContent: 'center', alignItems: 'center', color: 'orange', fontWeight: 'bold', fontSize: 20}} >Bio:</Text>
        <View style={{ height: 90, width: 500, backgroundColor: 'white', color: 'black' }}>
          <TextInput value={userTiedot.bio} style={styles.textArea} multiline={true} 
            numberOfLines={3} maxLength={500}  onChangeText={text => setUserTiedot({...userTiedot,bio: text})}/>
        </View>
      </View>
      {/* meillä ei oo asuinpaikkaa nyt */}
      {/* <Text style={styles.text}>Asuinpaikka: </Text>
      <View style={styles.textAreaContainer}> 
        <TextInput style={styles.textArea} placeholder='Asuinpaikka' />
      </View> */}
      <View style={styles.omatContainerit}>
        <View style={{flex: 1, marginTop: 50, marginLeft: 20 }}>
          <View>
          <Text style={{fontWeight: 'bold', color: 'orange'}}>Lisää tägi</Text>
          <TextInput onChangeText={tag => setTag(tag)} value={tag} onEndEditing={addTag} 
                style={{ height: 40, width: 200, backgroundColor: 'white', color: 'black' }}>
          </TextInput>
        </View>
        <View>
          <Text style={{fontWeight: 'bold', color: 'orange'}}>Your tags:</Text>
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
      <View style={{flex: 1, marginBottom: 10, marginLeft: 80, marginRight: 80}}>
        <Button
          onPress={TallennaData}
          title="Tallenna tiedot"
        />
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    backgroundColor: 'black'
  },

  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  textAreaContainer: {
    backgroundColor: 'black',
    padding: 5,
    alignSelf: 'stretch'
  },
  textArea: {
    textAlignVertical: "top",
    alignSelf: 'stretch',
    fontSize: 15,
    backgroundColor: 'white',
    color: 'black'
    
  },
  text: {
    fontSize: 20,
    paddingTop: 2,
    paddingBottom: 1,
    fontWeight: 'bold',
    color: 'orange'
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
    color: 'orange',
    marginVertical: 7,
    marginHorizontal: 10,
    backgroundColor: 'black',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'orange',
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
