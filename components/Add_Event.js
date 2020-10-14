import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import Redux from 'redux';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { store, addEvent } from '../redux/index';


function Add_Eventti(props) {

  // Statet tapahtuman tiedoille
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date())
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState();
  // State renderöi "kyselyn"(default) tai "preview" (ln:88)
  const [view, setView] = React.useState(true);

  // Lisätään tägit taulukkoon
  const addTag = () => {
    setTags([tag, ...tags])
    setTag('')
  };


  // Lähetetään reducerin kautta storeen eventin tiedot ja nollataan statet
  // Lopuksi myös vaihdetaan view -> false, jolloin preview screen aktivoituu
  const goToPreview = () => {
    // store.dispatch(addName(eventName))
    //tags.forEach(el =>console.log(el))
    store.dispatch(addEvent({ eventName, description, date, tags }))
    // console.log('tässä store : ', store.getState())
    // console.log(Array.isArray(store.getState().EventReducer[0].tags))
    setEventName('');
    setDescription('');
    setDate(new Date());
    setTags([]);
    setView(false);
  }

  // Luodun eventin lähetys
  // TODO : paikkatiedot korjaus, mahd valinta public 
  const sendEvent = () => {

     let start_s = store.getState().EventReducer[0].date;
     let event_s = store.getState().EventReducer[0].eventName;
     let bio_s = store.getState().EventReducer[0].description
     let tagit_s = store.getState().EventReducer[0].tags
    let url = global.url + 'event';
    // console.log('Tagi array', store.getState().EventReducer[0].tags)
    // console.log(startTime, "start")
    // console.log(displayName, " dp name")
    // console.log(bio, " tää on bio")
    // console.log(auth().currentUser.uid, ' current user')
    // console.log(tagit, ' tagit')

   let bodi = {
     idToken: global.myUserData.idToken,
     uid: global.myUserData.uid,
     data: {
       eventType: "public",
       eventStart: start_s,
       eventEnd: "",
       displayName: event_s,
       bio: bio_s,
       position: {
         latitude: 37.4220133,
         longitude: -122.0839686
       },
       tags: tagit_s,
       images: []
     }
   }

   fetch(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodi),
    })
    .then(response => response.json())
    .then(res => {
      console.log(res, 'dsfsdf')
    })
    .catch(err => console.error(err, 'moi'))
  }


  return (

    <ScrollView style={{ marginTop: 22, flex: 1 }}>

      {view ? (

        <View style={{ marginLeft: 10, marginRight: 10 }}>

          <View>
            <Text style={styles.headers}>Anna tapahtumalle nimi : </Text>
            <TextInput
              style={styles.textbox}
              onChangeText={text => setEventName(text)}
              value={eventName}
            //onEndEditing={() => store.dispatch(addName(eventName))} 
            //_tällä lähetteisi eventName kun näppäimistö suljetaan
            />

            <Text style={styles.headers}>Anna tapahtuman kuvaus : </Text>
            <TextInput
              style={styles.textbox}
              onChangeText={text => setDescription(text)}
              value={description}
            />
          </View>


          <View>
            <Text style={styles.headers}>Valitse alkamis aika : </Text>
            <DatePicker
              style={{ alignSelf: 'center' }}
              date={date}
              onDateChange={value => setDate(value)}
              mode="datetime"
              locale="fi"
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.headers}>Anna tapahtumalle tägejä : </Text>
            <TextInput
              style={styles.textbox}
              onChangeText={text => setTag(text)}
              value={tag}
              onEndEditing={addTag}
            />
            <View style={styles.container}>
              <Text style={styles.header}>Tag List</Text>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={tags}
                renderItem={({ item }) => (
                  <Text>{item}</Text>)}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Button onPress={goToPreview} title="preview" />
          </View>

        </View>

      ) : (

          <View>
            <Text style={styles.headers}>Preview!!</Text>
            <Text style={styles.headers}>Luomasi tapahtuma </Text>
            <Text>Nimi : {store.getState().EventReducer[0].eventName}</Text>
            <Text>Kuvaus : {store.getState().EventReducer[0].description}</Text>
            <Text>Ajankohta : {store.getState().EventReducer[0].date.toString()}</Text>
            <Text>Tagit : </Text>
             <View>
              {store.getState().EventReducer[0].tags.map(item => {
                return <Text key={item.toString()}>{item}</Text>
              })}
            </View> 
            <Button onPress={sendEvent} title="Confirm event" />
          </View>
        )}
    </ScrollView>

  );

}



const mapStateToProps = (state) => ({
  EventReducer: state.EventReducer,
})
// Komponentti yhdistetään reducerin saataville ja annetaan parametreiksi state, action ja main func
const Add_Event = connect(mapStateToProps, { addEvent })(Add_Eventti);
// Export ln:177
export default Add_Event;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#eaeaea',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  headers: {
    fontWeight: 'bold',
    marginTop: 10
  },
  textbox: {
    height: 40,
    width: 200,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});
