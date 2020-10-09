import React, { useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Platform, Text, View, TextInput, Button, FlatList, StatusBar } from 'react-native';
import { Input, Slider } from 'react-native-elements'
import RangeSlider from 'rn-range-slider';
import CheckBox from '@react-native-community/checkbox';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Settings() {

  //tagit
  const [tag, setTag] = useState('')
  const [tagList, setTagList] = useState([])

  const addButtonPressed = () => {
    setTagList([...tagList, { key: tag }])
  }

  //sliderit
  const [lowAge, setLowAge] = useState(14)
  const [highAge, setHighAge] = useState(100)
  const [distance, setDistance] = useState(1)
  //checkboxit
  const [female, setFemale] = useState(false)
  const [male, setMale] = useState(false)
  const [other, setOther] = useState(false)
  const [events, setEvents] = useState(false)
  const [people, setPeople] = useState(false)

  //datetimepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const formatDate = (date) => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }

  function HaeSettingsValues() {
    let ref = firestore().collection("users").doc(auth().currentUser.uid)
    ref.onSnapshot((querySnapshot) => {
      let sukupuutto = querySnapshot.data().gender;
      console.log(sukupuutto);
      // setStates here as shown above
    })
  }

  function TallennaData() {
    let body = {
      data: {
        data: {
          minAge: lowAge,
          maxAge: highAge,
          lookingFor: ["events", "users"],
          genders: ["rakkautta", "rauhaa"],
          distance: distance,
          eventsInXHours: 7,
          tags: tagList
        }

      },
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
    }
    console.log(JSON.stringify(body))
    return;
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.omatContainerit}>
          <View style={{ backgroundColor: 'white' }} >
            <Text>Lisää tägi</Text>
            <TextInput onChangeText={tag => setTag(tag)} value={tag} style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white' }}></TextInput>
            <Button style={styles.button} onPress={addButtonPressed} title="LISÄÄ"></Button>
          </View>
          <View>
            <Text>Tags:</Text>
            <FlatList contentContainerStyle={styles.content}
              horizontal={false}
              numColumns={3}
              data={tagList}
              renderItem={({ item }) =>
                <Text style={styles.tag}>{item.key}</Text>}
            />
          </View>
        </View>
        <View style={styles.omatContainerit}>
          <View>
            <Text>Etäisyys:</Text>
            <RangeSlider
              style={{ width: 250, height: 60 }}
              gravity={'center'}
              rangeEnabled={false}
              min={1}
              max={100}
              step={1}
              selectionColor="#3df"
              blankColor="#f618"
              onValueChanged={(distance, fromUser) => {
                setDistance(distance)
              }} />
          </View>
          <Text> {distance} km</Text>
          <View style={{ paddingTop: 50 }}>
            <Text> Iät</Text>
            <RangeSlider
              style={{ width: 250, height: 60 }}
              gravity={'center'}
              min={14}
              max={100}
              step={1}
              valueType='number'
              textsize={20}
              rangeLow={lowAge}
              rangeHigh={highAge}
              selectionColor="#3df"
              blankColor="#f618"
              onValueChanged={(lowAge, highAge, fromUser) => {
                setLowAge(lowAge), setHighAge(highAge)
              }} />
              <Text> {lowAge} - {highAge} vuotiaat</Text>
          </View>
        </View>


        <View style={styles.omatContainerit}>
          <Text>Sukupuoli</Text>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={female}
              onValueChange={(newValue) => setFemale(newValue)}
            />
            <Text style={{ marginTop: 5 }}>Naiset</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={male}
              onValueChange={(newValue) => setMale(newValue)}
            />
            <Text style={{ marginTop: 5 }}>Miehet</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={other}
              onValueChange={(newValue) => setOther(newValue)}
            />
            <Text style={{ marginTop: 5 }}>Muut</Text>
          </View>
        </View>
        <View style={styles.omatContainerit}>
          <Text>Hakukohteena </Text>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={events}
              onValueChange={(newValue) => setEvents(newValue)}
            />
            <Text style={{ marginTop: 5 }}>Tapahtumat</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={people}
              onValueChange={(newValue) => setPeople(newValue)}
            />
            <Text style={{ marginTop: 5 }}>Ihmiset</Text>
          </View>
        </View>

        <View style={styles.omatContainerit}>

          {/* FIXME Tähän tulee aikaslideri josta valitaan tuntien tai päivien päästä */}
          {/* <View>
            <Text>Tästä päivästä päivään {formatDate(date)} </Text>
            <Button onPress={showDatepicker} title="Valitse haettavat päivät" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )} */}
        </View>
        <View style={styles.omatContainerit}>
          <Button
            onPress={TallennaData}
            title="Tallenna tiedot"
            style={{ paddingHorizontal: 10, alignItems: 'stretch' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {

  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 200,
    justifyContent: 'flex-start',
  },
  tag: {
    padding: 6,
    fontSize: 16,
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
  checkbox: {
    flexDirection: 'row'
  },
});
