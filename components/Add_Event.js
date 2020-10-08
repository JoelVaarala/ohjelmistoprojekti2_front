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
    
    console.log('Tagi array', store.getState().EventReducer[0].tags)
    let url = global.url + 'event';
    let body = {
      idToken: "Dummyyy",
      uid: auth().currentUser.uid,
      data: {
        eventType: "public",
        eventStart: store.getState().EventReducer[0].date,
        eventEnd: "",
        displayName: store.getState().EventReducer[0].eventName,
        bio: store.getState().EventReducer[0].description,
        position: {
          latitude: 1,
          longitude: 1
        },
        tags: store.getState().EventReducer[0].tags
      }
    }

    fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application.json'
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(res => {
        console.log(res.result);
      })
      .catch(err => console.error(err))
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
